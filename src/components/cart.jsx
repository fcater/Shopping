import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Logo from "./../common/logo";
import { getCurrentUserOffLine } from "./../http/authServices";
import cartCount from "./../unit/cartCount";
import getTotalPrice from "./../unit/getTotalPrice";
import { createOrder, getMightLike } from "../http/orderService";
import CartContext from "./../context/cartContext";
import getUniqueList from "./../unit/getUniqueCart";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cart, onAddCart, onRemoveCart, onRemoveAllCart } = cartContext;

  //获取本地用户
  const user = getCurrentUserOffLine();
  //获取购物车中唯一同类商品
  const cartUnique = getUniqueList(cart);
  //每次从数据库中读取类似推荐
  const [mightLike, setMightLike] = useState([]);

  useEffect(() => {
    async function MightLike() {
      let { data: mightLike } = await getMightLike(user);
      mightLike = mightLike.flat();
      setMightLike(mightLike);
    }
    MightLike();
    return () => setMightLike(false);
  }, []);

  return user ? (
    <div className="text-dark w-100">
      <Logo />
      {cart.length > 0 ? (
        <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1">
          <h2 className="mb-4">
            <i className="fa fa-shopping-cart mr-4 text-success"></i>购物车
          </h2>
          {cartUnique.map((item) => (
            <div
              key={item._id}
              className="d-flex p-2 border rounded bg-light mt-3 m-1"
            >
              <img src={item.img} style={{ width: "80px", height: "80px" }} />
              <div className="d-flex flex-column align-items-start pl-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>{item.name}</h4>
                  <p className="m-2 ml-5 text-danger">
                    ￥
                    {Math.round(
                      item.price * ((100 - item.discount) / 100) * 10
                    ) / 10}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <i
                    className="fa fa-plus text-danger"
                    onClick={() => onAddCart(item)}
                  ></i>
                  <div className="pl-3 pr-3">
                    数量:{cartCount(cart, item.name)}
                  </div>
                  <i
                    className="fa fa-minus"
                    onClick={() => onRemoveCart(item)}
                  ></i>
                  <button
                    className="ml-3 btn btn-danger"
                    onClick={() => onRemoveAllCart(item)}
                  >
                    移除
                  </button>
                </div>
              </div>
            </div>
          ))}
          <p>
            <b> 总价：</b>
            <b className="m-2 ml-5 text-danger">￥{getTotalPrice(cart)}</b>
          </p>
          <button
            className="btn btn-success"
            onClick={() => {
              createOrder(user._id, cart);
              onRemoveAllCart();
            }}
          >
            结算
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1">
          <h2 className="mb-4">
            <i className="fa fa-shopping-cart mr-4 text-success"></i>购物车
          </h2>
          <div className="d-flex flex-column align-items-center">
            <i className="fa fa-shopping-basket fa-4x mb-2"></i>
            <p>购物车竟然是空的</p>
            <small>再忙，也要记得买点什么犒劳自己~</small>
            <Link className="btn btn-danger w-25 mt-4" to="/">
              去逛逛
            </Link>
          </div>
        </div>
      )}
      <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1 justify-content-center">
        <p>--您可能还喜欢--</p>
        {mightLike.map((item) => (
          <div key={item._id + "cart"} className="card text-dark m-1">
            <div style={{ overflow: "hidden", maxHeight: "15em" }}>
              <img src={item.img} className="card-img-top" alt="..." />
            </div>
            <div className="card-body p-0">
              <div
                className="m-1 mb-2"
                style={{
                  overflow: "hidden",
                  maxHeight: "3em",
                }}
              >
                <p
                  className="font-weight-bolder m-0 text-left"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {item.name + " - "}
                  {item.describe}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center m-0">
                <p className="m-0 mr-2 text-danger">
                  ￥
                  {Math.round(item.price * ((100 - item.discount) / 100) * 10) /
                    10}
                </p>
                <small>{item.sales}人付款</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Redirect to="login" />
  );
};

export default Cart;
