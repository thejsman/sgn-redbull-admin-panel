import Api from "./Api";
import axios from "axios";
export {
  createUser,
  getUserList,
  getUserDetailById,
  updateUserDetailById,
  changePassword
};


const headersApplicationJson = {
  Authorization: "Bearer " + localStorage.getItem("accessToken")
};
function createUser(params) {
  return axios.post(Api.USER_MANGEMENT, params, {
    headers: headersApplicationJson,
  });
}

function getUserList(params) {
  return axios.get(Api.USER_MANGEMENT, {
    headers: headersApplicationJson
  });
}

function getUserDetailById(id) {
  return axios.get(`${Api.USER_MANGEMENT}/${id}`, {
    headers: headersApplicationJson
  });
}

function updateUserDetailById(id, params) {
  return axios.put(`${Api.USER_MANGEMENT}/${id}`, params, {
    headers: headersApplicationJson
  });
}

function changePassword(params) {
  return axios.post(`${Api.USER_MANGEMENT}/change-password`, params, {
    headers: headersApplicationJson
  });
}

