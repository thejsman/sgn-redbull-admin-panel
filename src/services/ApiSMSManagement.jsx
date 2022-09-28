import Api from "./Api";
import axios from "axios";
export {
  sendSmsManagement
};


const headersApplicationJson = {
};
function sendSmsManagement(params) {
  return axios.post(Api.SMS_MANAGEMENT, params, {
    headers: headersApplicationJson,
  });
}

