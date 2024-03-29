import pdfIcon from "./assets/pdf-icon.png";
import otherFile from "./assets/other-file-icon.png";
import pptIcon from "./assets/ppt-icon.png";
import wordIcon from "./assets/word-icon.webp";
import excelIcon from "./assets/excel-icon.png";
import imageCompression from "browser-image-compression";

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
      result.append(propertyName, el.file);
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

export function getFileIcon(fileName) {
  console.log({ fileName });
  const nameSplit = fileName.split(".");
  const extName = nameSplit[nameSplit.length - 1];

  let icon;
  switch (extName) {
    case "pdf":
      icon = pdfIcon;
      break;

    case "ppt":
    case "pptx":
      icon = pptIcon;
      break;

    case "doc":
    case "docx":
    case "docm":
      icon = wordIcon;
      break;

    case "xlsx":
    case "xls":
    case "xlsm":
      icon = excelIcon;
      break;

    default:
      icon = otherFile;
  }

  return icon;
}

export const downloadMedia = async (originalurl) => {
  try {
    fetch(originalurl)
      .then((resp) => {
        return resp.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        const nameSplit = originalurl.split("/");
        const duplicateName = nameSplit.pop();

        // the filename you want
        a.download = "" + duplicateName + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the image ", error)
      );
  } catch (error) {
    console.log("Error while downloading the image ", error);
  }
};

export function isInViewport(id) {
  const element = document.getElementById(id);
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getFullName(userObj) {
  return userObj.firstName + " " + userObj.lastName;
}

export async function convertUrlToBase64(imageFile) {
  // const res = await fetch(imgUrl);
  // const imgBlob = await res.blob();

  console.log(imageFile.size, "before sizeeeeeee");
  const compressesImageFile = await imageCompression(imageFile, {
    maxSizeMB: 0.05,
    maxIteration: 20,
  });
  console.log(compressesImageFile.size, "after sizeeeeeee");

  const base64Img = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(compressesImageFile);

    fr.addEventListener("load", () => {
      // console.log(fr.result, " sizeeeeeee");

      resolve(fr.result);
    });
  });

  return base64Img;
}
export async function reduceImageSize(imageFile, thumbnail) {
  console.log(imageFile.size, imageFile, "before sizeeeeeee");
  let compressesImageFile = await imageCompression(imageFile, {
    maxSizeMB: 0.2,
    useWebWorker: true,
    fileType: "image/jpeg",
    maxWidthOrHeight: 600,
  });
  compressesImageFile = new File([compressesImageFile], imageFile.name, {
    type: imageFile.type,
  });
  console.log(
    compressesImageFile.size,
    compressesImageFile,
    "after sizeeeeeee"
  );

  return compressesImageFile;
}
