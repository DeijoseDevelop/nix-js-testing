export interface WaitForOptions {
  timeout?: number;
  interval?: number;
}

export async function waitFor(
  callback: () => void | Promise<void>,
  options: WaitForOptions = {}
): Promise<void> {
  const timeout = options.timeout ?? 1000;
  const interval = options.interval ?? 50;
  const start = Date.now();

  let lastError: Error | undefined;

  while (Date.now() - start < timeout) {
    try {
      await callback();
      return;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  throw lastError ?? new Error("waitFor timeout");
}
