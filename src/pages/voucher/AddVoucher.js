import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  createVoucher,
  getVoucherByName,
  updateVoucher
} from "../../services/ApiVoucher";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../components/common/loader';
import moment from "moment";


const AddVoucher = () => {
  const history = useHistory();
  const { id } = useParams();

  const [itemId, setItemId] = useState('');
  const [itemIdErr, setItemIdErr] = useState('');
  const [variantId, setVariantId] = useState('');
  const [variantIdErr, setVariantIdErr] = useState('');
  const [productName, setProductName] = useState('');
  const [productNameErr, setProductNameErr] = useState('');
  const [validTill, setValidTill] = useState('');
  const [validTillErr, setValidTillErr] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponErr, setCouponErr] = useState('');
  const [status, setStatus] = useState('free');
  const [statusErr, setStatusErr] = useState('');
  const [value, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loader, setLoader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)


  const breadcrumb = [
    { link: '/voucher', linkText: 'Voucher Management' },
    { link: '', linkText: 'Add Voucher' }
  ]

  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const handleValidate = () => {
    let validate = true
    if (!productName.replace(/\s+/g, '')) {
      setProductNameErr("Product Name is required")
      validate = false
    } else if (!albhaRegEx.test(productName)) {
      setProductNameErr("only albhabets are allowed")
      validate = false
    } else {
      setProductNameErr("")
    }

    if (!itemId.replace(/\s+/g, '')) {
      setItemIdErr("Item Id is required")
      validate = false
    } else if (!numberRegEx.test(itemId)) {
      setItemIdErr("only numbers are allowed")
      validate = false
    } else {
      setItemIdErr("")
    }

    if (!variantId.replace(/\s+/g, '')) {
      setVariantIdErr("Variant Id is required")
      validate = false
    } else if (!numberRegEx.test(variantId)) {
      setVariantIdErr("only numbers are allowed")
      validate = false
    } else {
      setVariantIdErr("")
    }

    if (!value.replace(/\s+/g, '')) {
      setValueErr("Value is required")
      validate = false
    } else if (!numberRegEx.test(value)) {
      setValueErr("only numbers are allowed")
      validate = false
    } else {
      setValueErr("")
    }

    if (!validTill.replace(/\s+/g, '')) {
      setValidTillErr("Till Date is required")
      validate = false
    } else {
      setValidTillErr("")
    }
    if (!coupon) {
      setCouponErr("coupon is required")
      validate = false
    } else {
      setCouponErr("");
    }

    return validate
  }




  const handleCreateVoucher = e => {
    e.preventDefault()
    if (handleValidate()) {
      setIsSubmit(true);
      let createObj = {
        itemId,
        variantId,
        productName: productName.toLowerCase(),
        validTill: parseInt((moment(validTill).format("X"))),
        coupon,
        status,
        value: parseInt(value)
      }
      console.log("createObj---", createObj);
      createVoucher(createObj).then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/voucher");
        } else {
          toast.success(data.message);
        }
      });

    }
  }


  // All function End



  return (
    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>'Add Voucher</h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className='form-controller chosen'>
          <div className='form-group row'>
            <div className='col'>
              <label>Product Name</label>
              <input
                type='text'

                className='form-control'
                value={productName}
                name='productName'
                onChange={e => (
                  setProductName(e.target.value), setProductNameErr('')
                )}
              />
              {productNameErr ? (
                <div className='inlineerror'>{productNameErr} </div>
              ) : (
                ''
              )}
            </div>
            <div className='col'>
              <label>Item Id</label>
              <input
                type='number'
                className='form-control'
                value={itemId}
                name='itemId'
                onChange={e => (
                  setItemId(e.target.value), setItemIdErr('')
                )}
              />
              {itemIdErr && <div className='inlineerror'>{itemIdErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className="col">
              <label>Variant Id</label>
              <input
                type='number'
                className="form-control"
                keyboardType='phone-pad'
                value={variantId}
                name="variantId"
                onChange={(e) => (
                  setVariantId(e.target.value), setVariantIdErr("")
                )}
              />
              {variantIdErr && (
                <div className="inlineerror">{variantIdErr} </div>
              )}
            </div>
            <div className="col">
              <label>Valid Till Date</label>
              <input
                type='text'
                className="form-control"
                value={validTill}
                name="validTill"
                onChange={(e) => (
                  setValidTill(e.target.value), setValidTillErr("")
                )}
              />
              {validTillErr && (
                <div className="inlineerror">{validTillErr} </div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={(e) => (
                  setStatus(e.target.value), setStatusErr("")
                )}
              >
                <option value="free">Free</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
              </select>

            </div>
            <div className='col'>
              <label>Value</label>
              <input
                type='number'
                className='form-control'
                value={value}
                name='value'
                onChange={e => (
                  setValue(e.target.value), setValueErr('')
                )}
              />
              {valueErr && <div className='inlineerror'>{valueErr} </div>}
            </div>
          </div>
          <div className='form-group row'>

            <div className="col">
              <label>Coupon</label>
              <input
                type='text'
                className="form-control"
                keyboardType='phone-pad'
                value={coupon}
                name="coupon"
                onChange={(e) => (
                  setCoupon(e.target.value), setCouponErr("")
                )}
              />
              {couponErr && (
                <div className="inlineerror">{couponErr} </div>
              )}
            </div>
          </div>

          <div className='button300'>

            <button
              type='button'
              className='btn btn-primary rounded-pill'
              onClick={handleCreateVoucher}
              disabled={isSubmit ? 'disabled' : ''}

            >
              {isSubmit ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
                : ('')
              }
              {isSubmit ? ' Submitting..' : 'Create'}


            </button>

          </div>
        </form>
      )}
      <ToastContainer />
    </div>


  )
}

export default AddVoucher
