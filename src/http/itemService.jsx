import http from "./httpService";

const apiEndpoint = "/items/";

export function getItems() {
  return http.get(apiEndpoint);
}

export function getMyItem(user) {
  return http.get(apiEndpoint + user._id);
}

export function createItem(item) {
  return http.post(apiEndpoint, {
    owner: item.owner,
    name: item.name,
    type: item.type,
    describe: item.describe,
    stock: item.stock,
    discount: item.discount,
    price: item.price,
    img: item.img,
  });
}

export default {
  getItems,
  getMyItem,
  createItem,
};
