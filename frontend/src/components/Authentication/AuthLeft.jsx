import React from "react";

const AuthLeft = ({ signup }) => {
  return (
    <section
      className={`bg-primary ${
        signup ? "basis-1/3" : "basis-1/2"
      } place-items-center hidden md:grid md: rounded-l-2xl`}
    >
      <div className="bg-[url('./src/assets/auth.jpg')] bg-center bg-cover w-4/5 h-4/5 rounded-2xl "></div>
    </section>
  );
};

export default AuthLeft;
