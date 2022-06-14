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
    BaseUrl: process.env.REACT_APP_API_BASE_URL,
    mode: 'cors',
    WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL,
    Occasion_url: process.env.REACT_APP_API_BASE_URL + "/admin-occasion",
  },
};

//local
export const localhostSetting = {
  api: {
    BaseUrl: process.env.REACT_APP_API_BASE_URL,
    mode: 'cors',
    WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL,
    Occasion_url: process.env.REACT_APP_API_BASE_URL + "/admin-occasion",
  },
};
