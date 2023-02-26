import { motion } from "framer-motion";

const variants = {
  show: { opacity: 1, scale: 1 },
  hide: { opacity: 0, scale: 0 },
};
const ScaleDivsAnimation = ({ openState, children, className }) => {
  return (
    <div className="" style={{ position: "relative" }}>
      <motion.div
        variants={variants}
        initial={"show"}
        animate={!openState ? "show" : "hide"}
        transition={{ duration: 0.3 }}
        style={{
          display: "flex",
        }}
      >
        {children[0]}
      </motion.div>

      <motion.div
        variants={variants}
        initial={"hide"}
        animate={openState ? "show" : "hide"}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", position: "absolute", top: 0, left: 0 }}
      >
        {children[1]}
      </motion.div>
    </div>
  );
};

export default ScaleDivsAnimation;
