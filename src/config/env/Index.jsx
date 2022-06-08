
import _ from 'lodash';
import { devSetting, stagSetting, prodSetting, localhostSetting } from './Setting';

let defaultSetting = {
    api: {
        BaseUrl: process.env.REACT_APP_API_BASE_URL,
        mode: 'cors',
        WebSocketUrl: process.env.REACT_APP_WEB_SOCKET_URL,
    }

}
let siteSetting = defaultSetting;

switch (process.env.REACT_APP_ENV) {
    case "prod":
    case "production":
        siteSetting = _.extend(defaultSetting, prodSetting);
        break;
    case "stag":
    case "staging":
        siteSetting = _.extend(defaultSetting, stagSetting);
        break;
    case "local":
    case "localhost":
        siteSetting = _.extend(defaultSetting, localhostSetting);
        break;
    default:
        siteSetting = _.extend(defaultSetting, devSetting);
}
console.log('env', process.env);

export default siteSetting;