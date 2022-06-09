/**
 * @about
 * This file conatins api end points
 */

import siteSetting from "../config/env/Index";

export default {
  ///Authorization
  //AUTH: siteSetting.api.AUTH,



  // Topic Section
  DELETE_TOPIC: siteSetting.api.BaseUrl + "/templateAdmin/notification-delete",
  CREATE_TOPIC: siteSetting.api.BaseUrl + "/templateAdmin/notification-saveTemplate",
  UPDATE_TOPIC: siteSetting.api.BaseUrl + "/templateAdmin/notification-update",
  GET_TOPIC_BY_ID: siteSetting.api.BaseUrl + "/templateAdmin/notification-single",
  GET_DOMAIN_LIST: siteSetting.api.BaseUrl + "/templateAdmin/notification-list",

  // Occasion Section
  GET_OCCASION_LIST: siteSetting.api.Occasion_url + "/occasion",
  CREATE_OCCASION: siteSetting.api.Occasion_url + "/occasion",
  GET_OCCASION_BY_NAME: siteSetting.api.Occasion_url + "/occasion",
  DELETE_OCCASION: siteSetting.api.Occasion_url + "/occasion",

  // Occasion Template Section 
  GET_OCCASION_TEMPLATE_LIST: siteSetting.api.Occasion_url + "/templates",
  CREATE_OCCASION_TEMPLATE: siteSetting.api.Occasion_url + "/template",
  GET_OCCASION_TEMPLATE_BY_NAME: siteSetting.api.Occasion_url + "/template",
  DELETE_OCCASION_TEMPLATE: siteSetting.api.Occasion_url + "/template",
  GET_OCCASION_TEMPLATE_LIST_BY_NAME: siteSetting.api.Occasion_url + "/templates/",


  //Family Relationship
  DELETE_FAMILY_RELATIONSHIP: siteSetting.api.BaseUrl + "/familyAdmin/releationship/delete",
  CREATE_FAMILY_RELATIONSHIP: siteSetting.api.BaseUrl + "/familyAdmin/releationship/create",
  UPDATE_FAMILY_RELATIONSHIP: siteSetting.api.BaseUrl + "/familyAdmin/releationship/update",
  GET_FAMILY_RELATIONSHIP_BY_ID: siteSetting.api.BaseUrl + "/familyAdmin/releationship/getOne",
  GET_FAMILY_RELATIONSHI_LIST: siteSetting.api.BaseUrl + "/familyAdmin/releationship/query?relationshipIdentifier=relationship",


  // Rozy Section
  GET_ROZY_LIST: siteSetting.api.BaseUrl + "/rozy/listrozy",
  CREATE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",
  UPDATE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",
  GET_ROZY_BY_NAME: siteSetting.api.BaseUrl + "/rozy/rozy",
  DELETE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",


  // vouchers Section
  GET_VOUCHERS_LIST: siteSetting.api.BaseUrl + "/admin/voucher/list",
  CREATE_VOUCHERS: siteSetting.api.BaseUrl + "/admin/voucher/create",
  UPDATE_VOUCHERS: siteSetting.api.BaseUrl + "/admin/voucher/update",
  GET_COUPONLIST_BY_PRODUCTNAME: siteSetting.api.BaseUrl + "/admin/voucher/get",
  GET_COUPONDETAIL_BY_COUPONID: siteSetting.api.BaseUrl + "/admin/voucher/getById",

  // Card Occasion Section
  GET_CARD_OCCASION_LIST: siteSetting.api.Occasion_url + "/cards/systemOccasionCard",
  CREATE_CARD_OCCASION: siteSetting.api.Occasion_url + "/create-card",
  UPDATE_CARD_OCCASION: siteSetting.api.Occasion_url + "/create-card",
  GET_CARD_OCCASION_BY_OCCASIONNAME: siteSetting.api.Occasion_url + "/card/",
  DELETE_CARD_OCCASION: siteSetting.api.Occasion_url + "/delete-card",

  // Task Occasion Section
  GET_CARD_TASK_LIST: siteSetting.api.Occasion_url + "/cards/taskCard",
  CREATE_CARD_TASK: siteSetting.api.Occasion_url + "/create-card",
  UPDATE_CARD_TASK: siteSetting.api.Occasion_url + "/create-card",
  GET_CARD_TASK_BY_TASKNAME: siteSetting.api.Occasion_url + "/card/",
  DELETE_CARD_TASK: siteSetting.api.Occasion_url + "/delete-card",
};
