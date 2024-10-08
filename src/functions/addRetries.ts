import { sleep } from "./sleep";

export function addRetries<TResponse, TArgs extends unknown[]>(callbackToRetry: (...args: TArgs) => Promise<TResponse>) {
  return async (...args: TArgs) => {
    let retryCount = 0;
    let newError: unknown;
    while (retryCount < 3) {
      try {
        const result = await callbackToRetry(...args);
        return result;
      } catch (error) {
        retryCount++;
        newError = error;
        if (retryCount < 3) {
          await sleep(200 * retryCount);
        }
      }
    }
    throw newError;
    // This if statement makes the function potentially return undefined, making the type less strict
    // if (newError) { 
    //   throw newError;
    // }
  };
}

// Uncomment the lines below and to play with the typing.
// If you uncomment from line 21 to 23, and comment out line 19 you can see the difference.
// const fn = addRetries((a: number, b: number) => Promise.resolve(a + b))
// fn(1,2)