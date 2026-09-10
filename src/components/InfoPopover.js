import { useEffect, useId, useRef, useState } from 'react';
import { Info } from '@phosphor-icons/react';

export default function InfoPopover({ label, description, className, buttonClassName, contentClassName }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const root = useRef(null);
  const id = useId();
  const open = !dismissed && (hovered || focused || pinned);
  const close = () => { setPinned(false); setDismissed(true); };
  useEffect(() => {
    if (!open) return undefined;
    const outside = event => {
      if (!root.current?.contains(event.target)) { setPinned(false); setDismissed(true); }
    };
    const escape = event => {
      if (event.key === 'Escape') { setPinned(false); setDismissed(true); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  return <div ref={root} className={className}
    onPointerEnter={event => { if (event.pointerType === 'mouse') { setHovered(true); setDismissed(false); } }}
    onPointerLeave={() => setHovered(false)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setPinned(false); } }}>
    <button type="button" className={buttonClassName} aria-label={label}
      aria-expanded={open} aria-controls={id}
      onFocus={() => { setFocused(true); setDismissed(false); }}
      onClick={() => { if (pinned) close(); else { setPinned(true); setDismissed(false); } }}>
      <Info size={28} aria-hidden="true" />
    </button>
    <div id={id} className={contentClassName} hidden={!open}><p>{description}</p></div>
  </div>;
}
