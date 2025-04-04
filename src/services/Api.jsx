/**
 * @about
 * This file conatins api end points
 */
// import axios from "axios";
import siteSetting from "../config/env/Index";

const apiUrl = {
  ///Authorization
  AUTH: process.env.REACT_APP_API_AUTH_BASE_URL + "auth",

  // Topic Section
  DELETE_TOPIC: siteSetting.api.BaseUrl + "/templateAdmin/notification-delete",
  CREATE_TOPIC:
    siteSetting.api.BaseUrl + "/templateAdmin/notification-saveTemplate",
  UPDATE_TOPIC: siteSetting.api.BaseUrl + "/templateAdmin/notification-update",
  GET_TOPIC_BY_ID:
    siteSetting.api.BaseUrl + "/templateAdmin/notification-single",
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
  GET_OCCASION_TEMPLATE_LIST_BY_NAME:
    siteSetting.api.Occasion_url + "/templates/",

  //Family Relationship
  DELETE_FAMILY_RELATIONSHIP:
    siteSetting.api.BaseUrl + "/familyAdmin/releationship/delete",
  CREATE_FAMILY_RELATIONSHIP:
    siteSetting.api.BaseUrl + "/familyAdmin/releationship/create",
  UPDATE_FAMILY_RELATIONSHIP:
    siteSetting.api.BaseUrl + "/familyAdmin/releationship/update",
  GET_FAMILY_RELATIONSHIP_BY_ID:
    siteSetting.api.BaseUrl + "/familyAdmin/releationship/getOne",
  GET_FAMILY_RELATIONSHI_LIST:
    siteSetting.api.BaseUrl +
    "/familyAdmin/releationship/query?relationshipIdentifier=relationship",

  // Rozy Section
  GET_ROZY_LIST: siteSetting.api.BaseUrl + "/rozy/listrozy",
  CREATE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",
  UPDATE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",
  GET_ROZY_BY_NAME: siteSetting.api.BaseUrl + "/rozy/rozy",
  DELETE_ROZY: siteSetting.api.BaseUrl + "/rozy/rozy",

  // vouchers Section
  GET_VOUCHERS_LIST: siteSetting.api.BaseUrl + "/adminVoucher/list",
  CREATE_VOUCHERS: siteSetting.api.BaseUrl + "/adminVoucher/create",
  UPDATE_VOUCHERS: siteSetting.api.BaseUrl + "/adminVoucher/update",
  UPDATE_VOUCHERS_EXPIRYDATE: siteSetting.api.BaseUrl + "/adminVoucher/update/tillDate",
  DELETE_VOUCHERS: siteSetting.api.BaseUrl + "/adminVoucher/delete",
  GET_COUPONLIST_BY_PRODUCTNAME: siteSetting.api.BaseUrl + "/adminVoucher/get",
  GET_COUPONDETAIL_BY_COUPONID:
    siteSetting.api.BaseUrl + "/adminVoucher/getById",
  GET_PRODUCT_DETAIL_BY_ITEM_ID:process.env.REACT_APP_API_GRAPHQL_URL+"shop-api?vendure-token=",

  // Card Occasion Section
  GET_CARD_OCCASION_LIST:
    siteSetting.api.Occasion_url + "/cards/systemOccasionCard",
  CREATE_CARD_OCCASION: siteSetting.api.Occasion_url + "/create-card",
  UPDATE_CARD_OCCASION: siteSetting.api.Occasion_url + "/create-card",
  GET_CARD_OCCASION_BY_OCCASIONNAME: siteSetting.api.Occasion_url + "/card/",
  DELETE_CARD_OCCASION: siteSetting.api.Occasion_url + "/delete-card",

  // Task Occasion Section
  GET_CARD_TASK_LIST: siteSetting.api.Occasion_url + "/cards/",
  CREATE_CARD_TASK: siteSetting.api.Occasion_url + "/create-card",
  UPDATE_CARD_TASK: siteSetting.api.Occasion_url + "/create-card",
  GET_CARD_TASK_BY_TASKNAME: siteSetting.api.Occasion_url + "/card/",
  DELETE_CARD_TASK: siteSetting.api.Occasion_url + "/delete-card",

  //Redis Section
  REDIS_CLEAR_CACHE: siteSetting.api.redis_url,

  //Invitation Section
  SEND_INVITATION:
    siteSetting.api.BaseUrl + "/invitationAdmin/invitation/create",

  //Orders Section
  GET_ORDERS: siteSetting.api.BaseUrl + "/shopAdmin/transaction/",
  UPDATE_ORDER_STATUS:
    siteSetting.api.BaseUrl + "/shopAdmin/transaction/updateDelivery",

  //user Analytics
  USER_ANALYTICS: siteSetting.api.BaseUrl + "/statistics/",

  //User Management
  USER_MANGEMENT: process.env.REACT_APP_API_AUTH_BASE_URL + "users",

  //Waitlisted Users
  WAITLISTED_USERS:
    siteSetting.api.BaseUrl + "/invitationAdmin/fetchWaitListedUsers",

  //Export Waitlisted Users
  EXPORT_WAITLISTED_USERS:
    siteSetting.api.BaseUrl + "/invitationAdmin/requestUserDataToExport?",

  //Connection Stats
  CONNECTION_STATS:
    siteSetting.api.BaseUrl + "/connectionAdmin/connectionStats",

  //App User Section
  GET_APP_USER: siteSetting.api.BaseUrl + "/appUser/user",
  GET_APP_USER_REWARDS: siteSetting.api.BaseUrl + "/appUser/rewards",
  GET_APP_USER_CONNECTIONS: siteSetting.api.BaseUrl + "/appUser/connections",
  GET_APP_USER_TRANSACTIONS: siteSetting.api.BaseUrl + "/appUser/transactions",

  //Sticker Section
  DELETE_STICKER: siteSetting.api.BaseUrl + "/sticker/delete",
  CREATE_STICKER: siteSetting.api.BaseUrl + "/sticker/create",
  UPDATE_STICKER: siteSetting.api.BaseUrl + "/sticker/update",
  GET_STICKER_BY_ID: siteSetting.api.BaseUrl + "/sticker/getOne",
  GET_STICKER_LIST: siteSetting.api.BaseUrl + "/sticker/list",

  //Export Report
  EXPORT_REPORT: siteSetting.api.BaseUrl + "/statistics/requestReport",

  //Sms Management
  SMS_MANAGEMENT: siteSetting.api.BaseUrl + "/adminMessage/send",

  //Reward Service
  REWARD_SERVICE: siteSetting.api.BaseUrl + "/adminRewards/reward",

  //Dashboard Stats
  CELEBRATION_STATS: "https://07cl2u25fa.execute-api.ap-southeast-1.amazonaws.com/staging/celebration",
  TRANSACTION_STATS: "https://07cl2u25fa.execute-api.ap-southeast-1.amazonaws.com/staging/transactions",

  
};
export default apiUrl;