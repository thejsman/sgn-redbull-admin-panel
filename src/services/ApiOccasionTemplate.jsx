import axios from "axios";
import Api from "./Api";

export {
    createOccasionTemplate,
    getOccasionTemplateByName,
    updateOccasionTemplate,
    deleteOccasionTemplate, 
    OccasionTemplateList,
};
    
const headersApplicationJson = {
};
function createOccasionTemplate(params) {
    return axios.post(Api.CREATE_OCCASION_TEMPLATE, params, {
      headers: headersApplicationJson,
    });
  }

  function getOccasionTemplateByName(params) {
    console.log("params",params);
    return axios.get(`${Api.GET_OCCASION_TEMPLATE_BY_NAME}?relationshipName=${params.relationshipName}`, {
      headers: headersApplicationJson,
    });
  }

  function updateOccasionTemplate(params) {
    return axios.put(Api.CREATE_OCCASION_TEMPLATE, params, {
      headers: headersApplicationJson,
    });
  }

  function deleteOccasionTemplate(params) {
    return axios.delete(`${Api.DELETE_OCCASION_TEMPLATE}?relationshipName=${params.relationshipName}`, {
      headers: headersApplicationJson,
    });
  }

  function OccasionTemplateList(params) {
    return axios.get(
       Api.GET_OCCASION_TEMPLATE_LIST +'?limit='+params.limit, {
        headers: headersApplicationJson,
      });
  }

