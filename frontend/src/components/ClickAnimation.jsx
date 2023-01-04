import React from "react";
import { motion } from "framer-motion";

const ClickAnimation = ({ children, onClick, className }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}{" "}
    </motion.div>
  );
};

export default ClickAnimation;
