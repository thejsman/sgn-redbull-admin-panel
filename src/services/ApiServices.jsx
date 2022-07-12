/**
 * @about this file contains api
 */

import Api from "./Api";
import axios from "axios";

export {


  createTemplate,
  getTemplateByName,
  updateTemplate,
  deleteTemplate,
  templateList,
  handleLogin,
  occasionList,
  createOccasion,
  getOccasionByName,
  deleteOccasion,
  redisCacheClear,
  sendInvitation,
  orderListByDate
};


const headersApplicationJson = {
};


function handleLogin(params) {
  return axios.post(Api.AUTH, params);
}



function createTemplate(params) {
  return axios.post(Api.CREATE_TOPIC, params, {
    headers: headersApplicationJson,
  });
}

function getTemplateByName(params) {
  return axios.get(`${Api.GET_TOPIC_BY_ID}?notificationName=${params.notificationName}`, {
    headers: headersApplicationJson,
  });
}

function updateTemplate(params) {
  return axios.put(Api.UPDATE_TOPIC, params, {
    headers: headersApplicationJson,
  });
}

function deleteTemplate(params) {
  return axios.delete(`${Api.DELETE_TOPIC}?notificationName=${params.notificationName}`, {
    headers: headersApplicationJson,
  });
}

function templateList(params) {
  return axios.get(
    `${Api.GET_DOMAIN_LIST}?limit=${params.limit}&LastEvaluatedKey=${params.LastEvaluatedKey}`, {
    headers: headersApplicationJson,
  });
}

function occasionList(params) {
  return axios.get(
    `${Api.GET_OCCASION_LIST}?limit=100`, params, {
    headers: headersApplicationJson,
  });
}


function deleteOccasion(params) {
  return axios.delete(`${Api.DELETE_OCCASION}/${params.occasionName}`, {
    headers: headersApplicationJson,
  });
}

function createOccasion(params) {
  return axios.patch(
    Api.CREATE_OCCASION, params, {
    headers: headersApplicationJson
  })
}

function getOccasionByName(params) {
  return axios.get(
    `${Api.GET_OCCASION_BY_NAME}/${params.occasionName}`, {
    headers: headersApplicationJson,
  });
}


function redisCacheClear(params) {
  return axios.get(
    `${Api.REDIS_CLEAR_CACHE}${params}`, {
    headers: headersApplicationJson,
  });
}

function sendInvitation(params) {
  return axios.post(
    Api.SEND_INVITATION, params, {
    headers: headersApplicationJson
  })
}


function orderListByDate(params) {
  return axios.get(
    `${Api.GET_ORDERS}?transactionDate=${params.date}&createdAt`, params, {
    headers: headersApplicationJson,
  });
}


