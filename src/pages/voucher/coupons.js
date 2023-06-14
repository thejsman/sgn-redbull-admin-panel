import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../components/common/Breadcrumb";
import { couponList } from "../../services/ApiVoucher";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import {
  updateVoucher,
  deleteVoucher,
  updateVoucherExpiryDate,
} from "../../services/ApiVoucher";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const Coupons = () => {
  const history = useHistory();
  const { id } = useParams();
  const breadcrumb = [
    { link: "/voucher", linkText: "Voucher Management" },
    { link: "", linkText: "Coupon List" },
  ];
  const [couponVoucherId, setCouponVoucherId] = useState([]);
  const [tillDate, setTillDate] = useState("");
  const [VoucherId, setVoucherId] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [productName, setProductName] = useState("");
  const [voucherStatus, setVoucherStatus] = useState("");
  const [updateTillDate, setUpdateTillDate] = useState(false);
  const [couponArrList, setCouponList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [count, setCount] = useState(21);
  const [loader, setLoader] = useState(false);
  const [pk, setPK] = useState(null);
  const [couponVoucherIdPage, setcouponVoucherIdPage] = useState(null);
  const [pageState, setPageState] = useState([
    { page: 1, pk: null, couponVoucherId: null },
  ]);
  const [isSubmit, setIsSubmit] = useState(false);
  // all handler start
  useEffect(() => {
    setProductName(id);
    getCouponList(id, null, null, page);
  }, []);

  const editPages = (_id) => {
    history.push("/coupon/edit/" + _id);
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter((item) => item.page == pageno);
    if (data.length == 0) {
      setPage(pageno);
      if (couponVoucherIdPage !== null) {
        arr.push({
          page: pageno,
          pk: pk,
          couponVoucherId: couponVoucherIdPage,
        });
        setPageState([...arr]);
        let totCount = count + limit;
        setCount(totCount);
        getCouponList(id, pk, couponVoucherIdPage, pageno);
      } else {
        setCouponList([...[]]);
      }
    } else {
      setPage(pageno);
      // setPK(data[0].pk)
      // setcouponVoucherIdPage(data[0].couponVoucherId)
      getCouponList(id, data[0].pk, data[0].couponVoucherId, data[0].page);
    }
  };

  const handleClose = () => {
    setConfirmModal(false);
    setConfirmMsg("");
  };
  const updateVoucherStatus = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let createObj = {
      productName,
      voucherStatus:
        voucherStatus == "notArchived" ? "Archived" : "notArchived",
    };
    console.log("createObj---", createObj);
    updateVoucher(createObj)
      .then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          setVoucherStatus(data.data.Attributes.voucherStatus);
          history.push("/coupons/" + productName);
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
  };

  const updateVoucherTillDate = (e) => {
    e.preventDefault();
    setUpdateTillDate(true);
    if (tillDate === "") {
      toast.error("Please select expiry date");
      setUpdateTillDate(false);
    } else {
      let vouchers = couponArrList
        .filter((v) => v.ischecked === true)
        .map(({ couponVoucherId, pk }) => ({ couponVoucherId, pk }));
      if (vouchers.length == 0) {
        toast.error("Please select the voucher");
        setUpdateTillDate(false);
        return;
      }
      console.log("vouchers", vouchers);
      let createObj = {
        vouchers,
        validTill: parseInt(moment(tillDate).format("X")),
      };
      console.log("createObj---", createObj);
      updateVoucherExpiryDate(createObj)
        .then((res) => {
          let { status, data } = resHandle(res);
          setUpdateTillDate(false);
          if (status === 200) {
            toast.success(data.message);
            let arr = [{ page: 1, pk: null, couponVoucherId: null }];
            setPageState([...arr]);
            getCouponList(id, null, null, 1);
          } else {
            toast.success(data.message);
          }
        })
        .catch((err) => {
          setUpdateTillDate(false);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        });
    }
  };

  const getCouponList = (id, pkvalue, couponVoucherIdValue, nextPage) => {
    setLoader(true);
    let params = {
      limit: limit,
      LastEvaluatedKey: "null",
      productName: id,
      pk: pkvalue,
      couponVoucherId: couponVoucherIdValue,
    };
    couponList(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          let result = data.data.Items;
          let currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          result = result.map((v) => ({
            ...v,
            ischecked: false,
            days:
              (new Date(moment.unix(v.validTill)).getTime() -
                currentDate.getTime()) /
              (1000 * 3600 * 24),
          }));
          console.log("result11", result);
          setCouponList([...result]);
          if (data.data.Items.length > 0) {
            setVoucherStatus(data.data.Items[0].voucherStatus);
          }
          if (
            data.data.LastEvaluatedKey &&
            Object.keys(data.data.LastEvaluatedKey).length > 0
          ) {
            let arr = pageState;
            if (arr.findIndex((item) => item.page == nextPage + 1) == -1) {
              setPK(data.data.LastEvaluatedKey.pk);
              setcouponVoucherIdPage(
                data.data.LastEvaluatedKey.couponVoucherId
              );
            }
          }
          if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
            setcouponVoucherIdPage(null);
            //let pageCount = count - limit
            //setCount(pageCount);
            // // let pageCount = count - limit
            // // setCount(pageCount);
            // console.log(count, 'cccccccccccccccccc');
          }
        } else {
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
          setLoader(false);
          setCouponList([]);
        }
      })
      .catch((err) => {
        toast.error(
          "Sorry, a technical error occurred! Please try again later"
        );
        setLoader(false);
        setCouponList([]);
      });
  };

  const selectAllCheckbox = (e) => {
    let temp = couponArrList;
    temp.forEach((item) => {
      item["ischecked"] = e.target.checked;
    });
    setCouponList([...temp]);
  };

  const onChangeCheckbox = (e, i) => {
    let temp = couponArrList;
    temp[i]["ischecked"] = e.target.checked;
    setCouponList([...temp]);
  };

  const handleDeleteVoucher = () => {
    let params = {
      couponVoucherId: VoucherId,
    };
    handleClose();
    setLoader(true);
    deleteVoucher(params)
      .then((res) => {
        setLoader(false);
        let { status, data } = resHandle(res);
        if (status === 200) {
          toast.success(data.message);
          let arr = [{ page: 1, pk: null, couponVoucherId: null }];
          setPageState([...arr]);
          getCouponList(id, null, null, 1);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error(
          "Sorry, a technical error occurred! Please try again later"
        );
      });
  };

  // all handler end
  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <Modal show={confirmModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to delete this voucher?
          </p>
          <div className="d-flex justify-content-center pb-4">
            <button
              onClick={handleClose}
              className="btn btn-dark btn-sm pl-5 pr-5"
            >
              No
            </button>
            <button
              onClick={handleDeleteVoucher}
              className="btn btn-danger btn-sm ml-3 pl-5 pr-5"
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="twocol sb page_header">
        <h2>Coupon List</h2>
      </div>
      <div className="twocol sb page_header">
        <div className="headerinner left ">
          <div className="row">
            <div className="col">
              <span>Product Name : </span>{" "}
              <span className="color-primary">
                {couponArrList[0]?.productName}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Item Id : </span>{" "}
              <span className="color-primary">{couponArrList[0]?.itemId}</span>{" "}
              &nbsp; &nbsp; &nbsp;
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Variant Id : </span>{" "}
              <span className="color-primary">
                {couponArrList[0]?.variantId}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Voucher Status : </span>{" "}
              <span className="color-primary">
                {voucherStatus == "notArchived" ? "Unarchived" : "Archived"}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-sm mr-2"
                onClick={updateVoucherStatus}
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
                {isSubmit
                  ? " Processing.."
                  : voucherStatus == "notArchived"
                  ? "Archive"
                  : "Unarchive"}
              </button>
              {/* <button className="btn btn-primary btn-sm mr-2">{voucherStatus == "notArchived" ? "Archived" : "Unarchived"}</button> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Select Expiry Date : </span>
            </div>

            <div className="col">
              <span className="color-primary">
                <input
                  title="tillDate"
                  name="tillDate"
                  type="date"
                  className="form-control"
                  value={tillDate}
                  onChange={(e) => setTillDate(e.target.value)}
                />
              </span>
            </div>
            <div className="col">
              {" "}
              <span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={updateVoucherTillDate}
                  disabled={updateTillDate ? "disabled" : ""}
                >
                  {updateTillDate ? (
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
                  {updateTillDate ? " Processing.." : " Update"}
                </button>
              </span>
            </div>
          </div>
          <div className="row"></div>
        </div>
      </div>

      <div className="table-responsive cm_card p-0">
        {loader ? (
          <Loader />
        ) : (
          <table className="table  table-bordered user-table table-hover align-items-center">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => selectAllCheckbox(e)}
                  />
                </th>
                <th>S.No</th>
                <th>coupon Voucher Id</th>
                <th>coupon</th>

                <th>Value</th>
                <th>Status</th>
                <th>Valid Till</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {couponArrList.length ? (
                couponArrList?.map((item, i) => (
                  <tr key={i} style={{ color: item.days < 5 ? "red" : "" }}>
                    <td>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${i}`}
                        value={item.ischecked}
                        checked={item.ischecked}
                        onChange={(e) => {
                          onChangeCheckbox(e, i);
                        }}
                      />
                    </td>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td> {item.couponVoucherId}</td>
                    <td>{item.coupon}</td>

                    <td>{item.value}</td>
                    <td>{item.status}</td>
                    <td>
                      {moment.unix(item.validTill).format("DD, MMM YYYY")}
                    </td>
                    <td>
                      <div className="action">
                        <span onClick={() => editPages(item.couponVoucherId)}>
                          <i className="fas fa-edit"></i>
                        </span>
                        {item.status === "FREE" && (
                          <span
                            disabled={item.status === "FREE" ? "disabled" : ""}
                            onClick={() => (
                              setConfirmModal(true),
                              setVoucherId(item.couponVoucherId)
                            )}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="nodatafound">
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-center">
        <Pagination
          activePage={page}
          itemsCountPerPage={limit}
          totalItemsCount={count}
          onChange={(e) => handlePageChange(e)}
        />
      </div>

      <ToastContainer />
    </div>
  );
};
export default Coupons;
