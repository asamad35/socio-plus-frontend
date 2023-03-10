import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClickAnimation from "./ClickAnimation";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ImageUploadButton = ({ selectedFiles, setSelectedFiles }) => {
  const onSelectFile = (event) => {
    const userSelectedFiles = event.target.files;
    const selectedFilesArray = Array.from(userSelectedFiles).map((el) => ({
      uuid: uuidv4(),
      file: el,
    }));
    if (
      selectedFilesArray.some((el) => {
        console.log(el.file, "aaaaaaaaaaaabvbv");
        return el.file.type.includes("image") && el.file.size > 8000000;
      })
    ) {
      toast.error(`Images cannot be larger than 8MB`);
      return;
    }
    setSelectedFiles([...selectedFilesArray, ...selectedFiles]);

    // ! tried optimizing images before sending but it was taking a lot of time to optmize

    // for (const el of Array.from(userSelectedFiles)) {
    //   if (el.type.includes("image") && el.size > 8000000) {
    //     toast.error(`${el.name} is larger than 8MB`);
    //     break;
    //   } else if (el.type.includes("image") && el.size < 8000000) {
    //     const compressedImage = await reduceImageSize(el);
    //     selectedFilesArray.push({
    //       uuid: uuidv4(),
    //       file: compressedImage,
    //     });
    //   } else {
    //     selectedFilesArray.push({
    //       uuid: uuidv4(),
    //       file: el,
    //     });
    //   }
    // }

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  // useEffect(() => {
  //   console.log({ selectedFiles });
  // }, [selectedFiles]);

  return (
    <>
      <ClickAnimation>
        <Tooltip title="Add documents">
          <Box
            sx={{
              backgroundColor: "#848584",
              borderRadius: "2rem",
              height: "30px",
              width: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <input
              type="file"
              name="message-file"
              id="message-file-input"
              className="profile-pic-input"
              multiple
              onChange={onSelectFile}
            />
            <label
              htmlFor="message-file-input"
              className="profile-pic-label"
            ></label>
            <AttachFileOutlinedIcon fontSize="small" />
          </Box>
        </Tooltip>
      </ClickAnimation>
    </>
  );
};

export default ImageUploadButton;
