import Api from "./Api";

import axios from "axios";
async function sendGraphQLRequest(query,type='India') {
  let token = type === 'India'? process.env.REACT_APP_VERIFY_TOKEN_INDIA : (type === 'Nepal' ?  process.env.REACT_APP_VERIFY_TOKEN_NEPAL :  process.env.REACT_APP_VERIFY_TOKEN_WEB )
  return axios({
    url: Api.GET_PRODUCT_DETAIL_BY_ITEM_ID+token,
    method: "POST",
    data: {
      query: query
    }
  }).then(response => response.data.data);
}

export default sendGraphQLRequest;
