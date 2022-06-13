
import Api, { awsAxios } from "./Api";

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
  return awsAxios.post(Api.CREATE_CARD_OCCASION, params, {
    headers: headersApplicationJson,
  });
}

function getCardOccasionByName(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_CARD_OCCASION_BY_OCCASIONNAME}systemOccasionCard/${params.cardOccasionName}`, {
    headers: headersApplicationJson,
  });
}

function updateCardOccasion(params) {
  return awsAxios.post(Api.UPDATE_CARD_OCCASION, params, {
    headers: headersApplicationJson,
  });
}

function deleteCardOccasion(params) {
  return awsAxios.delete(Api.DELETE_CARD_OCCASION, {
    headers: headersApplicationJson,
    data: params
  });
}

function cardOccasionList(params) {
  return awsAxios.get(
    Api.GET_CARD_OCCASION_LIST, {
    headers: headersApplicationJson,
  });
}

