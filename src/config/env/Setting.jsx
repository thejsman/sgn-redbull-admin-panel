/**
 * @About
 * This file mange environment of the project
 */

//dev
export const devSetting = {
  api: {
    BaseUrl: "https://dev.sagoonlite.com/",
    url: "https://prdc113ea0.execute-api.us-east-1.amazonaws.com/dev/",
    AUTH: "Basic c29ydGVkX0F1dGg6TXpDWTd5S0ZubHl4dTdHdg==",
    mode: "cors",
    s3_url: "https://devcdn.gosorted.com/",
    url_Prod: "https://devapi.gosorted.com/Sagoon/api/v1/",
    Sagoonlite_Url: "https://dev.sagoonlite.com/",
    Occasion_url: "https://xe4rysdekl.execute-api.eu-central-1.amazonaws.com/dev/",
    rozy_url: "https://6k0xfuii3e.execute-api.eu-central-1.amazonaws.com/dev/",
    template_url: "https://dev.sagoonlite.com/templateAdmin/",
    voucher_url: "https://dev.sagoonlite.com/adminVoucher/",
    cardOccasion_url: "https://0maydym1ik.execute-api.eu-central-1.amazonaws.com/dev/",
    card_url: "https://bwifznalf9.execute-api.eu-central-1.amazonaws.com/dev/"


  },

  // api: {
  //   url: "https://stagapi.gosorted.com/Sagoon/api/v1/",
  //   AUTH: "Basic c29ydGVkX0F1dGg6TXpDWTd5S0ZubHl4dTdHdg==",
  //   mode: "cors",
  //   REACT_APP_IMAGE_BASE_PATH: "https://dzem81w7r6ap7.cloudfront.net/",
  //   s3_url: "https://stagcdn.gosorted.com/",
  //   url_Prod: "https://stagapi.gosorted.com/Sagoon/api/v1/",
  // },

  stripe_key: "",
};

//stag
export const stagSetting = {
  api: {
    url: "https://stagapi.gosorted.com/Sagoon/api/v1/",
    AUTH: "Basic c29ydGVkX0F1dGg6TXpDWTd5S0ZubHl4dTdHdg==",
    mode: "cors",
    REACT_APP_IMAGE_BASE_PATH: "https://dzem81w7r6ap7.cloudfront.net/",
    s3_url: "https://stagcdn.gosorted.com/",
    url_Prod: "https://stagapi.gosorted.com/Sagoon/api/v1/",
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
