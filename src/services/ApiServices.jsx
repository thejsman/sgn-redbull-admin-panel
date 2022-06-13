/**
 * @about this file contains api
 */

import Api, { awsAxios } from "./Api";

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
  deleteOccasion
};


const headersApplicationJson = {
};


function handleLogin(params) {
  return awsAxios.post(Api.USER_LOGIN, params);
}



function createTemplate(params) {
  return awsAxios.post(Api.CREATE_TOPIC, params, {
    headers: headersApplicationJson,
  });
}

function getTemplateByName(params) {
  return awsAxios.get(`${Api.GET_TOPIC_BY_ID}?notificationName=${params.notificationName}`, {
    headers: headersApplicationJson,
  });
}

function updateTemplate(params) {
  return awsAxios.put(Api.UPDATE_TOPIC, params, {
    headers: headersApplicationJson,
  });
}

function deleteTemplate(params) {
  return awsAxios.delete(`${Api.DELETE_TOPIC}?notificationName=${params.notificationName}`, {
    headers: headersApplicationJson,
  });
}

function templateList(params) {

  return awsAxios.get(
    `${Api.GET_DOMAIN_LIST}?limit=${params.limit}&LastEvaluatedKey=${params.LastEvaluatedKey}`, {
    headers: headersApplicationJson,
  });
}

function occasionList(params) {
  return awsAxios.get(
    `${Api.GET_OCCASION_LIST}?limit=100`, params, {
    headers: headersApplicationJson,
  });
}


function deleteOccasion(params) {
  return awsAxios.delete(`${Api.DELETE_OCCASION}/${params.occasionName}`, {
    headers: headersApplicationJson,
  });
}

function createOccasion(params) {

  console.log('Api.CREATE_OCCASION', Api.CREATE_OCCASION)
  let url = Api.CREATE_OCCASION;
  return awsAxios.patch(
    Api.CREATE_OCCASION, params, {
    headers: headersApplicationJson
  })
}

function getOccasionByName(params) {

  return awsAxios.get(
    `${Api.GET_OCCASION_BY_NAME}/${params.occasionName}`, {
    headers: headersApplicationJson,
  });
}
