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
handleLogin,
occasionList,
createOccasion,getOccasionByName
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
    debugger;
    return axios.post(
      Api.GET_DOMAIN_LIST,params, {
        headers: headersApplicationJson,
      });
  }

  function occasionList(params) {
    delete axios.defaults.headers.common["AccessToken"]
    delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
    // return axios.get(
    //   `${Api.GET_OCCASION_LIST}getOccasions?limit=100&startKey=mahavirjayanti`,params, {
    //     headers: headersApplicationJson,
    //   });
      return axios.get(
        `${Api.GET_OCCASION_LIST}?limit=100`,params, {
          headers: headersApplicationJson,
        });
  }

  function createOccasion(params) {
   delete axios.defaults.headers.common["AccessToken"]
   delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
    return axios.patch(
      Api.CREATE_OCCASION,params,{
        headers: headersApplicationJson
      })
  }

  function getOccasionByName(params) {
    delete axios.defaults.headers.common["AccessToken"]
    delete axios.defaults.headers.common["Access-Control-Allow-Origin"]
    return axios.get(
      `${Api.GET_OCCASION_BY_NAME}?occasionName=${params.occasionName}`, {
        headers: headersApplicationJson,
      });
  }
