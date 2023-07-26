import siteSetting from "../../config/env/Index";
// import api from "../config/api";

const pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;

//Response handler
export const resHandle = (res) => {
  // console.log("resresres", res);
  // console.log('||||||||', res.data.responseData.message, '===>>>', res)
  let status = res.status;
  let data;
  let error = res.data.error;
  if (error && error.errorCode === 2) {
    // localStorage.removeItem("accessToken");
    window.location.href = "/login";
    return;
  } else {
    if (status === 200) {
      data = res.data;
    } else {
      data = res.data.error;
    }
    return { status, data };
  }
};
//email validation
export const isValidEmail = (email) => new RegExp(pattern).test(email);

// convert 0,1,2,3,4,5,6 into days

const weeksDays = [
  "",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

//const Days = (data) => data.map((item) => item.day);

export const modifyDashBoardData = (apiResult) => {
  let usersData = [],
    usersLables = [],
    videosData = [],
    videosLables = [],
    viewsData = [],
    viewsLabel = [];
  if (apiResult.duration === 1) {
    apiResult.userChartData.forEach((element) => {
      usersData.push(element.numberOfUsers);
      usersLables.push(weeksDays[element.dayOfWeek]);
    });
    apiResult.videoChartData.forEach((element) => {
      videosData.push(element.numberOfVideos);
      videosLables.push(weeksDays[element.dayOfWeek]);
    });
    apiResult.viewChartData.forEach((element) => {
      viewsData.push(element.numberOfViews);
      viewsLabel.push(weeksDays[element.dayOfWeek]);
    });
  } else if (apiResult.duration === 2) {
    apiResult.userChartData.forEach((element) => {
      usersData.push(element.numberOfUsers);
      usersLables.push(element.day);
    });
    apiResult.videoChartData.forEach((element) => {
      videosData.push(element.numberOfVideos);
      videosLables.push(element.day);
    });
    apiResult.viewChartData.forEach((element) => {
      viewsData.push(element.numberOfViews);
      viewsLabel.push(element.day);
    });
  } else if (apiResult.duration === 3 || apiResult.duration === 4) {
    apiResult.userChartData.forEach((element) => {
      usersData.push(element.numberOfUsers);
      usersLables.push(months[element.month]);
    });
    apiResult.videoChartData.forEach((element) => {
      videosData.push(element.numberOfVideos);
      videosLables.push(months[element.month]);
    });
    apiResult.viewChartData.forEach((element) => {
      viewsData.push(element.numberOfViews);
      viewsLabel.push(months[element.month]);
    });
  }

  let userChart = {
    labels: usersLables,
    datasets: [
      {
        label: "Users Data",
        backgroundColor: "#1f3d62",
        borderColor: "#1f3d62",
        borderWidth: 1,
        hoverBackgroundColor: "#d92828",
        hoverBorderColor: "#d92828",
        data: usersData,
      },
    ],
  };
  let videoChart = {
    labels: videosLables,
    datasets: [
      {
        label: "Video Data",
        backgroundColor: "#1f3d62",
        borderColor: "#1f3d62",
        borderWidth: 1,
        hoverBackgroundColor: "#d92828",
        hoverBorderColor: "#d92828",
        data: videosData,
      },
    ],
  };
  let viewChart = {
    labels: viewsLabel,
    datasets: [
      {
        label: "Views Data",
        backgroundColor: "#1f3d62",
        borderColor: "#1f3d62",
        borderWidth: 1,
        hoverBackgroundColor: "#d92828",
        hoverBorderColor: "#d92828",
        data: viewsData,
      },
    ],
  };
  console.log("userChartuserChartuserChart", userChart);

  return { userChart, videoChart, viewChart };
};

export const GoogleMapApis = (email) => new RegExp(pattern).test(email);

// https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places

export const formatDate = (date) => {
  if (date !== undefined) {
    let year = date.toString().substring(0, 4);
    let dat = date.toString().substring(6, 8);
    let month = date.toString().substring(4, 6);

    let data = dat + "/" + month + "/" + year;
    return data;
  }

  let newDate = new Date();
  return newDate;
};

export const checkUrlType = (url) => {
  let urlRegex =
    /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi;
  if (url) {
    if (url.match(urlRegex)) return url;
    else return siteSetting.api.s3_url + url;
  } else return "https://i.stack.imgur.com/l60Hf.png";
};

export const countryData = [
  { value: "AF", name: "Afghanistan" },
  { value: "AL", name: "Albania" },
  { value: "DZ", name: "Algeria" },
  { value: "AS", name: "American Samoa" },
  { value: "AD", name: "Andorra" },
  { value: "AO", name: "Angola" },
  { value: "AI", name: "Anguilla" },
  { value: "AQ", name: "Antarctica" },
  { value: "AG", name: "Antigua and Barbuda" },
  { value: "AR", name: "Argentina" },
  { value: "AM", name: "Armenia" },
  { value: "AW", name: "Aruba" },
  { value: "AU", name: "Australia" },
  { value: "AT", name: "Austria" },
  { value: "AZ", name: "Azerbaijan" },
  { value: "BS", name: "Bahamas" },
  { value: "BH", name: "Bahrain" },
  { value: "BD", name: "Bangladesh" },
  { value: "BB", name: "Barbados" },
  { value: "BY", name: "Belarus" },
  { value: "BE", name: "Belgium" },
  { value: "BZ", name: "Belize" },
  { value: "BJ", name: "Benin" },
  { value: "BM", name: "Bermuda" },
  { value: "BT", name: "Bhutan" },
  { value: "BO", name: "Bolivia" },
  { value: "BA", name: "Bosnia and Herzegovina" },
  { value: "BW", name: "Botswana" },
  { value: "BV", name: "Bouvet Island" },
  { value: "BR", name: "Brazil" },
  { value: "IO", name: "British Indian Ocean Territory" },
  { value: "BN", name: "Brunei Darussalam" },
  { value: "BG", name: "Bulgaria" },
  { value: "BF", name: "Burkina Faso" },
  { value: "BI", name: "Burundi" },
  { value: "CV", name: "Cabo Verde" },
  { value: "KH", name: "Cambodia" },
  { value: "CM", name: "Cameroon" },
  { value: "CA", name: "Canada" },
  { value: "KY", name: "Cayman Islands" },
  { value: "CF", name: "Central African Republic" },
  { value: "TD", name: "Chad" },
  { value: "CL", name: "Chile" },
  { value: "CN", name: "China" },
  { value: "CX", name: "Christmas Island" },
  { value: "CC", name: "Cocos (Keeling) Islands" },
  { value: "CO", name: "Colombia" },
  { value: "KM", name: "Comoros" },
  { value: "CD", name: "Congo" },
  { value: "CG", name: "Congo" },
  { value: "CK", name: "Cook Islands" },
  { value: "CR", name: "Costa Rica" },
  { value: "HR", name: "Croatia" },
  { value: "CU", name: "Cuba" },
  { value: "CY", name: "Cyprus" },
  { value: "CZ", name: "Czechia" },
  { value: "CI", name: "Côte d'Ivoire" },
  { value: "DK", name: "Denmark" },
  { value: "DJ", name: "Djibouti" },
  { value: "DM", name: "Dominica" },
  { value: "DO", name: "Dominican Republic" },
  { value: "EC", name: "Ecuador" },
  { value: "EG", name: "Egypt" },
  { value: "SV", name: "El Salvador" },
  { value: "GQ", name: "Equatorial Guinea" },
  { value: "ER", name: "Eritrea" },
  { value: "EE", name: "Estonia" },
  { value: "ET", name: "Ethiopia" },
  { value: "FK", name: "Falkland Islands [Malvinas]" },
  { value: "FO", name: "Faroe Islands" },
  { value: "FJ", name: "Fiji" },
  { value: "FI", name: "Finland" },
  { value: "FR", name: "France" },
  { value: "GF", name: "French Guiana" },
  { value: "PF", name: "French Polynesia" },
  { value: "TF", name: "French Southern Territories" },
  { value: "GA", name: "Gabon" },
  { value: "GM", name: "Gambia" },
  { value: "GE", name: "Georgia" },
  { value: "DE", name: "Germany" },
  { value: "GH", name: "Ghana" },
  { value: "GI", name: "Gibraltar" },
  { value: "GR", name: "Greece" },
  { value: "GL", name: "Greenland" },
  { value: "GD", name: "Grenada" },
  { value: "GP", name: "Guadeloupe" },
  { value: "GU", name: "Guam" },
  { value: "GT", name: "Guatemala" },
  { value: "GG", name: "Guernsey" },
  { value: "GN", name: "Guinea" },
  { value: "GW", name: "Guinea-Bissau" },
  { value: "GY", name: "Guyana" },
  { value: "HT", name: "Haiti" },
  { value: "HM", name: "Heard Island and McDonald Islands" },
  { value: "VA", name: "Holy See" },
  { value: "HN", name: "Honduras" },
  { value: "HK", name: "Hong Kong" },
  { value: "HU", name: "Hungary" },
  { value: "IS", name: "Iceland" },
  { value: "IN", name: "India" },
  { value: "ID", name: "Indonesia" },
  { value: "IQ", name: "Iraq" },
  { value: "IE", name: "Ireland" },
  { value: "IM", name: "Isle of Man" },
  { value: "IL", name: "Israel" },
  { value: "IT", name: "Italy" },
  { value: "JM", name: "Jamaica" },
  { value: "JP", name: "Japan" },
  { value: "JE", name: "Jersey" },
  { value: "JO", name: "Jordan" },
  { value: "KZ", name: "Kazakhstan" },
  { value: "KE", name: "Kenya" },
  { value: "KI", name: "Kiribati" },
  { value: "KP", name: "Korea" },
  { value: "KW", name: "Kuwait" },
  { value: "KG", name: "Kyrgyzstan" },
  { value: "LA", name: "Lao People's Democratic Republic" },
  { value: "LV", name: "Latvia" },
  { value: "LB", name: "Lebanon" },
  { value: "LS", name: "Lesotho" },
  { value: "LR", name: "Liberia" },
  { value: "LY", name: "Libya" },
  { value: "LI", name: "Liechtenstein" },
  { value: "LT", name: "Lithuania" },
  { value: "LU", name: "Luxembourg" },
  { value: "MO", name: "Macao" },
  { value: "MG", name: "Madagascar" },
  { value: "MW", name: "Malawi" },
  { value: "MY", name: "Malaysia" },
  { value: "MV", name: "Maldives" },
  { value: "ML", name: "Mali" },
  { value: "MT", name: "Malta" },
  { value: "MH", name: "Marshall Islands" },
  { value: "MQ", name: "Martinique" },
  { value: "MR", name: "Mauritania" },
  { value: "MU", name: "Mauritius" },
  { value: "YT", name: "Mayotte" },
  { value: "MX", name: "Mexico" },
  { value: "FM", name: "Micronesia" },
  { value: "MD", name: "Moldova" },
  { value: "MC", name: "Monaco" },
  { value: "MN", name: "Mongolia" },
  { value: "ME", name: "Montenegro" },
  { value: "MS", name: "Montserrat" },
  { value: "MA", name: "Morocco" },
  { value: "MZ", name: "Mozambique" },
  { value: "MM", name: "Myanmar" },
  { value: "NA", name: "Namibia" },
  { value: "NR", name: "Nauru" },
  { value: "NP", name: "Nepal" },
  { value: "NL", name: "Netherlands" },
  { value: "NC", name: "New Caledonia" },
  { value: "NZ", name: "New Zealand" },
  { value: "NI", name: "Nicaragua" },
  { value: "NE", name: "Niger" },
  { value: "NG", name: "Nigeria" },
  { value: "NU", name: "Niue" },
  { value: "NF", name: "Norfolk Island" },
  { value: "MP", name: "Northern Mariana Islands" },
  { value: "NO", name: "Norway" },
  { value: "OM", name: "Oman" },
  { value: "PK", name: "Pakistan" },
  { value: "PW", name: "Palau" },
  { value: "PS", name: "Palestine" },
  { value: "PA", name: "Panama" },
  { value: "PG", name: "Papua New Guinea" },
  { value: "PY", name: "Paraguay" },
  { value: "PE", name: "Peru" },
  { value: "PH", name: "Philippines" },
  { value: "PN", name: "Pitcairn" },
  { value: "PL", name: "Poland" },
  { value: "PT", name: "Portugal" },
  { value: "PR", name: "Puerto Rico" },
  { value: "QA", name: "Qatar" },
  { value: "MK", name: "Republic of North Macedonia" },
  { value: "RO", name: "Romania" },
  { value: "RU", name: "Russian Federation" },
  { value: "RW", name: "Rwanda" },
  { value: "RE", name: "Réunion" },
  { value: "BL", name: "Saint Barthélemy" },
  { value: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { value: "KN", name: "Saint Kitts and Nevis" },
  { value: "LC", name: "Saint Lucia" },
  { value: "MF", name: "Saint Martin" },
  { value: "PM", name: "Saint Pierre and Miquelon" },
  { value: "VC", name: "Saint Vincent and the Grenadines" },
  { value: "WS", name: "Samoa" },
  { value: "SM", name: "San Marino" },
  { value: "ST", name: "Sao Tome and Principe" },
  { value: "SA", name: "Saudi Arabia" },
  { value: "SN", name: "Senegal" },
  { value: "RS", name: "Serbia" },
  { value: "SC", name: "Seychelles" },
  { value: "SL", name: "Sierra Leone" },
  { value: "SG", name: "Singapore" },
  { value: "SK", name: "Slovakia" },
  { value: "SI", name: "Slovenia" },
  { value: "SB", name: "Solomon Islands" },
  { value: "SO", name: "Somalia" },
  { value: "ZA", name: "South Africa" },
  { value: "GS", name: "South Georgia and the South Sandwich Islands" },
  { value: "SS", name: "South Sudan" },
  { value: "ES", name: "Spain" },
  { value: "LK", name: "Sri Lanka" },
  { value: "SD", name: "Sudan" },
  { value: "SR", name: "Suriname" },
  { value: "SJ", name: "Svalbard and Jan Mayen" },
  { value: "SE", name: "Sweden" },
  { value: "CH", name: "Switzerland" },
  { value: "SY", name: "Syrian Arab Republic" },
  { value: "TW", name: "Taiwan" },
  { value: "TJ", name: "Tajikistan" },
  { value: "TZ", name: "Tanzania" },
  { value: "TH", name: "Thailand" },
  { value: "TL", name: "Timor-Leste" },
  { value: "TG", name: "Togo" },
  { value: "TK", name: "Tokelau" },
  { value: "TO", name: "Tonga" },
  { value: "TT", name: "Trinidad and Tobago" },
  { value: "TN", name: "Tunisia" },
  { value: "TR", name: "Turkey" },
  { value: "TM", name: "Turkmenistan" },
  { value: "TC", name: "Turks and Caicos Islands" },
  { value: "TV", name: "Tuvalu" },
  { value: "UG", name: "Uganda" },
  { value: "UA", name: "Ukraine" },
  { value: "AE", name: "United Arab Emirates" },
  { value: "GB", name: "United Kingdom of Great Britain and Northern Ireland" },
  { value: "US", name: "United States of America" },
  { value: "UY", name: "Uruguay" },
  { value: "UZ", name: "Uzbekistan" },
  { value: "VU", name: "Vanuatu" },
  { value: "VE", name: "Venezuela" },
  { value: "VN", name: "Viet Nam" },
  { value: "VG", name: "Virgin Islands" },
  { value: "WF", name: "Wallis and Futuna" },
  { value: "YE", name: "Yemen" },
  { value: "ZM", name: "Zambia" },
  { value: "ZW", name: "Zimbabwe" },
  { value: "AX", name: "Åland Islands" },
];
