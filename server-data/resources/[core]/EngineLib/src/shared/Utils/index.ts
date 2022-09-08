export class TimeoutError extends Error {
  constructor(message = 'Timeout error occurred') {
    super(message);
    this.name = "TimeoutError";
  }
}

export const promiseTimeout = function <T = any>(promise: Promise<T>, ms = 10000): Promise<T> {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timed out in ${ms}ms.`));
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race<Promise<T>>([promise, timeout]);
};

// export const Loop = function<T = any>(callback: () => any, step: number = 0, timeout: number = 0): Promise<T> {

//   let promiseResolve;
//   let promiseReject;

//   let tickId;
//   let timeoutId;

//   const lp = new Promise<T>((resolve, reject) => {
//     promiseResolve = resolve;
//     promiseReject = reject;
//   });

//   tickId = setTick(async() => {
//     if (step > 0) await Delay(step);

//     const res = await callback();
//     if (res !== undefined) {
//       if (timeoutId !== undefined) clearTimeout(timeoutId);
//       clearTick(tickId);
//       promiseResolve(res);
//     }
//   })

//   if (timeout > 0) {
//     timeoutId = setTimeout(() => {
//       if (tickId !== undefined) clearTick(tickId);
//       promiseReject();
//     }, timeout);
//   }

//   return lp;
// }

export const assert = (value, message = ''): void => {
  if (!value) throw new Error(`ASSERT! ${message}`);
};

export function Delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

export async function WaitFor(func: () => any, pollDelay: number = 100, timeout: number = undefined) {
  let res = undefined;
  let timeSpent = 0;
  do {
    res = await func();
  }
  while (res === undefined) {
      await Delay(pollDelay);
      timeSpent += pollDelay;
      if (timeSpent >= timeout) throw new TimeoutError();
  }

  return res;
}

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);