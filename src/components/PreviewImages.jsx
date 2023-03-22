import React, { useEffect } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ClickAnimation from "./ClickAnimation";
import { getFileIcon } from "../helper";
const PreviewImages = ({ selectedFiles, setSelectedFiles }) => {
  const filesArray = selectedFiles.map((el) => {
    if (el.file.type.includes("image")) {
      return {
        url: URL.createObjectURL(el.file),
        isImage: true,
        name: el.file.name,
      };
    } else {
      return { name: el.file.name, url: false, isImage: false };
    }
  });

  function removeFile(idx) {
    const allFiles = [...selectedFiles];
    allFiles.splice(idx, 1);
    setSelectedFiles(allFiles);
  }

  return filesArray.length > 0 ? (
    <div className="preview-images absolute bottom-full bg-secondary w-full overflow-x-auto flex p-4 z-10">
      {filesArray.map((file, idx) => {
        return file.isImage ? (
          //  file div
          <div className="min-w-[100px] h-[100px] sm:min-w-[150px] sm:h-[150px] ml-4 border-4 p-2 border-primary rounded-lg relative">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 cursor-pointer ">
              <ClickAnimation onClick={() => removeFile(idx)} className="">
                <HighlightOffOutlinedIcon
                  style={{
                    color: "#2962ff",
                    background: "white",
                    borderRadius: "100px",
                  }}
                />
              </ClickAnimation>
            </div>
            <img
              className="w-full h-full object-contain "
              src={file.url}
              alt={file.name}
            />
          </div>
        ) : (
          //  other doc div
          <div className="min-w-[100px] h-[100px] sm:min-w-[150px] sm:h-[150px] ml-4 relative bg-secondary border-4 border-primary gap-4   rounded-lg p-2 flex flex-col justify-center items-center text-white">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 cursor-pointer ">
              <ClickAnimation onClick={() => removeFile(idx)} className="">
                <HighlightOffOutlinedIcon
                  style={{
                    color: "#2962ff",
                    background: "white",
                    borderRadius: "100px",
                  }}
                />
              </ClickAnimation>
            </div>
            <img
              src={getFileIcon(file.name)}
              alt="fileIcon"
              className=" h-1/3 "
            />

            <p className="break-all text-primary preview-images overflow-y-auto">
              {file.name}
            </p>
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default PreviewImages;
