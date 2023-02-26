import React from "react";
import leftImage from "../../assets/auth.jpg";

const AuthLeft = ({ signup }) => {
  return (
    <section
      className={`bg-primary ${
        signup ? "basis-1/3" : "basis-1/2"
      } place-items-center hidden md:grid md: rounded-l-2xl`}
    >
      <div
        style={{ backgroundImage: `url(${leftImage})` }}
        className={`bg-center bg-cover w-4/5 h-4/5 rounded-2xl`}
      ></div>
    </section>
  );
};

export default AuthLeft;
