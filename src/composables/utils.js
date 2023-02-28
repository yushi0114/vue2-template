export const inBrowser = typeof window !== "undefined";
export function raf(fn) {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cancelRaf(id) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}

// double raf for animation
export function doubleRaf(fn) {
  raf(() => raf(fn));
}

export const extend = Object.assign;
