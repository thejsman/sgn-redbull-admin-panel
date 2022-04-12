/**
 * @about
 * This file conatins api end points
 */

import siteSetting from "../config/env/Index";

export default {
  ///Authorization
  AUTH: siteSetting.api.AUTH,
 
  DELETE_TOPIC: siteSetting.api.url + "notification-delete",
  CREATE_TOPIC: siteSetting.api.url + "notification-saveTemplate",
  UPDATE_TOPIC: siteSetting.api.url + "notification-update",
  GET_TOPIC_BY_ID: siteSetting.api.url + "notification-get",
  GET_DOMAIN_LIST: siteSetting.api.url + "notification-list",
  GET_OCCASION_LIST:siteSetting.api.url+"occasion-list",
  CREATE_OCCASION:siteSetting.api.url+"occasion",
  GET_OCCASION_LIST:siteSetting.api.url,
  GET_OCCASION_BY_NAME:siteSetting.api.url+"getOccasionByName"
 
};
