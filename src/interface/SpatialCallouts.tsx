import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SPATIAL_ANCHORS } from '../assets/manifest';
import type { ProjectedCallout } from '../scene/SceneEngine';

export interface SpatialCalloutsHandle {
  update: (callouts: ProjectedCallout[]) => void;
}

/**
 * Imperatively updated 3D-to-DOM callout hairlines.
 * Updates DOM transforms directly on requestAnimationFrame without React re-renders.
 */
export const SpatialCallouts = forwardRef<SpatialCalloutsHandle>(function SpatialCallouts(
  _props,
  ref
) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const dotRefs = useRef<Record<string, SVGCircleElement | null>>({});

  useImperativeHandle(ref, () => ({
    update(callouts: ProjectedCallout[]) {
      const byId = new Map(callouts.map((c) => [c.id, c]));

      for (const anchor of SPATIAL_ANCHORS) {
        const el = itemRefs.current[anchor.id];
        const line = lineRefs.current[anchor.id];
        const dot = dotRefs.current[anchor.id];
        const data = byId.get(anchor.id);

        if (!el || !line || !dot) continue;

        if (!data || data.opacity <= 0.02) {
          el.style.opacity = '0';
          line.style.opacity = '0';
          dot.style.opacity = '0';
          continue;
        }

        const labelX = Math.max(150, Math.min(window.innerWidth - 175, data.x + data.offsetX));
        const labelY = Math.max(85, Math.min(window.innerHeight - 60, data.y + data.offsetY));

        el.style.opacity = String(data.opacity);
        el.style.transform = `translate3d(${labelX}px, ${labelY}px, 0) translate(-50%, -50%)`;

        line.setAttribute('x1', String(data.x));
        line.setAttribute('y1', String(data.y));
        line.setAttribute('x2', String(labelX));
        line.setAttribute('y2', String(labelY));
        line.style.opacity = String(data.opacity * 0.72);

        dot.setAttribute('cx', String(data.x));
        dot.setAttribute('cy', String(data.y));
        dot.style.opacity = String(data.opacity);
      }
    },
  }));

  return (
    <div className="spatial-callouts-layer" aria-hidden="true">
      <svg className="spatial-callouts-svg">
        {SPATIAL_ANCHORS.map((anchor) => (
          <g key={anchor.id}>
            <line
              ref={(node) => {
                lineRefs.current[anchor.id] = node;
              }}
              className="callout-leader"
              x1="0"
              y1="0"
              x2="0"
              y2="0"
            />
            <circle
              ref={(node) => {
                dotRefs.current[anchor.id] = node;
              }}
              className="callout-dot"
              cx="0"
              cy="0"
              r="3"
            />
          </g>
        ))}
      </svg>

      {SPATIAL_ANCHORS.map((anchor) => (
        <div
          key={anchor.id}
          ref={(node) => {
            itemRefs.current[anchor.id] = node;
          }}
          className="spatial-callout-tag"
        >
          <span className="callout-code">{anchor.label}</span>
          <span className="callout-desc">{anchor.detail}</span>
        </div>
      ))}
    </div>
  );
});

