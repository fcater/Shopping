import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { logout } from "./../http/authServices";
import imgs from "./../img/imgApi";
import Logo from "./../common/logo";
import getUser from "./../unit/userLogic";
import { getMightLike } from "../http/orderService";
import { getMyItem } from "../http/itemService";

const Me = () => {
  //是否有后端
  const backend = true;
  //无后端获取本地用户
  const user = getUser(backend);
  const [mightLike, setMightLike] = useState([]);
  const [myItem, setMyItem] = useState([]);

  useEffect(async () => {
    if (user) {
      let { data: mightLike } = await getMightLike(user);
      mightLike = mightLike.flat();
      let { data: myItem } = await getMyItem(user);

      myItem ? setMyItem(myItem) : setMightLike([]);
      mightLike ? setMightLike(mightLike) : setMightLike([]);
    }
    return;
  }, []);

  const { post3 } = imgs.post;
  return (
    <div className="text-dark w-100">
      <Logo />
      {!backend && alert("未检测到后端服务，将以本地用户进行操作")}
      {user ? (
        <div>
          <div className="d-flex p-3 border rounded bg-light mb-3 m-1">
            <img
              src={post3}
              className="overflowHidden rounded-circle"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="d-flex flex-column justify-content-center align-items-start pl-3">
              <h4>
                {user.userName}
                <Link
                  to="/items"
                  className="ml-5 btn btn-info justify-self-end"
                >
                  成为卖家
                </Link>
              </h4>
              <p>{user.email}</p>
            </div>
          </div>
          <button className="btn btn-secondary mb-2" onClick={logout}>
            注销
          </button>
          {myItem.length > 0 ? (
            <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1">
              <h2 className="mb-4">我的商品</h2>
              {myItem.map((item) => (
                <div
                  key={item._id}
                  className="d-flex p-2 border rounded bg-light mt-3 m-1"
                >
                  <img
                    src={item.img}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div className="d-flex flex-column align-items-between pl-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>{item.name}</h4>
                      <small className="ml-2 text-danger">
                        {"价格：￥" + item.price}
                      </small>
                    </div>
                    <p className="text-left">{item.describe}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="d-flex flex-column p-3 border rounded bg-light mb-3 m-1 justify-content-center">
            <p>--您可能还喜欢--</p>
            {mightLike.map((item) => (
              <div key={item._id + "me"} className="card text-dark m-1">
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
                      {Math.round(
                        item.price * ((100 - item.discount) / 100) * 10
                      ) / 10}
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
      )}
    </div>
  );
};

export default Me;
