import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log("toke_user ", user);
// const currentUser = user && JSON.parse(user).currentUser;
// console.log("toke_currentUser ", currentUser);
// const TOKEN = currentUser?.token;
const TOKEN = 'adbc'
console.log("toke_Token ", TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (TOKEN) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};
