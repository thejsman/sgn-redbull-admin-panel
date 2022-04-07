/**
 * @about this file contains api
 */

import axios from "axios";
import Api from "./Api";

export {
  

createTemplate,
getTemplateByName,
updateTemplate,
deleteTemplate, templateList,
handleLogin
};

const headersApplicationJson = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
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
    console.log("params",params.topicId);
    return axios.post(Api.GET_TOPIC_BY_ID,params, {
      headers: headersApplicationJson,
    });
  }

  function updateTemplate(params) {
    return axios.put(Api.UPDATE_TOPIC, params, {
      headers: headersApplicationJson,
    });
  }

  function deleteTemplate(params) {
    return axios.delete(`${Api.DELETE_TOPIC}/${params.topicId}`, {
      headers: headersApplicationJson,
    });
  }

  function templateList(params) {
    return axios.post(
      Api.GET_DOMAIN_LIST,params, {
        headers: headersApplicationJson,
      });
  }