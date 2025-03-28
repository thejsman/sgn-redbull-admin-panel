import Api from "./Api";
import axios from "axios";
export {
  createOccasionTemplate,
  getOccasionTemplateByName,
  updateOccasionTemplate,
  deleteOccasionTemplate,
  OccasionTemplateList,
  OccasionTemplateListByOccasionName
};



const headersApplicationJson = {
};
function createOccasionTemplate(params) {
  return axios.post(Api.CREATE_OCCASION_TEMPLATE, params, {
    headers: headersApplicationJson,
  });
}

function getOccasionTemplateByName(params) {
  console.log("params", params);
  return axios.get(`${Api.GET_OCCASION_TEMPLATE_BY_NAME}/${params.occasionName}/${params.templateName}`, {
    headers: headersApplicationJson,
  });
}

function updateOccasionTemplate(params) {
  return axios.post(Api.CREATE_OCCASION_TEMPLATE, params, {
    headers: headersApplicationJson,
  });
}

function deleteOccasionTemplate(params) {
  return axios.delete(`${Api.DELETE_OCCASION_TEMPLATE}/${params.occasionName}/${params.templateName}`, {
    headers: headersApplicationJson,
  });
}

function OccasionTemplateList(params) {
  return axios.get(
    Api.GET_OCCASION_TEMPLATE_LIST + '?limit=' + params.limit, {
    headers: headersApplicationJson,
  });
}

function OccasionTemplateListByOccasionName(params) {
  return axios.get(
    Api.GET_OCCASION_TEMPLATE_LIST_BY_NAME + params.occasionName, {
    headers: headersApplicationJson,
  });
}


