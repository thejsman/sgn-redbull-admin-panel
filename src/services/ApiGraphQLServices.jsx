import Api from "./Api";

import axios from "axios";
async function sendGraphQLRequest(query) {
  return axios({
    url: Api.GET_PRODUCT_DETAIL_BY_ITEM_ID,
    method: "POST",
    data: {
      query: query
    }
  }).then(response => response.data.data);
}

export default sendGraphQLRequest;
