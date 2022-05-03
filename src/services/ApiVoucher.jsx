import axios from "axios";
import Api from "./Api";

export {
    createVoucher,
    couponList,
    updateVoucher,
    VoucherList,
    couponDetailByCouponId
};
    
const headersApplicationJson = {
  "Access-Control-Allow-Origin" : "*"
};
function createVoucher(params) {
    return axios.post(Api.CREATE_VOCHERS, params, {
      headers: headersApplicationJson,
    });
  }

  function couponList(params) {
    console.log("params",params);
    return axios.get(`${Api.GET_COUPONLIST_BY_PRODUCTNAME}?productName=${params.productName}`, {
      headers: headersApplicationJson,
    });
  }

  function updateVoucher(params) {
    return axios.patch(Api.UPDATE_VOCHERS, params, {
      headers: headersApplicationJson,
    });
  }


  function VoucherList(params) {
    return axios.get(
       Api.GET_VOCHERS_LIST +'?limit='+params.limit+'&pk=null', {
        headers: headersApplicationJson,
      });
  }

  function couponDetailByCouponId(params) {
    console.log("params",params);
    return axios.get(`${Api.GET_COUPONDETAIL_BY_COUPONID}?couponVoucherId=${params.couponVoucherId}`, {
      headers: headersApplicationJson,
    });
  }

