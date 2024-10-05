import { sleep } from "./sleep";

export const dangerousFunction = async () => {
  await sleep(100 + Math.random() * 50);
  const hasErrored = Math.random() > 0.5;
  if (hasErrored) {
    throw new Error(`Unknown error at ${new Date().toISOString()}`);
  }
  return { message: `Success at ${new Date().toISOString()}` };
};


let runningPromise: Promise<unknown> | undefined;

export const noParallelCalls = async <T extends () => Promise<unknown>>(
  dangerousCallBack: T
) => {
  if (!runningPromise) {
    runningPromise = dangerousCallBack()
      .finally(() => runningPromise = undefined)
  }
  return runningPromise
};
