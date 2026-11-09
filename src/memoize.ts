export const memoize = <Args extends unknown[], Result>(fn: (...args: Args) => Result) => {
  const cache = new Map<string, Result>();

  return (...args: Args): Result => {
    const key = args.join(':');

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key) as Result;
  };
};
