import Api from "./Api";
import axios from "axios";
export {
  createVoucher,
  couponList,
  updateVoucher,
  VoucherList,
  couponDetailByCouponId,
  deleteVoucher,
  updateVoucherExpiryDate

};


const headersApplicationJson = {
};
function createVoucher(params) {
  return axios.post(Api.CREATE_VOUCHERS, params, {
    headers: headersApplicationJson,
  });
}

function couponList(params) {
  console.log("params", params);
  return axios.get(`${Api.GET_COUPONLIST_BY_PRODUCTNAME}?productName=${params.productName}&pk=${params.pk}&couponVoucherId=${params.couponVoucherId}&limit=${params.limit}`, {
    headers: headersApplicationJson,
  });
}

function updateVoucher(params) {
  return axios.patch(Api.UPDATE_VOUCHERS, params, {
    headers: headersApplicationJson,
  });
}

function updateVoucherExpiryDate(params) {
  return axios.patch(Api.UPDATE_VOUCHERS_EXPIRYDATE, params, {
    headers: headersApplicationJson,
  });
}

function deleteVoucher(params) {
  console.log("params", params);
  return axios.delete(`${Api.DELETE_VOUCHERS}?couponVoucherId=${params.couponVoucherId}`, {
    headers: headersApplicationJson,
  });
}


function VoucherList(params) {
  return axios.get(
    Api.GET_VOUCHERS_LIST + '?country=' + params.country + '&voucherStatus=' + params.voucherStatus + '&limit=' + params.limit + '&pk=null', {
    headers: headersApplicationJson,
  });
}

function couponDetailByCouponId(params) {
  console.log("params", params);
  return axios.get(`${Api.GET_COUPONDETAIL_BY_COUPONID}?couponVoucherId=${params.couponVoucherId}`, {
    headers: headersApplicationJson,
  });
}

