/**
 * @about
 * This file conatins api end points
 */

import siteSetting from "../config/env/Index";

export default {
  ///Authorization
  AUTH: siteSetting.api.AUTH,
 

  // Tpoic Section
  DELETE_TOPIC: siteSetting.api.url + "notification-delete",
  CREATE_TOPIC: siteSetting.api.url + "notification-saveTemplate",
  UPDATE_TOPIC: siteSetting.api.url + "notification-update",
  GET_TOPIC_BY_ID: siteSetting.api.url + "notification-get",
  GET_DOMAIN_LIST: siteSetting.api.url + "notification-list",
  
  // Occasion Section
  GET_OCCASION_LIST:      siteSetting.api.Sagoonlite_Url +"occasion/occasion",
  CREATE_OCCASION:        siteSetting.api.Occasion_url+"occasion",
  GET_OCCASION_BY_NAME:   siteSetting.api.Occasion_url+"occasion",
  DELETE_OCCASION:        siteSetting.api.Occasion_url+"occasion",


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
 
};
