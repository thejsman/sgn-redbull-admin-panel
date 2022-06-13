import Api, { awsAxios } from "./Api";

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
  return awsAxios.post(Api.CREATE_OCCASION_TEMPLATE, params, {
    headers: headersApplicationJson,
  });
}

function getOccasionTemplateByName(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_OCCASION_TEMPLATE_BY_NAME}/${params.occasionName}/${params.templateName}`, {
    headers: headersApplicationJson,
  });
}

function updateOccasionTemplate(params) {
  return awsAxios.post(Api.CREATE_OCCASION_TEMPLATE, params, {
    headers: headersApplicationJson,
  });
}

function deleteOccasionTemplate(params) {
  return awsAxios.delete(`${Api.DELETE_OCCASION_TEMPLATE}/${params.occasionName}/${params.templateName}`, {
    headers: headersApplicationJson,
  });
}

function OccasionTemplateList(params) {
  return awsAxios.get(
    Api.GET_OCCASION_TEMPLATE_LIST + '?limit=' + params.limit, {
    headers: headersApplicationJson,
  });
}

function OccasionTemplateListByOccasionName(params) {
  return awsAxios.get(
    Api.GET_OCCASION_TEMPLATE_LIST_BY_NAME + params.occasionName, {
    headers: headersApplicationJson,
  });
}


