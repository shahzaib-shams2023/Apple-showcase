import { useEffect, useRef, useState } from 'react';
import { STORY_CHAPTERS, type ChapterId, type StoryChapter } from '../story/chapters';

interface ExperienceChromeProps {
  visible: boolean;
  activeChapter: StoryChapter;
  progressFillRef: React.RefObject<HTMLDivElement | null>;
  soundEnabled: boolean;
  soundSupported: boolean;
  onToggleSound: () => void;
  onJumpToChapter: (id: ChapterId) => void;
  onReplayEntrance: () => void;
}

export function ExperienceChrome({
  visible,
  activeChapter,
  progressFillRef,
  soundEnabled,
  soundSupported,
  onToggleSound,
  onJumpToChapter,
  onReplayEntrance,
}: ExperienceChromeProps) {
  const [indexOpen, setIndexOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!indexOpen) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIndexOpen(false);
        triggerBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [indexOpen]);

  return (
    <div
      className={`experience-chrome ${visible ? 'is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <header className="chrome-top">
        <div className="chrome-identity">
          <a
            href="#chapter-arrival"
            className="chrome-wordmark"
            tabIndex={visible ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              onJumpToChapter('arrival');
            }}
          >
            <span className="brand-dot" aria-hidden="true" />
            <span>MONOLITH // 26</span>
          </a>
          <span className="chrome-divider" aria-hidden="true">
            /
          </span>
          <span className="chrome-chapter-readout" aria-live="polite">
            {activeChapter.roman} · {activeChapter.title}
          </span>
        </div>

        <div className="chrome-actions">
          {soundSupported && (
            <button
              type="button"
              className={`sound-pill ${soundEnabled ? 'is-on' : ''}`}
              tabIndex={visible ? 0 : -1}
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
            >
              <span>Audio: {soundEnabled ? 'On' : 'Muted'}</span>
            </button>
          )}

          <button
            ref={triggerBtnRef}
            type="button"
            className="chrome-btn"
            tabIndex={visible ? 0 : -1}
            aria-expanded={indexOpen}
            aria-controls="narrative-index-overlay"
            onClick={() => setIndexOpen((prev) => !prev)}
          >
            {indexOpen ? 'Close' : 'Index'}
          </button>
        </div>
      </header>

      {/* Passive vertical edge progress spine (Desktop) */}
      <nav className="edge-spine" aria-label="Narrative progress">
        <div className="edge-spine-track" aria-hidden="true">
          <div ref={progressFillRef} className="edge-spine-fill" />
        </div>
        <ul className="edge-spine-list">
          {STORY_CHAPTERS.map((ch) => {
            const active = ch.id === activeChapter.id;
            return (
              <li key={ch.id}>
                <a
                  href={`#chapter-${ch.id}`}
                  className={`edge-spine-link ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'step' : undefined}
                  tabIndex={visible ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    onJumpToChapter(ch.id);
                  }}
                >
                  <span className="edge-spine-roman">{ch.roman}</span>
                  <span className="edge-spine-title">{ch.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Accessible Chapter Index Overlay */}
      {indexOpen && (
        <div
          id="narrative-index-overlay"
          className="index-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Narrative chapter index"
        >
          <div className="index-sheet">
            <div className="index-sheet-head">
              <span className="mono-label">NARRATIVE INDEX</span>
              <button
                ref={closeBtnRef}
                type="button"
                className="chrome-btn"
                onClick={() => {
                  setIndexOpen(false);
                  triggerBtnRef.current?.focus();
                }}
              >
                Close [Esc]
              </button>
            </div>

            <ol className="index-list">
              {STORY_CHAPTERS.map((ch) => {
                const active = ch.id === activeChapter.id;
                return (
                  <li key={ch.id}>
                    <a
                      href={`#chapter-${ch.id}`}
                      className={`index-row ${active ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIndexOpen(false);
                        onJumpToChapter(ch.id);
                      }}
                    >
                      <span className="index-roman">{ch.index}</span>
                      <span className="index-main">
                        <strong>{ch.title}</strong>
                        <small>{ch.subtitle}</small>
                      </span>
                      <span className="index-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>

            <div className="index-sheet-foot">
              <button
                type="button"
                className="chrome-btn"
                onClick={() => {
                  setIndexOpen(false);
                  onReplayEntrance();
                }}
              >
                Return to Threshold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

