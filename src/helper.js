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

export function getFormData(obj = {}, fileArr, propertyName) {
  const result = new FormData();

  for (const property in obj) {
    result.append(property, obj[property]);
  }
  if (fileArr) {
    fileArr.forEach((el) => {
      console.log({ aaa: el, bbb: el[0] });
      result.append(propertyName, el);
    });
  }
  return result;
}

export function getOtherUserInfo(usersArr, loggedUser) {
  if (!loggedUser || !usersArr) return null;
  let otherUserInfo = {};

  usersArr?.forEach((el) => {
    if (el._id !== loggedUser._id) otherUserInfo = el;
  });

  return otherUserInfo;
}

export function showMessagePic(allMessages) {
  const messageList = allMessages.map((el, i) => {
    if (
      allMessages[i]?.sender?._id === allMessages[i + 1]?.sender?._id &&
      i + 1 <= allMessages.length
    ) {
      return { ...el, showPic: false };
    } else {
      return { ...el, showPic: true };
    }
  });

  return messageList;
}
