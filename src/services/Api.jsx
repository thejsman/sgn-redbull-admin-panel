/**
 * @about
 * This file conatins api end points
 */

import siteSetting from "../config/env/Index";

export default {
  ///Authorization
  AUTH: siteSetting.api.AUTH,
 

  // Tpoic Section
  DELETE_TOPIC: siteSetting.api.template_url + "notification-delete",
  CREATE_TOPIC: siteSetting.api.template_url + "notification-saveTemplate",
  UPDATE_TOPIC: siteSetting.api.template_url + "notification-update",
  GET_TOPIC_BY_ID: siteSetting.api.template_url + "notification-single",
  GET_DOMAIN_LIST: siteSetting.api.template_url + "notification-list",
  
  // Occasion Section
  GET_OCCASION_LIST:      siteSetting.api.Sagoonlite_Url +"occasion/occasion",
  CREATE_OCCASION:        siteSetting.api.Occasion_url+"occasion",
  GET_OCCASION_BY_NAME:   siteSetting.api.Occasion_url+"occasion",
  DELETE_OCCASION:        siteSetting.api.Occasion_url+"occasion",

  // Occasion Template Section
  GET_OCCASION_TEMPLATE_LIST:      siteSetting.api.Occasion_url +"templates",
  CREATE_OCCASION_TEMPLATE:        siteSetting.api.Occasion_url+"template",
  GET_OCCASION_TEMPLATE_BY_NAME:   siteSetting.api.Occasion_url+"template",
  DELETE_OCCASION_TEMPLATE:        siteSetting.api.Occasion_url+"template",


  //Family Relationship
  DELETE_FAMILY_RELATIONSHIP: siteSetting.api.Sagoonlite_Url + "familyAdmin/releationship/delete",
  CREATE_FAMILY_RELATIONSHIP: siteSetting.api.Sagoonlite_Url + "familyAdmin/releationship/create",
  UPDATE_FAMILY_RELATIONSHIP: siteSetting.api.Sagoonlite_Url + "familyAdmin/releationship/update",
  GET_FAMILY_RELATIONSHIP_BY_ID: siteSetting.api.Sagoonlite_Url + "familyAdmin/releationship/getOne",
  GET_FAMILY_RELATIONSHI_LIST: siteSetting.api.Sagoonlite_Url + "familyAdmin/releationship/query?relationshipIdentifier=relationship",
  

  // Rozy Section
  GET_ROZY_LIST:      siteSetting.api.Sagoonlite_Url +"rozy/listrozy",
  CREATE_ROZY:        siteSetting.api.Sagoonlite_Url+"rozy/rozy",
  UPDATE_ROZY:          siteSetting.api.Sagoonlite_Url+"rozy/rozy",
  GET_ROZY_BY_NAME:   siteSetting.api.Sagoonlite_Url+"rozy/rozy",
  DELETE_ROZY:        siteSetting.api.Sagoonlite_Url+"rozy/rozy",


  // vouchers Section
  GET_VOUCHERS_LIST:      siteSetting.api.voucher_url +"list",
  CREATE_VOUCHERS:        siteSetting.api.voucher_url+"create",
  UPDATE_VOUCHERS:          siteSetting.api.voucher_url+"update",
  GET_COUPONLIST_BY_PRODUCTNAME:   siteSetting.api.voucher_url+"/get",
  GET_COUPONDETAIL_BY_COUPONID:   siteSetting.api.voucher_url+"/getById",

    // Card Occasion Section
    GET_CARD_OCCASION_LIST:      siteSetting.api.cardOccasion_url +"cards/cardIdentifier",
    CREATE_CARD_OCCASION:        siteSetting.api.cardOccasion_url+"create-card",
    UPDATE_CARD_OCCASION:          siteSetting.api.cardOccasion_url+"create-card",
    GET_CARD_OCCASION_BY_OCCASIONNAME:   siteSetting.api.cardOccasion_url+"card/",
    DELETE_CARD_OCCASION:        siteSetting.api.cardOccasion_url+"delete-card",
 
};
