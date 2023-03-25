import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { setImageGallery } from "../redux/actions";
import { motion } from "framer-motion";
import ClickAnimation from "./ClickAnimation";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const ImageSlides = () => {
  const imageGallery = useSelector((state) => state.chatReducer.imageGallery);
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex items-center justify-center absolute z-[100]"
    >
      <div className="w-[90%] h-full flex items-center justify-center relative">
        <ImageGallery
          items={imageGallery}
          showBullets={false}
          showIndex={false}
          showThumbnails={true}
          lazyLoad={false}
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={false}
          thumbnailPosition={"bottom"}
        />

        <ClickAnimation
          onClick={() => removeFile(idx)}
          className="absolute z-[100] top-[20px] right-[20px] cursor-pointer"
        >
          <HighlightOffOutlinedIcon
            onClick={(e) => {
              dispatch(setImageGallery([]));
            }}
            style={{
              color: "#2962ff",
              background: "white",
              borderRadius: "100px",
            }}
          />
        </ClickAnimation>
      </div>

      <div
        onClick={(e) => {
          dispatch(setImageGallery([]));
        }}
        className={` absolute h-full w-full z-10  transition bg-black/80 overflow-hidden`}
      ></div>
    </motion.div>
  );
};
export default ImageSlides;
