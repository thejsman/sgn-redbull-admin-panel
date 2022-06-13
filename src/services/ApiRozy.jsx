import Api, { awsAxios } from "./Api";

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
  return awsAxios.post(Api.CREATE_ROZY, params, {
    headers: headersApplicationJson,
  });
}

function getRozyByName(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_ROZY_BY_NAME}?relationshipName=${params.relationshipName}`, {
    headers: headersApplicationJson,
  });
}

function updateRozy(params) {
  return awsAxios.patch(Api.UPDATE_ROZY, params, {
    headers: headersApplicationJson,
  });
}

function deleteRozy(params) {
  return awsAxios.delete(`${Api.DELETE_ROZY}`, {
    headers: headersApplicationJson,
    data: params
  });
}

function rozyList(params) {
  return awsAxios.get(
    Api.GET_ROZY_LIST, {
    headers: headersApplicationJson,
  });
}

