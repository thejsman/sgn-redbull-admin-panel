/**
 * @about this file contains api
 */

import axios from "axios";
import Api from "./Api";

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

// axios.defaults.headers.common["Authorization"] = `${Api.AUTH}`;


function handleLogin(params) {
  return axios.post(Api.USER_LOGIN, params);
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
    delete axios.defaults.headers.common["AccessToken"]
    delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
     return axios.get(
        `${Api.GET_OCCASION_LIST}?limit=100`,params, {
          headers: headersApplicationJson,
        });
  }

  
  function deleteOccasion(params) {
    return axios.delete(`${Api.DELETE_OCCASION}`,params, {
      headers: headersApplicationJson,
    });
  }

  function createOccasion(params) {
   delete axios.defaults.headers.common["AccessToken"]
   delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
   debugger;
   console.log('Api.CREATE_OCCASION',Api.CREATE_OCCASION)
   let url =Api.CREATE_OCCASION;
    return axios.patch(
      Api.CREATE_OCCASION,params,{
        headers: headersApplicationJson
      })
  }

  function getOccasionByName(params) {
    delete axios.defaults.headers.common["AccessToken"]
    delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
    return axios.get(
      `${Api.GET_OCCASION_BY_NAME}/${params.occasionName}`, {
        headers: headersApplicationJson,
      });
  }
