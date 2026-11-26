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
  const currentModel = SLAB_MODELS.find((m) => m.id === selectedModel) ?? SLAB_MODELS[0];
  const [ch1, ch2, ch3, ch4, ch5, ch6] = STORY_CHAPTERS;

  return (
    <main
      id="main-content"
      className={`story-stage ${visible ? 'is-active' : 'is-dormant'}`}
    >
      {/* ════════════════════════════════════════
          CHAPTER I — ARRIVAL IN SHADOW
      ════════════════════════════════════════ */}
      <section
        id="chapter-arrival"
        className="chapter-band chapter-arrival container"
        aria-labelledby="ch1-title"
      >
        <div className={`editorial-column ${activeChapterId === 'arrival' ? 'is-current' : ''}`}>
          <span className="chapter-kicker">{ch1.kicker}</span>
          <h1 id="ch1-title" className="chapter-display-title">
            iPhone 18 <em>Pro Max</em>.
          </h1>
          <p className="chapter-lead">{ch1.description}</p>

          {/* Dimension annotation strip */}
          <div className="arrival-annotation" aria-label="Specimen dimensions">
            <div className="annotation-row">
              <span className="annotation-tick" />
              <span className="annotation-value">79.0 mm</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                WIDTH
              </span>
            </div>
            <div className="annotation-row">
              <span className="annotation-tick" />
              <span className="annotation-value">163.4 mm</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                HEIGHT
              </span>
            </div>
            <div className="annotation-row">
              <span className="annotation-tick" />
              <span className="annotation-value">13.5 mm</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                DEPTH
              </span>
            </div>
          </div>

          <p className={`scroll-cue ${hasScrolled ? 'is-faded' : ''}`}>
            Scroll to direct the camera &amp; light
          </p>
        </div>

        {/* Static schematic fallback when WebGL unavailable */}
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

      {/* ════════════════════════════════════════
          CHAPTER II — EDGE, COPPER & OPTICS
      ════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════
          CHAPTER III — FORTY-THREE STRATA
          Pinned scroll-driven Z-axis dissection
      ════════════════════════════════════════ */}
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
                <span ref={deconstructPctRef} className="pinned-datum-value">0%</span>
              </div>
            </div>

            <ol className="stratum-sequence" aria-label="Layer dissection progress">
              {EXPLODE_STRATA.map((st, idx) => {
                const isActive = idx === activeDeconstructBeat;
                return (
                  <li
                    key={st.id}
                    className={`stratum-step ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'step' : undefined}
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

      {/* ════════════════════════════════════════
          CHAPTER IV — PROPORTIONS & FINISHES
          Variant selector + drag inspection
      ════════════════════════════════════════ */}
      <section
        id="chapter-finishes"
        className="chapter-band chapter-finishes container"
        aria-labelledby="ch4-title"
      >
        <div
          className={`editorial-column ${activeChapterId === 'finishes' ? 'is-current' : ''}`}
          data-interactive="true"
        >
          <span className="chapter-kicker">{ch4.kicker}</span>
          <h2 id="ch4-title" className="chapter-heading">
            iPhone 18 <em>Lineup</em>.
          </h2>
          <p className="chapter-lead">{currentModel.notes}</p>

          <div
            className="finish-selector"
            role="radiogroup"
            aria-label="Select 2026 specimen finish and footprint"
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
                ? 'Loading specimen…'
                : `${currentModel.meshCount} meshes · ${currentModel.triangleCount} tris · ${currentModel.fileSizeMb}`}
            </span>
            <span className="drag-hint">
              Drag horizontally on specimen to turn
            </span>
          </div>

          {/* Selected specimen technical data strip */}
          {!isVariantLoading && (
            <div className="chapter-meta-strip" aria-label="Selected specimen data">
              <div className="chapter-meta-strip-item">
                <span className="chapter-meta-strip-label">Series</span>
                <span className="chapter-meta-strip-value">{currentModel.series}</span>
              </div>
              <div className="chapter-meta-strip-item">
                <span className="chapter-meta-strip-label">Finish</span>
                <span className="chapter-meta-strip-value">{currentModel.finish}</span>
              </div>
              <div className="chapter-meta-strip-item">
                <span className="chapter-meta-strip-label">Dimensions</span>
                <span className="chapter-meta-strip-value">{currentModel.dimensionsMm}</span>
              </div>
            </div>
          )}

          {hasInspectOffset && (
            <button
              type="button"
              className="reset-angle-link"
              onClick={onResetInspection}
            >
              Reset inspection angle ↩
            </button>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER V — HINGE METAMORPHOSIS
          Pinned scroll-driven fold animation
      ════════════════════════════════════════ */}
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
              iPhone <em>Duo Fold</em>.
            </h2>
            <p className="chapter-lead">{ch5.description}</p>

            <div className="fold-telemetry" aria-live="polite" aria-atomic="true">
              <div>
                <span className="mono-label">Skeletal Articulation</span>
                <span ref={foldAngleRef} className="fold-degree-readout">180°</span>
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

      {/* ════════════════════════════════════════
          CHAPTER VI — RESOLVED FORM
          Archive index & navigation
      ════════════════════════════════════════ */}
      <section
        id="chapter-resolution"
        className="chapter-band chapter-resolution container"
        aria-labelledby="ch6-title"
      >
        <div
          className={`resolution-shell ${activeChapterId === 'resolution' ? 'is-current' : ''}`}
        >
          <div className="resolution-top">
            <div className="resolution-copy">
              <span className="chapter-kicker">{ch6.kicker}</span>
              <h2 id="ch6-title" className="chapter-display-title">
                2026 <em>Lineup</em>.
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

          {/* Specimen archive ledger */}
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
            <span>APPLE // iPHONE 18 &amp; iPHONE DUO FOLD — 2026 SPATIAL STUDY</span>
            <span>All mesh identifiers &amp; dimensions sourced directly from project GLBs</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
