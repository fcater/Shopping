import React from "react";
import cartCount from "./../unit/cartCount";

const Card = ({ user, cartContext, img, product }) => {
  const { cart, onAddCart, onRemoveCart } = cartContext;

  const { name, describe, stock, price, sales, discount } = product;
  // //计算购物车中的该物品数量
  const numberInCart = cartCount(cart, name);

  function goToLogin() {
    return (window.location = "/login");
  }

  return (
    <div className="card text-dark m-1">
      <div style={{ overflow: "hidden", maxHeight: "15em" }}>
        <img src={img} className="card-img-top" alt="..." />
      </div>
      <div className="card-body p-0">
        <div
          className="m-1 mb-2"
          style={{
            overflow: "hidden",
            maxHeight: "3em",
          }}
        >
          {discount ? (
            <p
              className="bg-success text-light rounded p-1"
              style={{ position: "absolute", top: "0", right: "0" }}
            >
              <i className="fa fa-cart-arrow-down"></i>
              <b> {discount}%</b>
            </p>
          ) : null}
          {sales > 5000 ? (
            <p
              className="bg-danger text-light rounded p-1"
              style={{ position: "absolute", top: "0", left: "0" }}
            >
              <i className="fa fa-thermometer-full"></i>
              <b> 热卖</b>
            </p>
          ) : null}
          <p
            className="font-weight-bolder m-0 text-left"
            style={{ textOverflow: "ellipsis" }}
          >
            {name + " - "}
            {describe}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center m-0">
          <small>{sales}人付款</small>
          <small className="m-0 mr-2 text-secondary">库存 {sales}</small>
        </div>
        <div className="d-flex justify-content-between align-items-center m-0">
          <div className="d-flex align-items-center">
            <p className="m-0 mr-2 text-danger">
              ￥{Math.round(price * ((100 - discount) / 100) * 10) / 10}
            </p>
            {numberInCart ? (
              <div className="d-flex align-items-center">
                <p className="ml-4 mr-2">{numberInCart}</p>
                <i
                  className="fa fa-minus text-dark"
                  onClick={() => onRemoveCart(product)}
                ></i>
              </div>
            ) : (
              discount !== 0 && (
                <small
                  className="m-0 mr-3 text-secondary"
                  style={{ textDecoration: "line-through" }}
                >
                  {"￥" + price}
                </small>
              )
            )}
          </div>
          <i
            onClick={user ? () => onAddCart(product) : goToLogin}
            className={
              numberInCart
                ? "fa fa-shopping-cart mr-2 text-danger"
                : "fa fa-shopping-cart mr-2"
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
