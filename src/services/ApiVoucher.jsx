import Api, { awsAxios } from "./Api";

export {
  createVoucher,
  couponList,
  updateVoucher,
  VoucherList,
  couponDetailByCouponId
};


const headersApplicationJson = {
};
function createVoucher(params) {
  return awsAxios.post(Api.CREATE_VOUCHERS, params, {
    headers: headersApplicationJson,
  });
}

function couponList(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_COUPONLIST_BY_PRODUCTNAME}?productName=${params.productName}&pk=${params.pk}&couponVoucherId=${params.couponVoucherId}&limit=${params.limit}`, {
    headers: headersApplicationJson,
  });
}

function updateVoucher(params) {
  return awsAxios.patch(Api.UPDATE_VOUCHERS, params, {
    headers: headersApplicationJson,
  });
}


function VoucherList(params) {
  return awsAxios.get(
    Api.GET_VOUCHERS_LIST + '?limit=' + params.limit + '&pk=null', {
    headers: headersApplicationJson,
  });
}

function couponDetailByCouponId(params) {
  console.log("params", params);
  return awsAxios.get(`${Api.GET_COUPONDETAIL_BY_COUPONID}?couponVoucherId=${params.couponVoucherId}`, {
    headers: headersApplicationJson,
  });
}

