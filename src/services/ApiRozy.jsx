import axios from "axios";
import Api from "./Api";

export {
    createRozy,
    getRozyByName,
    updateRozy,
    deleteRozy, 
    rozyList,
};
    
const headersApplicationJson = {
};
function createRozy(params) {
    return axios.post(Api.CREATE_ROZY, params, {
      headers: headersApplicationJson,
    });
  }

  function getRozyByName(params) {
    console.log("params",params);
    return axios.get(`${Api.GET_ROZY_BY_NAME}?relationshipName=${params.relationshipName}`, {
      headers: headersApplicationJson,
    });
  }

  function updateRozy(params) {
    return axios.patch(Api.UPDATE_ROZY, params, {
      headers: headersApplicationJson,
    });
  }

  function deleteRozy(params) {
    return axios.delete(`${Api.DELETE_ROZY}`, {
      headers: headersApplicationJson,
      data: params
    });
  }

  function rozyList(params) {
    return axios.get(
       Api.GET_ROZY_LIST, {
        headers: headersApplicationJson,
      });
  }

