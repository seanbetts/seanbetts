import { useEffect, useRef, useState } from 'react';
import styles from './PanelFocusCanvas.module.css';

// Computed polygon coordinates in these panels use px, %, and calc sums.
// Resolve against the actual card size, including pixel-sized diagonal seams.
function resolveLength(value, size) {
  const terms = value.replace(/^calc\((.*)\)$/, '$1').match(/[+-]?\s*(?:\d*\.)?\d+(?:px|%)/g);
  if (!terms) return NaN;
  return terms.reduce((sum, term) => sum + parseFloat(term.replace(/\s/g, '')) * (term.endsWith('%') ? size / 100 : 1), 0);
}

function outlinePoints(shape, svg) {
  const style = getComputedStyle(shape);
  const width = parseFloat(style.width);
  const height = parseFloat(style.height);
  const matrix = svg.getScreenCTM();
  if (!width || !height || !matrix) return null;

  const clip = style.clipPath;
  const corners = clip === 'none'
    ? [[0, 0], [width, 0], [width, height], [0, height]]
    : clip.startsWith('polygon(') ? clip.slice(8, -1).split(',').map(point => {
      const [x, y] = point.match(/calc\([^()]+\)|-?(?:\d*\.)?\d+(?:px|%)/g) || [];
      return [resolveLength(x || '', width), resolveLength(y || '', height)];
    }) : null;
  if (!corners || corners.some(point => point.some(value => !Number.isFinite(value)))) return null;

  // The card and overlay share the canvas transform. Recover the card's local
  // origin from its transformed bounds, rather than outlining its bounding box.
  const bounds = shape.getBoundingClientRect();
  const origin = new DOMPoint(
    bounds.left - Math.min(0, matrix.a * width) - Math.min(0, matrix.c * height),
    bounds.top - Math.min(0, matrix.b * width) - Math.min(0, matrix.d * height),
  ).matrixTransform(matrix.inverse());
  return corners.map(([x, y]) => `${origin.x + x},${origin.y + y}`).join(' ');
}

export default function PanelFocusCanvas({ className, children }) {
  const canvas = useRef(null);
  const svg = useRef(null);
  const [target, setTarget] = useState(null);
  const [outline, setOutline] = useState(null);

  useEffect(() => {
    if (!target) return undefined;
    const shape = target.closest('[data-panel-shape]') || target;
    const measure = () => {
      const points = outlinePoints(shape, svg.current);
      setOutline(points ? { target, points } : null);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(canvas.current);
    observer?.observe(shape);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [target]);

  const ready = outline?.target === target && Boolean(target);
  return <div ref={canvas} className={`${className} ${styles.canvas}`} data-panel-focus-ready={ready}
    onFocusCapture={event => setTarget(event.target.closest('[data-panel-focus]'))}
    onBlurCapture={() => setTarget(null)}>
    {children}
    <svg ref={svg} className={styles.ring} aria-hidden="true" focusable="false">
      {ready && <>
        <polygon points={outline.points} className={styles.backing} />
        <polygon points={outline.points} className={styles.accent} />
      </>}
    </svg>
  </div>;
}
