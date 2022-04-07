/**
 * @About 
 * This file is entry point of config
 */

import _ from 'lodash';
import { devSetting, stagSetting, prodSetting, localhostSetting } from './Setting';

//defaut setting
let defaultSetting = {
    api: {
        url: process.env.REACT_APP_DEV_API_URL,
        AUTH: process.env.REACT_APP_BASIC_AUTH,
        mode:'cors'
    },

    stripe_key:process.env.REACT_APP_DEV_STRIPE_KEY
}
console.log('env',process.env);
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
export default siteSetting;