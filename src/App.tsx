import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ModelId } from './assets/manifest';
import { STORY_CHAPTERS, type ChapterId } from './story/chapters';
import { SoundEngine } from './audio/SoundEngine';
import {
  SceneEngine,
  type ExperiencePhase,
  type LoadProgressState,
} from './scene/SceneEngine';
import { EntranceOverlay } from './experience/EntranceOverlay';
import { ExperienceChrome } from './interface/ExperienceChrome';
import {
  SpatialCallouts,
  type SpatialCalloutsHandle,
} from './interface/SpatialCallouts';
import { ChapterStage } from './interface/ChapterStage';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<SceneEngine | null>(null);
  const soundRef = useRef<SoundEngine | null>(null);
  const storyScrollRef = useRef<HTMLDivElement | null>(null);

  const calloutsRef = useRef<SpatialCalloutsHandle | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const deconstructTrackRef = useRef<HTMLElement | null>(null);
  const deconstructPctRef = useRef<HTMLSpanElement | null>(null);

  const foldTrackRef = useRef<HTMLElement | null>(null);
  const foldAngleRef = useRef<HTMLSpanElement | null>(null);
  const foldStateRef = useRef<HTMLSpanElement | null>(null);

  const [phase, setPhase] = useState<ExperiencePhase>('threshold');
  const [loadState, setLoadState] = useState<LoadProgressState>({
    progress: 0,
    indeterminate: false,
    loadedLabel: 'Initializing optical chamber',
    ready: false,
    error: null,
  });
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  const [soundSupported, setSoundSupported] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const [activeChapterId, setActiveChapterId] = useState<ChapterId>('arrival');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeDeconstructBeat, setActiveDeconstructBeat] = useState(0);

  const [selectedModel, setSelectedModel] = useState<ModelId>('18-pro-max-burgundy');
  const [isVariantLoading, setIsVariantLoading] = useState(false);
  const [hasInspectOffset, setHasInspectOffset] = useState(false);

  useEffect(() => {
    const sound = new SoundEngine();
    soundRef.current = sound;
    setSoundSupported(sound.isSupported());

    const onVisibility = () => {
      sound.pauseForVisibility(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const container = stageContainerRef.current;
    let engine: SceneEngine | null = null;

    if (container) {
      try {
        engine = new SceneEngine(container, {
          onProgressChange: setLoadState,
          onVariantLoading: setIsVariantLoading,
          onCalloutsUpdate: (items) => calloutsRef.current?.update(items),
          onInspectOffsetChange: setHasInspectOffset,
          onContextLossChange: setContextLost,
        });
        engineRef.current = engine;
      } catch (err) {
        console.error('WebGL initialization failed:', err);
        setWebglUnavailable(true);
        document.documentElement.dataset.webgl = 'unavailable';
        setLoadState({
          progress: 1,
          indeterminate: false,
          loadedLabel: 'Static archive ready',
          ready: true,
          error: 'WebGL is unavailable on this browser. Entering static archive.',
        });
      }
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      engine?.dispose();
      engineRef.current = null;
      sound.dispose();
      soundRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.phase = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== 'active') return;
    const root = storyScrollRef.current;
    const deconstructTrack = deconstructTrackRef.current;
    const foldTrack = foldTrackRef.current;
    if (!root || !deconstructTrack || !foldTrack) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lastChapter: ChapterId = 'arrival';
    let lastBeat = 0;
    let scrolledFlag = false;

    const ctx = gsap.context(() => {
      const deconstructST = ScrollTrigger.create({
        trigger: deconstructTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: prefersReduced ? false : true,
        invalidateOnRefresh: true,
      });

      const foldST = ScrollTrigger.create({
        trigger: foldTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: prefersReduced ? false : true,
        invalidateOnRefresh: true,
      });

      const chapterSTs = STORY_CHAPTERS.map((ch) =>
        ScrollTrigger.create({
          trigger: `#chapter-${ch.id}`,
          start: 'top 52%',
          end: 'bottom 52%',
          invalidateOnRefresh: true,
        })
      );

      const syncNarrative = (globalProgress: number) => {
        if (!scrolledFlag && window.scrollY > 24) {
          scrolledFlag = true;
          setHasScrolled(true);
        } else if (scrolledFlag && window.scrollY <= 8) {
          scrolledFlag = false;
          setHasScrolled(false);
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleY(${Math.max(
            0.03,
            globalProgress
          )})`;
        }

        const dp = prefersReduced ? 1 : deconstructST.progress;
        const fp = prefersReduced ? 1 : foldST.progress;

        if (deconstructPctRef.current) {
          const pct = Math.round(
            Math.sin(Math.min(1, dp * 1.08) * Math.PI * 0.5) * 100
          );
          deconstructPctRef.current.textContent = `${pct}%`;
        }

        const beat = dp < 0.33 ? 0 : dp < 0.66 ? 1 : 2;
        if (beat !== lastBeat) {
          lastBeat = beat;
          setActiveDeconstructBeat(beat);
        }

        const unfold = 1 - Math.max(0, Math.min(1, (fp - 0.06) / 0.84));
        const deg = Math.round(unfold * 180);
        if (foldAngleRef.current) {
          foldAngleRef.current.textContent = `${deg}°`;
        }
        if (foldStateRef.current) {
          foldStateRef.current.textContent =
            deg <= 15
              ? 'Flat Open Canvas'
              : deg >= 165
              ? 'Folded Pocket Slate'
              : 'Articulated Book Angle';
        }

        let currentIdx = 0;
        for (let i = 0; i < chapterSTs.length; i++) {
          if (chapterSTs[i].isActive) {
            currentIdx = i;
            break;
          }
          if (chapterSTs[i].progress >= 1) {
            currentIdx = i;
          }
        }
        if (globalProgress <= 0.01) currentIdx = 0;
        if (globalProgress >= 0.99) currentIdx = STORY_CHAPTERS.length - 1;

        const currentChapter = STORY_CHAPTERS[currentIdx];
        const chProgress = chapterSTs[currentIdx]?.progress ?? 0;

        if (currentChapter.id !== lastChapter) {
          lastChapter = currentChapter.id;
          setActiveChapterId(currentChapter.id);
          soundRef.current?.playChapterShift(currentIdx);
        }

        void engineRef.current?.updateNarrativeState({
          activeChapter: currentChapter.id,
          chapterProgress: chProgress,
          globalProgress,
          deconstructProgress: dp,
          foldProgress: fp,
        });
      };

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: prefersReduced ? false : true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          syncNarrative(self.progress);
        },
      });

      syncNarrative(0);
    }, root);

    const rafRefresh = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    void document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafRefresh);
      ctx.revert();
    };
  }, [phase]);

  const handleToggleSound = useCallback(() => {
    const sound = soundRef.current;
    if (!sound) return;
    const next = sound.setEnabled(!sound.isEnabled());
    setSoundEnabled(next);
  }, []);

  const handleEnter = useCallback(() => {
    if (phase !== 'threshold') return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    setPhase('entering');
    engineRef.current?.setExperiencePhase('entering');
    soundRef.current?.playEntranceChord();

    window.setTimeout(
      () => {
        setPhase('active');
        engineRef.current?.setExperiencePhase('active');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        ScrollTrigger.refresh();
      },
      prefersReduced ? 60 : 880
    );
  }, [phase]);

  const handleReplayEntrance = useCallback(() => {
    setSelectedModel('18-pro-max-burgundy');
    setActiveChapterId('arrival');
    setActiveDeconstructBeat(0);
    setHasScrolled(false);
    setPhase('threshold');
    void engineRef.current?.setStudioModel('18-pro-max-burgundy', false);
    engineRef.current?.setExperiencePhase('threshold');
    void engineRef.current?.updateNarrativeState({
      activeChapter: 'arrival',
      chapterProgress: 0,
      globalProgress: 0,
      deconstructProgress: 0,
      foldProgress: 0,
    });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleJumpToChapter = useCallback((id: ChapterId) => {
    const target = document.getElementById(`chapter-${id}`);
    if (!target) return;
    soundRef.current?.playClick(380, 0.035);
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const handleSelectModel = useCallback((id: ModelId) => {
    setSelectedModel(id);
    soundRef.current?.playClick(430, 0.04);
    void engineRef.current?.setStudioModel(id, true);
  }, []);

  const handleResetInspection = useCallback(() => {
    soundRef.current?.playClick(320, 0.03);
    engineRef.current?.resetInspectionAngle();
  }, []);

  const activeChapter =
    STORY_CHAPTERS.find((c) => c.id === activeChapterId) ?? STORY_CHAPTERS[0];

  const isInspectableStage =
    phase === 'active' &&
    !webglUnavailable &&
    (activeChapterId === 'finishes' || activeChapterId === 'metamorphosis');

  return (
    <div className="monolith-root">
      <a href="#main-content" className="skip-link">
        Skip to narrative
      </a>

      {/* Atmospheric horizontal scan line — subtle presence indicator */}
      {phase === 'active' && (
        <div
          className="atmosphere-scan"
          aria-hidden="true"
          style={{ top: '62%' }}
        />
      )}

      <div
        ref={stageContainerRef}
        className={`webgl-stage ${isInspectableStage ? 'is-inspectable' : ''}`}
        aria-hidden="true"
      />
      <div className="chamber-vignette" aria-hidden="true" />

      {contextLost && (
        <div className="context-lost-banner" role="status">
          WebGL rendering paused — restoring optical chamber…
        </div>
      )}

      <SpatialCallouts ref={calloutsRef} />

      <EntranceOverlay
        phase={phase}
        loadState={loadState}
        webglUnavailable={webglUnavailable}
        soundEnabled={soundEnabled}
        soundSupported={soundSupported}
        onToggleSound={handleToggleSound}
        onEnter={handleEnter}
      />

      <ExperienceChrome
        visible={phase === 'active'}
        activeChapter={activeChapter}
        progressFillRef={progressFillRef}
        soundEnabled={soundEnabled}
        soundSupported={soundSupported}
        onToggleSound={handleToggleSound}
        onJumpToChapter={handleJumpToChapter}
        onReplayEntrance={handleReplayEntrance}
      />

      <div ref={storyScrollRef}>
        <ChapterStage
          visible={phase === 'active'}
          activeChapterId={activeChapterId}
          hasScrolled={hasScrolled}
          activeDeconstructBeat={activeDeconstructBeat}
          deconstructTrackRef={deconstructTrackRef}
          deconstructPctRef={deconstructPctRef}
          foldTrackRef={foldTrackRef}
          foldAngleRef={foldAngleRef}
          foldStateRef={foldStateRef}
          selectedModel={selectedModel}
          isVariantLoading={isVariantLoading}
          hasInspectOffset={hasInspectOffset}
          onSelectModel={handleSelectModel}
          onResetInspection={handleResetInspection}
          onJumpToChapter={handleJumpToChapter}
          onReplayEntrance={handleReplayEntrance}
        />
      </div>
    </div>
  );
}

export default App;
