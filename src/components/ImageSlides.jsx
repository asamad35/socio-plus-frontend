import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { setImageGallery } from "../redux/actions";
const ImageSlides = () => {
  const imageGallery = useSelector((state) => state.chatReducer.imageGallery);
  const dispatch = useDispatch();

  return imageGallery.length > 0 ? (
    <>
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

      <div
        onClick={(e) => {
          dispatch(setImageGallery([]));
        }}
        className={` absolute h-full w-full z-10  transition bg-black/80 overflow-hidden`}
      ></div>
    </>
  ) : (
    <></>
  );
};
export default ImageSlides;
