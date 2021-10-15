export const debounce = (fn: () => void, delay: number = 500) => {
  let last: number = 0,
    timer: NodeJS.Timeout;

  return function(this: any, ...args: []) {
    let now = Date.now();

    if (now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};
