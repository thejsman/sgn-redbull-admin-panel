import Api from "./Api";
import axios from "axios";
export {
  createUser,
  getUserList,
  getUserDetailById,
  updateUserDetailById,
  changePassword,
  getAppUserByCondition,
  getRewardsByUserId,
  getTransactionsByUserId,
  getConnectionsByUserId,
  addReward,
};

const headersApplicationJson = {
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
};
function createUser(params) {
  return axios.post(Api.USER_MANGEMENT, params, {
    headers: headersApplicationJson,
  });
}

function getUserList(params) {
  return axios.get(Api.USER_MANGEMENT, {
    headers: headersApplicationJson,
  });
}

function getUserDetailById(id) {
  return axios.get(`${Api.USER_MANGEMENT}/${id}`, {
    headers: headersApplicationJson,
  });
}

function updateUserDetailById(id, params) {
  return axios.put(`${Api.USER_MANGEMENT}/${id}`, params, {
    headers: headersApplicationJson,
  });
}

function changePassword(params) {
  return axios.post(`${Api.USER_MANGEMENT}/change-password`, params, {
    headers: headersApplicationJson,
  });
}

function getAppUserByCondition(params) {
  return axios.get(`${Api.GET_APP_USER}?${params}`, {
    headers: headersApplicationJson,
  });
}

function getRewardsByUserId(params) {
  return axios.get(`${Api.GET_APP_USER_REWARDS}?${params}`, {
    headers: headersApplicationJson,
  });
}
function getConnectionsByUserId(params) {
  return axios.get(`${Api.GET_APP_USER_CONNECTIONS}?${params}`, {
    headers: headersApplicationJson,
  });
}
function getTransactionsByUserId(params) {
  return axios.get(`${Api.GET_APP_USER_TRANSACTIONS}?${params}`, {
    headers: headersApplicationJson,
  });
}

function addReward(params) {
  return axios.post(Api.REWARD_SERVICE, params, {
    headers: headersApplicationJson,
  });
}
