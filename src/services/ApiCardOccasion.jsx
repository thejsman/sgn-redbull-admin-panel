import axios from "axios";
import Api from "./Api";

export {
    createCardOccasion,
    getCardOccasionByName,
    updateCardOccasion,
    deleteCardOccasion, 
    cardOccasionList,
};
    
const headersApplicationJson = {
};
function createCardOccasion(params) {
    return axios.post(Api.CREATE_CARD_OCCASION, params, {
      headers: headersApplicationJson,
    });
  }

  function getCardOccasionByName(params) {
    console.log("params",params);
    return axios.get(`${Api.GET_CARD_OCCASION_BY_OCCASIONNAME}?relationshipName=${params.relationshipName}`, {
      headers: headersApplicationJson,
    });
  }

  function updateCardOccasion(params) {
    return axios.put(Api.UPDATE_CARD_OCCASION, params, {
      headers: headersApplicationJson,
    });
  }

  function deleteCardOccasion(params) {
    return axios.delete(`${Api.DELETE_CARD_OCCASION}?relationshipName=${params.relationshipName}`, {
      headers: headersApplicationJson,
    });
  }

  function cardOccasionList(params) {
    return axios.get(
       Api.GET_CARD_OCCASION_LIST, {
        headers: headersApplicationJson,
      });
  }

