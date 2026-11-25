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
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) {
        cancelAnimationFrame(holdTimerRef.current);
      }
    };
  }, []);

  const beginHold = () => {
    if (!canEnter || phase !== 'threshold') return;
    holdStartRef.current = performance.now();

    const step = (now: number) => {
      const elapsed = now - holdStartRef.current;
      const pct = Math.min(1, elapsed / 600);
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
    ? 'Preparing Specimen…'
    : `Calibrating Specimen (${percent}%)`;

  return (
    <div
      className={`threshold-overlay ${phase === 'entering' ? 'is-entering' : ''} ${
        phase === 'active' ? 'is-dismissed' : ''
      }`}
      aria-hidden={!isVisible}
    >
      <header className="threshold-top">
        <span className="threshold-brand">
          <span className="brand-dot" aria-hidden="true" />
          <span>MONOLITH // 26</span>
        </span>

        {soundSupported && (
          <button
            type="button"
            className={`sound-pill ${soundEnabled ? 'is-on' : ''}`}
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            tabIndex={isVisible ? 0 : -1}
          >
            <span>Audio: {soundEnabled ? 'On' : 'Muted'}</span>
          </button>
        )}
      </header>

      <div className="threshold-center">
        <p className="threshold-kicker">OPTICAL METROLOGY CHAMBER · 2026 SPECIMENS</p>
        <h1 className="threshold-title">
          Inside the <em>Monolith</em>.
        </h1>
        <p className="threshold-premise">
          A continuous spatial study of forty-three machined layers, real-world
          proportioned finishes, and an articulated 180° folding architecture.
        </p>

        <div className="threshold-action-row">
          <button
            type="button"
            className="enter-chamber-btn"
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
          >
            <span
              className="enter-chamber-fill"
              style={{ transform: `scaleX(${holdProgress})` }}
              aria-hidden="true"
            />
            <span className="enter-chamber-label">{buttonLabel}</span>
          </button>

          {canEnter && (
            <span className="threshold-hint">
              Click, press Enter, or hold to open aperture
            </span>
          )}
        </div>

        {!canEnter && (
          <div className="threshold-loader-track" aria-hidden="true">
            <div
              className={`threshold-loader-bar ${
                loadState.indeterminate ? 'is-indeterminate' : ''
              }`}
              style={
                loadState.indeterminate ? undefined : { width: `${Math.max(4, percent)}%` }
              }
            />
          </div>
        )}

        {loadState.error && (
          <p className="threshold-error" role="alert">
            {loadState.error}
          </p>
        )}
      </div>

      <footer className="threshold-bottom">
        <span>APPLE 2026 GLTF 2.0 ARCHIVE</span>
        <span>SCROLL-LED SPATIAL NARRATIVE</span>
      </footer>
    </div>
  );
}
