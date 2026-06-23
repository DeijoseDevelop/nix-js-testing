export type CleanupFn = () => void;

const cleanups: CleanupFn[] = [];

export function registerCleanup(cleanup: CleanupFn): void {
  cleanups.push(cleanup);
}

export function cleanup(): void {
  while (cleanups.length > 0) {
    const fn = cleanups.pop();
    try {
      fn?.();
    } catch {
      // ignore cleanup errors
    }
  }
}
