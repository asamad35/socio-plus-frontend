import React from "react";
import { motion } from "framer-motion";

const ClickAnimation = ({ children, onClick, className, style }) => {
  return (
    <motion.div
      style={style}
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      transition={{ duration: 0.2 }}
    >
      {children}{" "}
    </motion.div>
  );
};

export default ClickAnimation;
