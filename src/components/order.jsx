import React, { useState, useEffect } from "react";
import fakeData from "./../http/fakeData";
import Logo from "./../common/logo";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUserOffLine } from "./../http/authServices";
import { getOrders } from "./../http/orderService";
import getUniqueOrder from "../unit/getUniqueOrder";

const Order = () => {
  const user = getCurrentUserOffLine();
  const [order, setOrder] = useState([]);

  useEffect(async () => {
    if (user) {
      const { data: order } = await getOrders(user);
      if (order) {
        const uniqueOrder = getUniqueOrder(order);
        setOrder(uniqueOrder);
      } else setOrder([]);
    }
  }, []);

  return user ? (
    order.length > 0 ? (
      <div className="text-dark w-100">
        {order.map((o) => (
          <div
            key={o._id}
            className="d-flex p-2 border rounded bg-light mt-3 m-1"
          >
            <img src={o.item.img} style={{ width: "80px", height: "80px" }} />
            <div className="d-flex flex-column align-items-between pl-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4>{o.item.name}</h4>
                <small className="ml-2 text-dark">{"数量：" + o.number}</small>
                <small className="bg-success text-light rounded-pill">
                  {o.state}
                </small>
              </div>
              <p className="text-left">{o.item.describe}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-dark w-100">
        <Logo />
        <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1">
          <h2 className="mb-4">订单</h2>
          <div className="d-flex flex-column align-items-center">
            <i className="fa fa-gift fa-4x mb-2 text-danger"></i>
            <p>订单竟然是空的</p>
            <small>再忙，也要记得买点什么犒劳自己~</small>
            <Link className="btn btn-danger w-25 mt-4" to="/">
              去逛逛
            </Link>
          </div>
        </div>
      </div>
    )
  ) : (
    <Redirect to="/login"></Redirect>
  );
};

export default Order;
