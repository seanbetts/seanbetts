import { useSyncExternalStore } from 'react';

const query = '(min-width: 1024px)';
const getSnapshot = () => typeof window.matchMedia !== 'function' || window.matchMedia(query).matches;
const subscribe = (onChange) => {
  if (typeof window.matchMedia !== 'function') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export default function useDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
