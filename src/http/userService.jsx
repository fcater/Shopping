import http from "./httpService";

const apiEndpoint = "/users/";
const jwt = localStorage.getItem("token") || "";

export function getAllUsers() {
  return http.get(apiEndpoint, { headers: { "x-auth-token": jwt } });
}
//需要管理员权限

export function register(user) {
  return http.post(apiEndpoint, {
    userName: user.userName,
    email: user.email,
    password: user.password,
  });
}
export function addToCart(user, cart) {
  http.put(
    apiEndpoint + user._id,
    {
      cart: cart,
    },
    { headers: { "x-auth-token": jwt } }
  );
}

export default {
  getAllUsers,
  register,
};
