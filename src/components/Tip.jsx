import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

const Tip = () => {
  const authButton = useSelector((state) => state.authReducer.authButton);

  return (
    <AnimatePresence>
      {authButton == "loading" && (
        <motion.p
          initial={{ bottom: "100%" }}
          animate={{ bottom: "88%" }}
          exit={{ bottom: "100%" }}
          transition={{ duration: 0.4 }}
          className="absolute text-center right-1/2 font-bold text-sm w-[300px] shadow-2xl text-black translate-x-1/2 p-2 rounded-2xl flex justify-center items-center  bg-secondary"
        >
          Tip: Free servers are slow, if you can't login refresh and try again.{" "}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Tip;
