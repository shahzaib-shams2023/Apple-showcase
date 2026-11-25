import {
  EXPLODE_STRATA,
  SLAB_MODELS,
  SPECIMEN_MODELS,
  type ModelId,
} from '../assets/manifest';
import {
  ANATOMY_BEATS,
  STORY_CHAPTERS,
  type ChapterId,
} from '../story/chapters';

interface ChapterStageProps {
  visible: boolean;
  activeChapterId: ChapterId;
  hasScrolled: boolean;
  activeDeconstructBeat: number;
  deconstructTrackRef: React.RefObject<HTMLElement | null>;
  deconstructPctRef: React.RefObject<HTMLSpanElement | null>;
  foldTrackRef: React.RefObject<HTMLElement | null>;
  foldAngleRef: React.RefObject<HTMLSpanElement | null>;
  foldStateRef: React.RefObject<HTMLSpanElement | null>;
  selectedModel: ModelId;
  isVariantLoading: boolean;
  hasInspectOffset: boolean;
  onSelectModel: (id: ModelId) => void;
  onResetInspection: () => void;
  onJumpToChapter: (id: ChapterId) => void;
  onReplayEntrance: () => void;
}

export function ChapterStage({
  visible,
  activeChapterId,
  hasScrolled,
  activeDeconstructBeat,
  deconstructTrackRef,
  deconstructPctRef,
  foldTrackRef,
  foldAngleRef,
  foldStateRef,
  selectedModel,
  isVariantLoading,
  hasInspectOffset,
  onSelectModel,
  onResetInspection,
  onJumpToChapter,
  onReplayEntrance,
}: ChapterStageProps) {
  const currentModel =
    SLAB_MODELS.find((m) => m.id === selectedModel) ?? SLAB_MODELS[0];

  const [ch1, ch2, ch3, ch4, ch5, ch6] = STORY_CHAPTERS;

  return (
    <main
      id="main-content"
      className={`story-stage ${visible ? 'is-active' : 'is-dormant'}`}
    >
      {/* CHAPTER I: ARRIVAL */}
      <section
        id="chapter-arrival"
        className="chapter-band chapter-arrival container"
        aria-labelledby="ch1-title"
      >
        <div
          className={`editorial-column ${
            activeChapterId === 'arrival' ? 'is-current' : ''
          }`}
        >
          <span className="chapter-kicker">{ch1.kicker}</span>
          <h1 id="ch1-title" className="chapter-display-title">
            Monolith <em>in Shadow</em>.
          </h1>
          <p className="chapter-lead">{ch1.description}</p>
          <p className="chapter-meta-line">{ch1.meta}</p>

          <p className={`scroll-cue ${hasScrolled ? 'is-faded' : ''}`}>
            Scroll to navigate the chamber
          </p>
        </div>

        {/* Static architectural schematic shown only when WebGL is unavailable */}
        <div className="webgl-fallback-plate" aria-label="Static specimen dimensions">
          <div className="fallback-wireframe" aria-hidden="true">
            <div className="fallback-camera-island" />
          </div>
          <div className="fallback-caption">
            <strong>{currentModel.shortName}</strong>
            <span>{currentModel.dimensionsMm}</span>
            <span>{currentModel.meshCount} GLB sub-assemblies</span>
          </div>
        </div>
      </section>

      {/* CHAPTER II: CONTINUOUS ANATOMY SWEEP */}
      <section
        id="chapter-anatomy"
        className="chapter-anatomy container"
        aria-labelledby="ch2-title"
      >
        <div className="anatomy-intro">
          <span className="chapter-kicker">{ch2.kicker}</span>
          <h2 id="ch2-title" className="chapter-heading">
            Edge, Copper &amp; <em>Optics</em>.
          </h2>
          <p className="chapter-lead">{ch2.description}</p>
        </div>

        <div className="anatomy-beats-flow">
          {ANATOMY_BEATS.map((beat) => (
            <article key={beat.id} className="anatomy-beat">
              <span className="beat-kicker">{beat.kicker}</span>
              <h3 className="beat-title">{beat.title}</h3>
              <p className="beat-body">{beat.body}</p>
              <span className="beat-parts">{beat.partLabel}</span>
            </article>
          ))}
        </div>
      </section>

      {/* CHAPTER III: PINNED SCROLL-DRIVEN 43-STRATUM DECONSTRUCTION */}
      <section
        ref={deconstructTrackRef}
        id="chapter-deconstruction"
        className="chapter-pinned-track chapter-deconstruction-track"
        aria-labelledby="ch3-title"
      >
        <div className="chapter-pinned-viewport container">
          <div className="pinned-editorial-column">
            <div className="pinned-header">
              <span className="chapter-kicker">{ch3.kicker}</span>
              <h2 id="ch3-title" className="chapter-heading">
                Forty-Three <em>Strata</em>.
              </h2>
              <p className="chapter-lead">{ch3.description}</p>
              <div className="pinned-datum-row">
                <span>Optical Z-Separation</span>
                <span ref={deconstructPctRef} className="pinned-datum-value">
                  0%
                </span>
              </div>
            </div>

            <ol className="stratum-sequence">
              {EXPLODE_STRATA.map((st, idx) => {
                const isActive = idx === activeDeconstructBeat;
                return (
                  <li
                    key={st.id}
                    className={`stratum-step ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="stratum-step-head">
                      <span className="stratum-code">{st.code}</span>
                      <strong>{st.label}</strong>
                    </div>
                    <p>{st.description}</p>
                    <span className="stratum-meshes">{st.meshes.join(' · ')}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* CHAPTER IV: PROPORTIONS & FINISHES */}
      <section
        id="chapter-finishes"
        className="chapter-band chapter-finishes container"
        aria-labelledby="ch4-title"
      >
        <div
          className={`editorial-column ${
            activeChapterId === 'finishes' ? 'is-current' : ''
          }`}
          data-interactive="true"
        >
          <span className="chapter-kicker">{ch4.kicker}</span>
          <h2 id="ch4-title" className="chapter-heading">
            Four <em>Monoliths</em>.
          </h2>
          <p className="chapter-lead">{currentModel.notes}</p>

          <div
            className="finish-selector"
            role="radiogroup"
            aria-label="Select 2026 slab specimen finish and footprint"
          >
            {SLAB_MODELS.map((model) => {
              const selected = model.id === selectedModel;
              return (
                <button
                  key={model.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`finish-option ${selected ? 'is-selected' : ''}`}
                  onClick={() => onSelectModel(model.id)}
                >
                  <span className="finish-option-left">
                    <span
                      className="swatch-dot"
                      style={{ backgroundColor: model.swatchHex }}
                      aria-hidden="true"
                    />
                    <span className="finish-name">{model.shortName}</span>
                  </span>
                  <span className="finish-dims">{model.dimensionsMm}</span>
                </button>
              );
            })}
          </div>

          <div className="finishes-status-row">
            <span>
              {isVariantLoading
                ? 'Loading GLB specimen…'
                : `${currentModel.meshCount} meshes · ${currentModel.triangleCount} tris · ${currentModel.fileSizeMb}`}
            </span>
            <span className="drag-hint">Drag horizontally on specimen to turn</span>
          </div>

          {hasInspectOffset && (
            <button
              type="button"
              className="reset-angle-link"
              onClick={onResetInspection}
            >
              Reset inspection angle
            </button>
          )}
        </div>
      </section>

      {/* CHAPTER V: PINNED SCROLL-DRIVEN HINGE METAMORPHOSIS */}
      <section
        ref={foldTrackRef}
        id="chapter-metamorphosis"
        className="chapter-pinned-track chapter-fold-track"
        aria-labelledby="ch5-title"
      >
        <div className="chapter-pinned-viewport chapter-fold-viewport container">
          <div className="pinned-editorial-column fold-editorial-column">
            <span className="chapter-kicker">{ch5.kicker}</span>
            <h2 id="ch5-title" className="chapter-heading">
              Hinge <em>Metamorphosis</em>.
            </h2>
            <p className="chapter-lead">{ch5.description}</p>

            <div className="fold-telemetry">
              <div>
                <span className="mono-label">Skeletal Articulation</span>
                <span ref={foldAngleRef} className="fold-degree-readout">
                  180°
                </span>
              </div>
              <div className="fold-telemetry-right">
                <span className="mono-label">Posture</span>
                <span ref={foldStateRef} className="fold-posture-readout">
                  Folded Pocket Slate
                </span>
              </div>
            </div>

            <div className="fold-spec-line">
              <span>Armature_50 · 6-channel glTF clip</span>
              <span>166.0 × 118.2 × 11.3 mm open</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER VI: RESOLUTION & ARCHIVE INDEX */}
      <section
        id="chapter-resolution"
        className="chapter-band chapter-resolution container"
        aria-labelledby="ch6-title"
      >
        <div
          className={`resolution-shell ${
            activeChapterId === 'resolution' ? 'is-current' : ''
          }`}
        >
          <div className="resolution-top">
            <div className="resolution-copy">
              <span className="chapter-kicker">{ch6.kicker}</span>
              <h2 id="ch6-title" className="chapter-display-title">
                Resolved <em>Form</em>.
              </h2>
              <p className="chapter-lead">{ch6.description}</p>
            </div>

            <div className="resolution-actions" data-interactive="true">
              <button
                type="button"
                className="btn-primary"
                onClick={() => onJumpToChapter('arrival')}
              >
                Replay Journey
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onReplayEntrance}
              >
                Return to Threshold
              </button>
            </div>
          </div>

          <div
            className="archive-ledger"
            role="list"
            aria-label="Verified 2026 GLB specimen archive"
            data-interactive="true"
          >
            {SPECIMEN_MODELS.map((spec, idx) => (
              <button
                key={spec.id}
                type="button"
                role="listitem"
                className="archive-row"
                onClick={() => {
                  if (spec.hasFoldAnimation) {
                    onJumpToChapter('metamorphosis');
                  } else {
                    onSelectModel(spec.id);
                    onJumpToChapter('finishes');
                  }
                }}
              >
                <span className="archive-index">0{idx + 1}</span>
                <span className="archive-name">
                  <span
                    className="swatch-dot"
                    style={{ backgroundColor: spec.swatchHex }}
                    aria-hidden="true"
                  />
                  <span>{spec.shortName}</span>
                </span>
                <span className="archive-dims">{spec.dimensionsMm}</span>
                <span className="archive-tris">
                  {spec.meshCount} meshes · {spec.triangleCount} tris
                </span>
                <span className="archive-action">
                  {spec.hasFoldAnimation ? 'Inspect Hinge →' : 'Inspect Finish →'}
                </span>
              </button>
            ))}
          </div>

          <footer className="experience-footer">
            <span>MONOLITH // 26 — REAL-TIME GLTF 2.0 HARDWARE MONOGRAPH</span>
            <span>All mesh identifiers and dimensions read directly from project GLBs</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
