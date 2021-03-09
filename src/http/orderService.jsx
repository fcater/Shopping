import http from "./httpService";
import getUniqueCart from "./../unit/getUniqueCart";

const apiEndpoint = "/orders/";
const jwt = localStorage.getItem("token") || "";

//获取本人订单
export function getOrders(user) {
  return http.get(apiEndpoint + user._id, { headers: { "x-auth-token": jwt } });
}
//获取可能喜欢
export function getMightLike(user) {
  if (user) {
    return http.get(apiEndpoint + user._id + "/mightlike", {
      headers: { "x-auth-token": jwt },
    });
  } else return { data: [] };
}

//创建订单
export function createOrder(userId, cart) {
  const uniquelist = getUniqueCart(cart);
  for (let i of uniquelist) {
    const itemList = cart.filter((c) => c._id === i._id);
    http.post(apiEndpoint, {
      customer: userId,
      item: itemList[0]._id,
      number: itemList.length,
      state: "运输中",
    });
  }
  return;
}

export default {
  getOrders,
  createOrder,
  getMightLike,
};
