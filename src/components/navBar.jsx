import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ device, cart }) => {
  return (
    <div
      className={device === "mobile" ? "fixed-bottom bg-dark" : "bg-dark w-100"}
    >
      <ul className="nav justify-content-around">
        <Link to="/">
          <i className="fa fa-lightbulb-o"></i>
          <p className="nav-link p-0 m-0">发现</p>
        </Link>
        <Link to="/order">
          <i className="fa fa-reorder"></i>
          <p className="nav-link p-0 m-0">订单</p>
        </Link>
        <Link to="/cart">
          <i className="fa fa-shopping-cart"></i>
          {cart.length > 0 ? (
            <p
              className="text-warning"
              style={{ position: "absolute", top: "0px" }}
            >
              {cart.length}
            </p>
          ) : null}
          <p className="nav-link p-0 m-0">购物车</p>
        </Link>
        <Link to="/me">
          <i className="fa fa-user-circle-o"></i>
          <p className="nav-link p-0 m-0">我的</p>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
