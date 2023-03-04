import React, { useEffect } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ClickAnimation from "./ClickAnimation";
const PreviewImages = ({ selectedFiles, setSelectedFiles }) => {
  const imagesArray = selectedFiles.map((file) => {
    if (file.type.includes("image")) {
      return { url: URL.createObjectURL(file) };
    } else {
      return { name: file.name };
    }
  });

  console.log({ imagesArray, selectedFiles });

  function removeFile(idx) {
    const allFiles = [...selectedFiles];
    allFiles.splice(idx, 1);
    setSelectedFiles(allFiles);
  }

  useEffect(() => {
    console.log({ selectedFiles });
  }, [selectedFiles]);

  return imagesArray.length > 0 ? (
    <div className="preview-images absolute bottom-0 bg-secondary w-full overflow-x-auto flex p-2">
      {imagesArray.map((image, idx) => {
        return image.url ? (
          //  image div
          <div className="min-w-[100px] h-[100px] sm:min-w-[150px] sm:h-[150px] ml-4 relative">
            <ClickAnimation
              onClick={() => removeFile(idx)}
              className="absolute top-0 cursor-pointer "
            >
              <HighlightOffOutlinedIcon
                style={{
                  color: "#2962ff",
                  background: "white",
                  borderRadius: "100px",
                }}
              />
            </ClickAnimation>
            <img
              className="w-full h-full object-contain "
              src={image.url}
              alt="upload"
            />
          </div>
        ) : (
          //  other doc div
          <div className="min-w-[100px] h-[100px] sm:min-w-[150px] sm:h-[150px] ml-4 relative bg-primary flex justify-center items-center text-white">
            <ClickAnimation
              onClick={() => removeFile(idx)}
              className="absolute top-0 left-0 cursor-pointer "
            >
              <HighlightOffOutlinedIcon
                style={{
                  color: "#2962ff",
                  background: "white",
                  borderRadius: "100px",
                }}
              />
            </ClickAnimation>
            {image.name}
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default PreviewImages;
