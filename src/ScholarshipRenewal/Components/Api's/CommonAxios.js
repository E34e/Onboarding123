import axios from "axios";
//import { API_URL } from "./APIs";

export const CommonAxios = async (url) => {
  let data = "";
  let dataAccount = JSON.parse(localStorage.getItem("datta-account"));
  //console.log(JSON.stringify(dataAccount));
  var token = dataAccount.token;
  try {
    let res = await axios({
      url: url,
      method: "get",
      headers: { Authorization: "Bearer " + JSON.parse(token) },
    });
    if (res.status === 200) {
      data = res;
    }
    return data;
  } catch (err) {}
};

export const CommonAxiosPost = async (url, values) => {
  try {
    let data = "";
    var token = JSON.parse(localStorage.getItem("token"));
    let res = await axios({
      url: url,
      method: "post",
      data: values,
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status === 200) {
      data = res;
    }
    return data;
  } catch (err) {}
};
