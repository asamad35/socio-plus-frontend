export function debounce(callbackFn, sec = 2000) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(args);
    }, sec);
  };
}

export function secondsToMinutes(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const result = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")} `;
  return result;
}
