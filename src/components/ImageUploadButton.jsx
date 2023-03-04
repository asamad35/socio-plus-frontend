import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClickAnimation from "./ClickAnimation";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const ImageUploadButton = ({ selectedFiles, setSelectedFiles }) => {
  const onSelectFile = (event) => {
    const userSelectedFiles = event.target.files;
    const selectedFilesArray = Array.from(userSelectedFiles);
    console.log({ selectedFiles, selectedFilesArray });
    setSelectedFiles([...selectedFilesArray, ...selectedFiles]);

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  return (
    <>
      <ClickAnimation>
        <Tooltip title="Add upto 3 images">
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
