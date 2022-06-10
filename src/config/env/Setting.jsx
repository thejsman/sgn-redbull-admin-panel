/**
 * @About
 * This file mange environment of the project
 */

//dev
export const devSetting = {
  api: {
    BaseUrl: process.env.REACT_APP_API_BASE_URL,
    mode: 'cors',
    WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL,
    Occasion_url: process.env.REACT_APP_API_BASE_URL + "/admin-occasion",
  },
  stripe_key: "",
};

//stag
export const stagSetting = {
  api: {
    BaseUrl: process.env.REACT_APP_API_BASE_URL,
    mode: 'cors',
    WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL,
    Occasion_url: process.env.REACT_APP_API_BASE_URL + "/admin-occasion",
  },
};

//prod
export const prodSetting = {
  api: {
    url: "https://api.gosorted.com/Sagoon/api/v1/",
    AUTH: "Basic c29ydGVkX0F1dGg6TXpDWTd5S0ZubHl4dTdHdg==",
    mode: "cors",
    REACT_APP_IMAGE_BASE_PATH: "https://dzem81w7r6ap7.cloudfront.net/",
    s3_url: "https://cdn.gosorted.com/",
    url_Prod: "https://nlpapi.gosorted.com/Sagoon/api/v1/",
  },
};

//local
export const localhostSetting = {
  api: {
    url: process.env.REACT_APP_LOCAL_API_URL,
    mode: "cors",
  },
};
