import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { createVoucher } from "../../services/ApiVoucher";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Loader } from "../../components/common/loader";
import moment from "moment";
import DatePicker from "react-datepicker";
import sendGraphQLRequest from "../../services/ApiGraphQLServices";

const AddVoucher = () => {
  const history = useHistory();
  const { id } = useParams();

  const [itemId, setItemId] = useState("");
  const [itemIdErr, setItemIdErr] = useState("");
  const [variantId, setVariantId] = useState("");
  const [variantIdErr, setVariantIdErr] = useState("");
  const [productName, setProductName] = useState("");
  const [productNameErr, setProductNameErr] = useState("");
  const [validTill, setValidTill] = useState(new Date());
  const [validTillErr, setValidTillErr] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [country, setCountry] = useState("India");
  const [countryErr, setCountryErr] = useState("");
  const [status, setStatus] = useState("free");
  const [statusErr, setStatusErr] = useState("");
  const [value, setValue] = useState("");
  const [valueErr, setValueErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loader, setLoader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [couponType, setCouponType] = useState("1");

  const breadcrumb = [
    { link: "/voucher", linkText: "Voucher Management" },
    { link: "", linkText: "Add Voucher" },
  ];

  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
  var albhaNumericSpaceRegEx = /^[a-zA-Z0-9-_]+$/;
  const handleValidate = () => {
    let validate = true;
    if (!productName.replace(/\s+/g, "")) {
      setProductNameErr("Product Name is required");
      validate = false;
    } else if (!albhaNumericSpaceRegEx.test(productName)) {
      setProductNameErr("Alphanumeric and underscore are allowed");
      validate = false;
    } else {
      setProductNameErr("");
    }

    if (!itemId) {
      setItemIdErr("Item Id is required");
      validate = false;
    } else if (!numberRegEx.test(itemId)) {
      setItemIdErr("only numbers are allowed");
      validate = false;
    } else {
      setItemIdErr("");
    }

    if (!variantId) {
      setVariantIdErr("Variant Id is required");
      validate = false;
    } else if (!numberRegEx.test(variantId)) {
      setVariantIdErr("only numbers are allowed");
      validate = false;
    } else {
      setVariantIdErr("");
    }

    if (!value) {
      setValueErr("Value is required");
      validate = false;
    } else if (!numberRegEx.test(value)) {
      setValueErr("only numbers are allowed");
      validate = false;
    } else {
      setValueErr("");
    }

    if (!validTill) {
      setValidTillErr("Till Date is required");
      validate = false;
    } else {
      setValidTillErr("");
    }
    if (!coupon) {
      setCouponErr("coupon is required");
      validate = false;
    } else {
      setCouponErr("");
    }

    if (couponType === "1") {
      if (parseInt(coupon) > 100) {
        setCouponErr("max 100 coupons are allowed ");
        validate = false;
      } else {
        setCouponErr("");
      }
    }

    return validate;
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let couponList = "";
      if (couponType === "1") {
        let i = 0;
        let couponArr = [];
        for (let i = 0; i < parseInt(coupon); i++) {
          couponArr.push(
            (Math.random() + 1).toString(36).substring(2).toUpperCase()
          );
        }
        couponList = couponArr.toString();
      }

      let createObj = {
        itemId,
        variantId,
        productName: productName,
        validTill: parseInt(moment(validTill).format("X")),
        coupon: couponType === "1" ? couponList : coupon,
        status,
        value: parseInt(value),
        country,
      };
      console.log("createObj---", createObj);
      createVoucher(createObj)
        .then((res) => {
          let { status, data } = resHandle(res);
          setIsSubmit(false);
          if (status === 200) {
            toast.success(data.message);
            history.push("/voucher");
          } else {
            toast.success(data.message);
          }
        })
        .catch((err) => {
          setIsSubmit(false);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        });
    }
  };

  const getProductInfo = async (e) => {
    try {
      if (!itemId.replace(/\s+/g, "")) {
        setItemIdErr("Item Id is required");
      } else if (!numberRegEx.test(itemId)) {
        setItemIdErr("only numbers are allowed");
      } else {
        setItemIdErr("");
        setIsShowLoader(true);
        const ql = ` {
          product(id:${itemId}){
            id
            name
            variants {
              sku
              id
              price
            }
          }
        }
      `;
        const response = await sendGraphQLRequest(ql, country);
        if (response.product) {
          setProductName(response.product.variants[0].sku);
          setVariantId(response.product.variants[0].id);
          setValue(response.product.variants[0].price);
          setProductNameErr("");
          setValueErr("");
          setVariantIdErr("");
        } else {
          toast.error("Product detail not found");
          setProductName("");
          setVariantId("");
          setValue("");
        }
        setIsShowLoader(false);
      }

      // setData(response.data.products);
      // setLoading(false);
    } catch (err) {
      setIsShowLoader(false);
      toast.error("Sorry, a technical error occurred! Please try again later");
    }
  };
  // All function End

  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Add Voucher</h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          <div className="form-group row">
            <div className="col">
              {" "}
              <label>Country</label>
              <select
                className="form-control"
                name="country"
                value={country}
                onChange={(e) => (
                  setCountry(e.target.value), setCountryErr("")
                )}
              >
                <option value="India">India</option>
                <option value="Nepal">Nepal</option>
                <option value="Web">Web</option>
              </select>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-10">
                  <label>Item Id</label>
                  <input
                    type="number"
                    className="form-control"
                    value={itemId}
                    name="itemId"
                    onChange={(e) => (
                      setItemId(e.target.value), setItemIdErr("")
                    )}
                  />

                  {itemIdErr && <div className="inlineerror">{itemIdErr} </div>}
                </div>

                {isShowLoader ? (
                  <div className="col mt-5 text-primary">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div className="col mt-5 ">
                    <span onClick={(e) => getProductInfo(e)}>
                      {" "}
                      <i className="fas fa-search text-primary c-pointer"></i>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                name="productName"
                readOnly
                disabled
                onChange={(e) => (
                  setProductName(e.target.value), setProductNameErr("")
                )}
              />
              {productNameErr ? (
                <div className="inlineerror">{productNameErr} </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <label>Variant Id</label>
              <input
                type="number"
                className="form-control"
                keyboardType="phone-pad"
                value={variantId}
                name="variantId"
                readOnly
                disabled
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
              <DatePicker
                selected={validTill}
                dateFormat="dd/MM/yyyy"
                className="form-control datePicker"
                onChange={(date) => setValidTill(date)}
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
                onChange={(e) => (setStatus(e.target.value), setStatusErr(""))}
              >
                <option value="free">FREE</option>
                <option value="pending">PENDING</option>
                <option value="assigned">ASSIGNED</option>
              </select>
            </div>
            <div className="col">
              <label>Value</label>
              <input
                type="number"
                className="form-control"
                value={value}
                name="value"
                onChange={(e) => (setValue(e.target.value), setValueErr(""))}
              />
              {valueErr && <div className="inlineerror">{valueErr} </div>}
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <div>
                <div className="form-check-inline mt-2">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      value="1"
                      className="form-check-input"
                      name="couponType"
                      checked={couponType == 1}
                      onChange={(e) => setCouponType(e.target.value)}
                    />
                    No. of coupons
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      value="0"
                      className="form-check-input"
                      name="couponType"
                      checked={couponType == 0}
                      onChange={(e) => setCouponType(e.target.value)}
                    />
                    Coupons with comma Separated
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            {couponType === "0" ? (
              <div className="col">
                <label>Enter Coupons</label>
                <input
                  type="text"
                  placeholder="Enter Coupons with Comma Separated. Like (coupon1,coupon2)"
                  className="form-control"
                  keyboardType="phone-pad"
                  value={coupon}
                  name="coupon"
                  onChange={(e) => (
                    setCoupon(e.target.value), setCouponErr("")
                  )}
                />
                {couponErr && <div className="inlineerror">{couponErr} </div>}
              </div>
            ) : (
              <div className="col">
                <label>Enter No. of Coupon</label>
                <input
                  type="number"
                  placeholder="Enter no of Coupon"
                  className="form-control"
                  value={coupon}
                  name="coupon"
                  onChange={(e) => (
                    setCoupon(e.target.value), setCouponErr("")
                  )}
                />
                {couponErr && <div className="inlineerror">{couponErr} </div>}
              </div>
            )}
          </div>

          <div className="button300">
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleCreateVoucher}
              disabled={isSubmit ? "disabled" : ""}
            >
              {isSubmit ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              {isSubmit ? " Submitting.." : "Create"}
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddVoucher;
