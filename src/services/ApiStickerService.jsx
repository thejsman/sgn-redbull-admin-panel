
import Api from "./Api";
import axios from "axios";
export {
  createSticker,
  getStickerByName,
  updateSticker,
  deleteSticker,
  StickerList,
};


const headersApplicationJson = {
};
function createSticker(params) {

  return axios.post(Api.CREATE_STICKER, params, {
    headers: headersApplicationJson,
  });
}

function getStickerByName(params) {
  return axios.get(`${Api.GET_STICKER_BY_ID}?stickerName=${params.stickerName}`, {
    headers: headersApplicationJson,
  });
}

function updateSticker(params) {

  return axios.put(Api.UPDATE_STICKER, params, {
    headers: headersApplicationJson,
  });
}

function deleteSticker(params) {

  return axios.delete(`${Api.DELETE_STICKER}?stickerName=${params.stickerName}`, {
    headers: headersApplicationJson,
  });
}

function StickerList(params) {
  return axios.get(
    Api.GET_STICKER_LIST + '?limit=200&displayOrder=', {
    headers: headersApplicationJson,
  });
}




