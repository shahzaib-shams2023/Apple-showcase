import { useEffect, useRef, useState } from 'react';
import type { ExperiencePhase, LoadProgressState } from '../scene/SceneEngine';

interface EntranceOverlayProps {
  phase: ExperiencePhase;
  loadState: LoadProgressState;
  webglUnavailable: boolean;
  soundEnabled: boolean;
  soundSupported: boolean;
  onToggleSound: () => void;
  onEnter: () => void;
}

/** Geometric iris SVG — optical-chamber aperture mark */
function IrisMark({ size = 20, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <circle cx="12" cy="12" r="6.5"  stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <circle cx="12" cy="12" r="2.5"  fill="currentColor"   opacity={animated ? 0.9 : 0.75} />
      {/* Aperture blades */}
      <line x1="12" y1="1.5"  x2="12" y2="4"    stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="12" y1="20"   x2="12" y2="22.5"  stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="1.5" y1="12"  x2="4"  y2="12"    stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="20"  y1="12"  x2="22.5" y2="12"  stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}

export function EntranceOverlay({
  phase,
  loadState,
  webglUnavailable,
  soundEnabled,
  soundSupported,
  onToggleSound,
  onEnter,
}: EntranceOverlayProps) {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const holdStartRef = useRef<number>(0);

  const isVisible = phase === 'threshold' || phase === 'entering';
  const percent = Math.round(loadState.progress * 100);
  const canEnter = loadState.ready || webglUnavailable || Boolean(loadState.error);

  const stopHold = () => {
    if (holdTimerRef.current !== null) {
      cancelAnimationFrame(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldProgress(0);
    setIsHolding(false);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) cancelAnimationFrame(holdTimerRef.current);
    };
  }, []);

  // Keyboard Enter support for the button hold-to-enter
  useEffect(() => {
    if (phase !== 'threshold' || !canEnter) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, canEnter, onEnter]);

  const beginHold = () => {
    if (!canEnter || phase !== 'threshold') return;
    holdStartRef.current = performance.now();
    setIsHolding(true);

    const step = (now: number) => {
      const elapsed = now - holdStartRef.current;
      const pct = Math.min(1, elapsed / 700);
      setHoldProgress(pct);
      if (pct >= 1) {
        stopHold();
        onEnter();
      } else {
        holdTimerRef.current = requestAnimationFrame(step);
      }
    };
    holdTimerRef.current = requestAnimationFrame(step);
  };

  const buttonLabel = canEnter
    ? webglUnavailable || loadState.error
      ? 'Enter Static Archive'
      : 'Enter the Chamber'
    : loadState.indeterminate
    ? 'Preparing Optical Chamber…'
    : `Calibrating Specimen — ${percent}%`;

  return (
    <div
      className={`threshold-overlay ${phase === 'entering' ? 'is-entering' : ''} ${
        phase === 'active' ? 'is-dismissed' : ''
      }`}
      aria-hidden={!isVisible}
    >
      {/* Top Bar */}
      <header className="threshold-top">
        <div className="threshold-brand">
          <span className="brand-mark">
            <span className="brand-iris threshold-iris-anim" style={{ color: 'var(--accent-primary)' }}>
              <IrisMark size={20} />
            </span>
            <span>MONOLITH&nbsp;// 26</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {soundSupported && (
            <button
              type="button"
              className={`sound-pill ${soundEnabled ? 'is-on' : ''}`}
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              tabIndex={isVisible ? 0 : -1}
            >
              <span className="sound-wave" aria-hidden="true">
                <span /><span /><span /><span />
              </span>
              <span>Audio{soundEnabled ? ' On' : ' Off'}</span>
            </button>
          )}
        </div>
      </header>

      {/* Center — Narrative Introduction */}
      <div className="threshold-center">
        <div className="threshold-eyebrow">
          <span className="threshold-eyebrow-line" />
          <span className="threshold-eyebrow-text">
            Optical Metrology Chamber · 2026 Specimens
          </span>
        </div>

        <h1 className="threshold-title">
          Inside the
          <span className="threshold-title-serif">Monolith.</span>
        </h1>

        <p className="threshold-premise">
          A continuous spatial study of forty-three machined layers, real-world
          proportioned finishes, and an articulated 180° folding architecture —
          examined under controlled light.
        </p>

        <div className="threshold-admission">
          {canEnter && (
            <span className="threshold-admission-hint">
              Click · hold · or press Enter to open the aperture
            </span>
          )}

          <div className="threshold-action-row">
            <button
              type="button"
              className={`enter-chamber-btn ${isHolding ? 'is-holding' : ''}`}
              disabled={!canEnter}
              tabIndex={isVisible ? 0 : -1}
              onClick={() => {
                if (canEnter && phase === 'threshold') {
                  stopHold();
                  onEnter();
                }
              }}
              onPointerDown={beginHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
              aria-label={buttonLabel}
            >
              <span
                className="enter-chamber-fill"
                style={{ transform: `scaleX(${holdProgress})` }}
                aria-hidden="true"
              />
              <span className="enter-btn-iris" aria-hidden="true" />
              <span className="enter-chamber-label">{buttonLabel}</span>
            </button>
          </div>

          {!canEnter && (
            <div className="threshold-loader-track" aria-hidden="true">
              <div
                className={`threshold-loader-bar ${loadState.indeterminate ? 'is-indeterminate' : ''}`}
                style={loadState.indeterminate ? undefined : { width: `${Math.max(4, percent)}%` }}
              />
            </div>
          )}

          {loadState.error && (
            <p className="threshold-error" role="alert">
              {loadState.error}
            </p>
          )}
        </div>
      </div>

      {/* Bottom data strip */}
      <footer className="threshold-bottom">
        <span>GLB 2.0 · Five 2026 Hardware Specimens</span>
        <span>Scroll-Led Spatial Narrative</span>
      </footer>
    </div>
  );
}
