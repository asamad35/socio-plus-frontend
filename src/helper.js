export function debounce(callbackFn, sec = 2000) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(args);
    }, sec);
  };
}
