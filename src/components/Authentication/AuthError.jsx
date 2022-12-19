import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AuthError = ({ errors, field }) => {
  return (
    <AnimatePresence>
      {errors[field] && (
        <motion.div
          className="errorPara"
          key="errorDiv"
          initial={{
            opacity: 0,
            transform: "translateX(-100%)",
            height: 0,
          }}
          animate={{
            opacity: 1,
            transform: "translateX(0%)",
            height: "auto",
          }}
          exit={{
            opacity: 0,
            height: 0,
            transform: "translateX(-100%)",
          }}
          transition={{ duration: 0.5 }}
        >
          {errors[field]?.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthError;
