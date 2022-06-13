
import Api, { awsAxios } from "./Api";

export {
  createFamilyRelationship,
  getFamilyRelationshipByName,
  updateFamilyRelationship,
  deleteFamilyRelationship,
  familyRelationshipList,
};


const headersApplicationJson = {
};
function createFamilyRelationship(params) {
  return awsAxios.post(Api.CREATE_FAMILY_RELATIONSHIP, params, {
    headers: headersApplicationJson,
  });
}

function getFamilyRelationshipByName(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_FAMILY_RELATIONSHIP_BY_ID}?relationshipName=${params.relationshipName}`, {
    headers: headersApplicationJson,
  });
}

function updateFamilyRelationship(params) {
  return awsAxios.put(Api.UPDATE_FAMILY_RELATIONSHIP, params, {
    headers: headersApplicationJson,
  });
}

function deleteFamilyRelationship(params) {
  return awsAxios.delete(`${Api.DELETE_FAMILY_RELATIONSHIP}?relationshipName=${params.relationshipName}`, {
    headers: headersApplicationJson,
  });
}

function familyRelationshipList(params) {
  console.log("api call", awsAxios.defaults.headers.common);
  return awsAxios.get(
    Api.GET_FAMILY_RELATIONSHI_LIST + '&limit=' + params.limit + '&sOrder=' + params.sOrder + '&eOrder=' + params.eOrder + '&scanOrder=' + params.scanOrder, {
    headers: headersApplicationJson,
  });
}

