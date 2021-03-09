import React from "react";
import imgs from "./../img/imgApi";

const Logo = () => {
  const { logo1, logo2 } = imgs.logo;
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "black" }}
    >
      <img className="w-25" src={logo2} alt="" />
      <h1 className="ml-5 mr-5">×</h1>
      <img src={logo1} alt="" style={{ width: "3em" }} />
    </div>
  );
};

export default Logo;
