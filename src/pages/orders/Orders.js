import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import {
  orderListByDate,
  orderListByMobileno,
  orderListByOrderId,
  updateOrderStatus,
} from "../../services/ApiServices";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import moment from "moment";
import { Spinner } from "react-bootstrap";

const Orders = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Orders" }];
  const [orderList, setOrderList] = useState([]);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(51);
  const [loader, setLoader] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState("SUCCESS");
  const [mobileNo, setMobileNo] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [orderIdPage, setOrderIdPage] = useState(null);
  const [isSearch, setIsSearch] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [orderIdErr, setOrderIdErr] = useState("");
  const [chk, setChk] = useState(false);
  const [chkErr, setChkErr] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toJSON().slice(0, 10).toString()
  );
  const [deliveryDateErr, setDeliveryDateErr] = useState("");
  const [isProcess, setIsProcess] = useState(false);
  const [dateArr, setDateArr] = useState([]);
  const [processArr, setProcessArr] = useState([]);
  const [pageState, setPageState] = useState([
    {
      page: 1,
      transactionDate: null,
      transactionId: null,
      transactionStatus: null,
      userId: null,
    },
  ]);

  const users = [
    {
      id: 1,
      name: "Caitlyn",
      surname: "Kerluke",
      age: 24,
    },
    {
      id: 2,
      name: "Rowan ",
      surname: "Nikolaus",
      age: 45,
    },
    {
      id: 3,
      name: "Kassandra",
      surname: "Haley",
      age: 32,
    },
    {
      id: 4,
      name: "Rusty",
      surname: "Arne",
      age: 58,
    },
  ];

  useEffect(() => {
    var utc = new Date().toJSON().slice(0, 10).toString();
    setDate(utc);
    console.log("date", utc);
    getOrderList(null, null, null, null, page);
  }, []);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter((item) => item.page == pageno);
    if (isSearch == 2) {
      if (data.length == 0) {
        setPage(pageno);
        if (transactionId !== null) {
          arr.push({
            page: pageno,
            userId: userId,
            transactionId: transactionId,
          });
          setPageState([...arr]);
          let totCount = count + limit;
          setCount(totCount);
          getOrderListByMobile(userId, transactionId, pageno);
        } else {
          setOrderList([...[]]);
        }
      } else {
        setPage(pageno);
        setUserId(data[0].userId);
        setTransactionId(data[0].transactionId);
        getOrderListByMobile(data[0].userId, data[0].transactionId, pageno);
      }
    } else if (isSearch == 1) {
      if (data.length == 0) {
        setPage(pageno);
        if (transactionId !== null) {
          arr.push({
            page: pageno,
            userId: userId,
            transactionDate: transactionDate,
            transactionStatus: transactionStatus,
            transactionId: transactionId,
          });
          setPageState([...arr]);
          let totCount = count + limit;
          setCount(totCount);
          getOrderList(
            userId,
            transactionDate,
            transactionStatus,
            transactionId,
            pageno
          );
        } else {
          setOrderList([...[]]);
        }
      } else {
        setPage(pageno);
        setUserId(data[0].userId);
        setTransactionDate(data[0].transactionDate);
        setTransactionStatus(data[0].transactionStatus);
        setTransactionId(data[0].transactionId);
        getOrderList(
          data[0].userId,
          data[0].transactionDate,
          data[0].transactionStatus,
          data[0].transactionId,
          pageno
        );
      }
    }
  };

  const handleValidate = () => {
    let validate = true;

    if (!date.replace(/\s+/g, "")) {
      setDateErr("Date is required");
      validate = false;
    } else {
      let dt = moment(date);
      let ck = dt.isValid();
      if (ck) {
        setDateErr("");
      } else {
        setDateErr("Invalid date format ('DD-MM-YYYY')");
        validate = false;
      }
    }

    return validate;
  };

  const handleMobileNoValidate = () => {
    let validate = true;
    const mobileNoRegEx = /^[0-9]$/;
    if (!mobileNo.replace(/\s+/g, "")) {
      setMobileNoErr("Mobile no is required");
      validate = false;
    } else {
      setMobileNoErr("");
    }

    return validate;
  };

  const handleOrderIDValidate = () => {
    let validate = true;
    if (!orderId.replace(/\s+/g, "")) {
      setOrderIdErr("Order ID is required");
      validate = false;
    } else {
      setOrderIdErr("");
    }

    return validate;
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToExcel = () => {
    if (handleValidate()) {
      let dt = date ? date : new Date().toJSON().slice(0, 10).toString();
      let params = `transactionDate=${dt}`;
      if (status) {
        params += `&status=${status}`;
      }
      if (userId) {
        params += `&userId=${userId}`;
      }
      if (transactionId) {
        params += `&transactionId=${transactionId}`;
      }
      params += `&limit=1000`;
      setLoader(true);
      orderListByDate(params)
        .then((res) => {
          let { status, data } = resHandle(res);
          if (status === 200) {
            setLoader(false);

            // Headers for each column
            let headers = [
              "Order Id,Item Id,Variant Id,Product Name,Occasion Title,Transaction Type,Transaction Status,Payment Method,Amount,Sender UserId,Transaction Date,Quantity, Receiver Name,Receiver DialCode,Receiver PhoneNo,Receiver userId",
            ];

            let modifyData = data.data.Items.reduce((acc, item) => {
              acc.push(
                [
                  item.orderId,
                  item.itemId,
                  item.variantId,
                  item.itemDetails.name,
                  item.occasionTitle,
                  item.transactionType,
                  item.transactionStatus,
                  item.paymentMethod,
                  item.amount,
                  item.userId,
                  item.transactionDate,
                  item.quantity,
                  item.giftWith[0].screenName,
                  item.giftWith[0].dialCode,
                  item.giftWith[0].phone,
                  item.giftWith[0].userId,
                ].join(",")
              );
              if (item.giftWith.length > 1) {
                delete item.giftWith[0];
                item.giftWith.map((gift) => {
                  acc.push(
                    [
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      gift.screenName,
                      gift.dialCode,
                      gift.phone,
                      gift.userId,
                    ].join(",")
                  );
                });
              }
              return acc;
            }, []);
            // // Convert users data to a csv
            // let usersCsv = users.reduce((acc, user) => {
            //   const { id, name, surname, age } = user;
            //   acc.push([id, name, surname, age].join(","));
            //   return acc;
            // }, []);

            downloadFile({
              data: [...headers, ...modifyData].join("\n"),
              fileName: "order.csv",
              fileType: "text/csv",
            });

            // setCsvData([
            //   [
            //     "Order Id",
            //     "Occasion Title",
            //     "Transaction Type",
            //     "Transaction Status",
            //     "Payment Method",
            //     "Amount",
            //     "Created At",
            //   ],
            //   ...modifyData,
            // ]);
          } else {
            setLoader(false);
            toast.error(
              "Sorry, a technical error occurred! Please try again later"
            );
          }
        })
        .catch((err) => {
          setLoader(false);
          setOrderList([]);
        });
    }
  };
  const getList = () => {
    if (handleValidate()) {
      setIsSearch(1);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = {
        page: 1,
        transactionDate: null,
        transactionId: null,
        transactionStatus: null,
        userId: null,
      };
      let array = [obj];
      setPageState(...[array]);

      setTransactionId(null);
      setTransactionDate(null);
      setTransactionStatus(null);
      setUserId(null);
      setPage(1);
      setCount(6);
      getOrderList(null, null, null, null, 1);
    }
  };

  const getOrderListByMobileNo = () => {
    if (handleMobileNoValidate()) {
      setIsSearch(2);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = { page: 1, transactionId: null, userId: null };
      let array = [obj];
      setPageState(...[array]);
      setTransactionId(null);
      setUserId(null);
      setPage(1);
      setCount(6);
      getOrderListByMobile(null, null, 1);
    }
  };

  const getOrderListByOrderId = () => {
    if (handleOrderIDValidate()) {
      let obj = [
        {
          page: 1,
          transactionDate: null,
          transactionId: null,
          transactionStatus: null,
          userId: null,
        },
      ];
      setPageState([...obj]);
      setIsSearch(3);
      setPage(1);
      setCount(5);
      getOrderListByOrderNo();
    }
  };

  const getOrderListByOrderNo = () => {
    setLoader(true);
    let params = `transactionId=${orderId.trim()}`;

    orderListByOrderId(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          if (Object.keys(data.data).length > 0) {
            let arr = [data.data];
            setOrderList([...arr]);
          } else {
            setOrderList([]);
          }
        } else {
          setLoader(false);
          setOrderList([]);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      })
      .catch((err) => {
        setLoader(false);
        setOrderList([]);
        if (err.response.status !== 400) {
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      });
  };
  const onChangeSetArr = (e, index) => {
    let arrDate = dateArr;
    arrDate[index] = e.target.value;
    setDateArr([...arrDate]);
  };

  const handleCheckboxValidate = () => {
    let validate = true;
    if (chk == false) {
      setChkErr("Select the checkbox");
      validate = false;
    }
    if (!deliveryDate.replace(/\s+/g, "")) {
      setDeliveryDateErr("Date is required");
      validate = false;
    } else {
      let dt = moment(deliveryDate);
      let ck = dt.isValid();
      if (ck) {
        setDeliveryDateErr("");
      } else {
        setDeliveryDateErr("Invalid date format ('DD-MM-YYYY')");
        validate = false;
      }
    }
    return validate;
  };

  const saveDeliveryDate = (e, i, orderId, index, item) => {
    e.preventDefault();
    let p = processArr;
    p[index] = true;
    setProcessArr([...p]);
    //if (handleCheckboxValidate()) {
    setIsProcess(true);
    const d = new Date();
    let text = d.toISOString();
    let params = {
      transactionId: orderId,
      deliveryDate: dateArr[index] + "T" + text.split("T")[1],
      userId: item.userId,
      transactionType: "gifts",
    };
    updateOrderStatus(params)
      .then((res) => {
        p[index] = false;
        setProcessArr([...p]);
        let { status, data } = resHandle(res);
        setIsProcess(false);
        setChk(false);
        setDeliveryDate(new Date().toJSON().slice(0, 10).toString());
        if (status === 200) {
          let orders = orderList;

          orders[i].giftWith[index]["delivered"] = true;
          setOrderList([...orders]);
          toast.success(data.message);
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => {
        p[index] = false;
        setProcessArr([...p]);
        setIsProcess(false);
        toast.error(
          "Sorry, a technical error occurred! Please try again later"
        );
      });
    //}
  };

  const handleUpdateStatus = (e, index) => {
    e.preventDefault();
    if (handleCheckboxValidate()) {
      setIsProcess(true);
      const d = new Date();
      let text = d.toISOString();
      let params = {
        transactionId: orderList[index].orderId,
        deliveryDate: deliveryDate + "T" + text.split("T")[1],
        transactionType: "deals",
      };
      updateOrderStatus(params)
        .then((res) => {
          let { status, data } = resHandle(res);
          setIsProcess(false);
          setChk(false);
          setDeliveryDate(new Date().toJSON().slice(0, 10).toString());
          if (status === 200) {
            let orders = orderList;
            if (!orders[index].deliveryObject) {
              orders[index]["deliveryObject"] = {};
            }
            orders[index].deliveryObject["deliveryStatus"] = "DELIVERED";
            orders[index].deliveryObject["deliveryDate"] = deliveryDate;
            setOrderList([...orders]);
            toast.success(data.message);
          } else {
            toast.success(data.message);
          }
        })
        .catch((err) => {
          setIsProcess(false);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        });
    }
  };

  const resetData = () => {
    setStatus("SUCCESS");
    setMobileNo("");
    setDate(new Date().toJSON().slice(0, 10).toString());
  };

  const getOrderListByMobile = (userId, transactionId, nextPage) => {
    setLoader(true);
    let params = `mobileNo=${mobileNo}`;

    if (userId) {
      params += `&userId=${userId}`;
    }
    if (transactionId) {
      params += `&transactionId=${transactionId}`;
    }
    params += `&limit=${limit}`;

    orderListByMobileno(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          setOrderList([...data.data.Items]);
          if (
            data.data.LastEvaluatedKey &&
            Object.keys(data.data.LastEvaluatedKey).length > 0
          ) {
            let arr = pageState;
            if (arr.findIndex((item) => item.page == nextPage + 1) == -1) {
              setTransactionId(data.data.LastEvaluatedKey.transactionId);
              setUserId(data.data.LastEvaluatedKey.userId);
            }
          }
          if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
            setTransactionId(null);
          }
        } else {
          setLoader(false);
          setOrderList([]);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      })
      .catch((err) => {
        setLoader(false);
        setOrderList([]);
        if (err.response.status !== 400) {
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      });
  };

  const getOrderList = (
    userId,
    transactionDate,
    transactionStatus,
    transactionId,
    nextPage
  ) => {
    setLoader(true);
    let dt = date ? date : new Date().toJSON().slice(0, 10).toString();
    let params = `transactionDate=${dt}`;
    if (status) {
      params += `&status=${status}`;
    }
    if (userId) {
      params += `&userId=${userId}`;
    }
    if (transactionId) {
      params += `&transactionId=${transactionId}`;
    }
    params += `&limit=${limit}`;

    orderListByDate(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          setOrderList([...data.data.Items]);
          if (
            data.data.LastEvaluatedKey &&
            Object.keys(data.data.LastEvaluatedKey).length > 0
          ) {
            let arr = pageState;
            if (arr.findIndex((item) => item.page == nextPage + 1) == -1) {
              setTransactionId(data.data.LastEvaluatedKey.transactionId);
              setTransactionDate(data.data.LastEvaluatedKey.transactionDate);
              setTransactionStatus(
                data.data.LastEvaluatedKey.transactionStatus
              );
              setUserId(data.data.LastEvaluatedKey.userId);
            }
          }
          if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
            setTransactionId(null);
          }
        } else {
          setLoader(false);
          setOrderList([]);
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      })
      .catch((err) => {
        setLoader(false);
        setOrderList([]);
        if (err.response.status !== 400) {
          toast.error(
            "Sorry, a technical error occurred! Please try again later"
          );
        }
      });
  };

  const handleClose = () => {
    setConfirmModal(false);
  };

  return (
    <div className="page_wrapper">
      <Modal size="lg" show={confirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Order No : {orderList[index]?.orderId} <br />
            User Id: {orderList[index]?.userId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col font-weight-bold">Occasion Title :</div>
            <div className="col">{orderList[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold">Transaction Type</div>
            <div className="col">{orderList[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Occasion Name :</div>
            <div className="col">{orderList[index]?.occasionName}</div>
            <div className="col  font-weight-bold">Transaction Text</div>
            <div className="col">{orderList[index]?.transactionText}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Amount:</div>
            <div className="col">{orderList[index]?.amount}</div>
            <div className="col  font-weight-bold">Transaction Date</div>
            <div className="col">{orderList[index]?.transactionDate}</div>
          </div>

          <div className="row">
            <div className="col font-weight-bold">Quantity :</div>
            <div className="col">{orderList[index]?.quantity}</div>
            <div className="col  font-weight-bold">Occasion Status</div>
            <div className="col">
              {orderList[index]?.occasionStatus == false ? "False" : "True"}
            </div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Trans Status :</div>
            <div className="col">{orderList[index]?.transactionStatus}</div>
            <div className="col  font-weight-bold">Order Detail Id</div>
            <div className="col">
              {orderList[index]?.orderDetailId
                ? orderList[index]?.orderDetailId
                : "--N/A--"}
            </div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Occasion Title :</div>
            <div className="col">{orderList[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold">Transaction Type</div>
            <div className="col">{orderList[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Item Id :</div>
            <div className="col">{orderList[index]?.itemId}</div>
            <div className="col  font-weight-bold">Wallet Bal Used</div>
            <div className="col">{orderList[index]?.walletBalanceUsed}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Currency Symbol:</div>
            <div className="col">{orderList[index]?.currencySymbol}</div>
            <div className="col  font-weight-bold">Amount</div>
            <div className="col">{orderList[index]?.amount}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Currency Code :</div>
            <div className="col">{orderList[index]?.currencyCode}</div>
            <div className="col  font-weight-bold">Payment Method</div>
            <div className="col">{orderList[index]?.paymentMethod}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Variant Id:</div>
            <div className="col">{orderList[index]?.variantId}</div>
            <div className="col  font-weight-bold">Product Name</div>
            <div className="col">
              {orderList[index]?.productName
                ? orderList[index]?.productName
                : "--N/A--"}
            </div>
          </div>
          {orderList[index]?.giftWith &&
          orderList[index]?.giftWith.length > 0 ? (
            <>
              <div className="row">
                <div className="col">
                  <hr />
                  <p className="text-primary">Gift With</p>
                </div>
              </div>
              <div className="row" key={"gift"}>
                <div className="col font-weight-bold">Image</div>
                <div className="col font-weight-bold">User Id</div>
                <div className="col font-weight-bold">Screen Name</div>
                <div className="col font-weight-bold">Date</div>
                <div className="col font-weight-bold">Action</div>
              </div>
            </>
          ) : null}

          {orderList[index]?.giftWith && orderList[index]?.giftWith.length > 0
            ? orderList[index]?.giftWith?.map((item, i) => (
                <div className="row" key={"gift" + i}>
                  <div className="col">
                    {item?.profileImage ? (
                      <img src={item?.profileImage} style={{ width: "50%" }} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col">{item?.userId}</div>
                  <div className="col">{item?.screenName}</div>
                  {item?.delivered == true ? (
                    <>
                      <div className="col"></div>
                      <div className="col">
                        <label className="text-primary">Delivered</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col">
                        <input
                          type="date"
                          className="form-control"
                          name={"dateArr" + i}
                          value={
                            dateArr[i]
                              ? dateArr[i]
                              : new Date().toJSON().slice(0, 10).toString()
                          }
                          onChange={(e) => onChangeSetArr(e, i)}
                        />
                        {/* {deliveryDateErr && <div className="inlineerror">{deliveryDateErr} </div>} */}
                      </div>

                      {processArr[i] ? (
                        <div className="col mt-2">
                          {" "}
                          <span>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              style={{ color: "#603be1" }}
                            />
                            <label style={{ color: "#603be1" }}>
                              &nbsp; Processing...
                            </label>
                          </span>
                        </div>
                      ) : (
                        <div className="col mt-2">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={(e) =>
                              saveDeliveryDate(
                                e,
                                index,
                                orderList[index]?.orderId,
                                i,
                                item
                              )
                            }
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            : null}
          <div className="row">
            <div className="col">
              <hr />
              <p className="text-primary">Gift Card Details</p>
            </div>
          </div>
          <div className="row" key={"giftcard"}>
            <div className="col-3 font-weight-bold">Gift Card Code</div>
            <div className="col-6 font-weight-bold">Voucher Id</div>
            <div className="col-3 font-weight-bold">Valid Till</div>
          </div>
          {orderList[index]?.giftCardDetails &&
          orderList[index]?.giftCardDetails.length ? (
            orderList[index]?.giftCardDetails?.map((giftcard, j) => (
              <div className="row" key={"giftcard" + j}>
                <div className="col-3">{giftcard?.giftCardCode}</div>
                <div className="col-6">{giftcard?.voucherId}</div>
                <div className="col-3">{giftcard?.validTill}</div>
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-3">--N/A--</div>
              <div className="col-6">--N/A--</div>
              <div className="col-3">--N/A--</div>
            </div>
          )}
          <div className="row">
            <div className="col">
              <hr />
              <p className="text-primary">Order Details</p>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              {orderList[index]?.orderDetails?.source ? (
                <img
                  src={orderList[index]?.orderDetails?.source}
                  style={{ width: "70%" }}
                />
              ) : (
                ""
              )}
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-2 font-weight-bold">Name :</div>
                <div className="col-5">
                  {orderList[index]?.orderDetails?.name}
                </div>
                <div className="col-3 font-weight-bold">Currency Symbol:</div>
                <div className="col-2">
                  {orderList[index]?.orderDetails?.currencySymbol}
                </div>
              </div>
              <div className="row">
                <div className="col-2 font-weight-bold">Amount :</div>
                <div className="col-5">
                  {orderList[index]?.orderDetails?.amount}
                </div>
                <div className="col-3 font-weight-bold">Quantity :</div>
                <div className="col-2">
                  {orderList[index]?.orderDetails?.quantity}
                </div>
              </div>
            </div>
          </div>
          {orderList[index]?.deliveryObject &&
            Object.keys(orderList[index]?.deliveryObject).length > 0 &&
            orderList[index]?.transactionType !== "gift" && (
              <>
                {" "}
                <div className="row">
                  <div className="col">
                    <hr />
                    <p className="text-primary">Delivery Status</p>
                  </div>
                </div>
                {orderList[index]?.deliveryObject?.deliveryStatus ==
                "DELIVERED" ? (
                  <div className="row">
                    <div className="col-4">
                      <label>Delivery Status : </label>
                      {orderList[index]?.deliveryObject?.deliveryStatus}
                    </div>
                    <div className="col-4">
                      <label>Delivery Date : </label>
                      {moment(
                        orderList[index]?.deliveryObject?.deliveryDate
                      ).format("DD, MMM YYYY")}
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-4 mt-2">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="chk"
                          className="form-check-input"
                          checked={chk}
                          value={chk}
                          onChange={(e) => {
                            setChk(e.target.checked);
                          }}
                        />
                        <label htmlFor="chk" className="form-check-label">
                          {" "}
                          Marked product Delivered
                        </label>

                        {chkErr && <div className="inlineerror">{chkErr} </div>}
                      </div>
                    </div>
                    <div className="col-4">
                      <input
                        type="date"
                        className="form-control"
                        name="deliveryDate"
                        value={deliveryDate}
                        onChange={(e) => (
                          setDeliveryDate(e.target.value),
                          setDeliveryDateErr("")
                        )}
                      />
                      {deliveryDateErr && (
                        <div className="inlineerror">{deliveryDateErr} </div>
                      )}
                    </div>
                    <div className={isProcess ? "col-4 mt-2" : "col-4"}>
                      {isProcess ? (
                        <>
                          <span>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              style={{ color: "#603be1" }}
                            />
                            <label style={{ color: "#603be1" }}>
                              &nbsp; Processing...
                            </label>
                          </span>
                        </>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={(e) => handleUpdateStatus(e, index)}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
        </Modal.Body>
      </Modal>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Orders</h2>
      </div>
      <div id="main">
        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a
                  href="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#faq1"
                  aria-expanded="true"
                  aria-controls="faq1"
                >
                  Search By Date & Status
                </a>
              </div>

              <div
                id="faq1"
                className="collapse show"
                aria-labelledby="faqhead1"
                data-parent="#faq"
              >
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Select Date :</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={date}
                        onChange={(e) => (
                          setDate(e.target.value), setDateErr("")
                        )}
                      />
                      {dateErr && <div className="inlineerror">{dateErr} </div>}
                    </div>
                    <div className="col-4">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="PENDING">PENDING</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    </div>
                    <div className="col-4 mt-4 pt-1">
                      <button className="btn btn-primary" onClick={getList}>
                        Search
                      </button>
                      <button
                        className="btn btn-primary m-2"
                        onClick={exportToExcel}
                      >
                        <i className="fas fa-cloud-download-alt"></i>
                      </button>

                      {/* <i
                        className="fas fa-file-pdf btn btn-primary m-2 cursor-pointer"
                        onClick={exportToExcel}
                      ></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="faqhead2">
                <a
                  href="#"
                  className="btn btn-header-link collapsed"
                  data-toggle="collapse"
                  data-target="#faq2"
                  aria-expanded="true"
                  aria-controls="faq2"
                >
                  Search By Mobile No
                </a>
              </div>

              <div
                id="faq2"
                className="collapse"
                aria-labelledby="faqhead2"
                data-parent="#faq"
              >
                <div className="card-body">
                  <div className="form-group  row mb-4">
                    <div className="col-6">
                      <label>Mobile :</label>
                      <input
                        type="number"
                        className="form-control"
                        name="userId"
                        placeholder="Enter Mobile No with Country Code like : 919999999999"
                        value={mobileNo}
                        onChange={(e) => (
                          setMobileNo(e.target.value), setMobileNoErr("")
                        )}
                      />
                      {mobileNoErr && (
                        <div className="inlineerror">{mobileNoErr} </div>
                      )}
                    </div>
                    <div className="col-6 mt-4 pt-3">
                      <button
                        className="btn btn-primary"
                        onClick={getOrderListByMobileNo}
                      >
                        Search
                      </button>
                      {/* <button className="btn btn-secondary ml-2" onClick={resetData}>Reset</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="faqhead3">
                <a
                  href="#"
                  className="btn btn-header-link collapsed"
                  data-toggle="collapse"
                  data-target="#faq3"
                  aria-expanded="true"
                  aria-controls="faq3"
                >
                  Search By Order ID
                </a>
              </div>

              <div
                id="faq3"
                className="collapse"
                aria-labelledby="faqhead3"
                data-parent="#faq"
              >
                <div className="card-body">
                  <div className="form-group  row mb-4">
                    <div className="col-4">
                      <label>Order Id :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="orderId"
                        value={orderId}
                        onChange={(e) => (
                          setOrderId(e.target.value), setOrderIdErr("")
                        )}
                      />
                      {orderIdErr && (
                        <div className="inlineerror">{orderIdErr} </div>
                      )}
                    </div>
                    <div className="col-8 mt-4 pt-3">
                      <button
                        className="btn btn-primary"
                        onClick={getOrderListByOrderId}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive cm_card p-0 mt-5">
        {loader ? (
          <Loader />
        ) : (
          <table className="table table-bordered user-table table-hover align-items-center table-fixed tablecollapse">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Occasion Title</th>
                <th>Trans. Type</th>
                <th>Trans. Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length ? (
                orderList?.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() => (setConfirmModal(true), setIndex(i))}
                  >
                    <td className="text-wrap">
                      <span className="text-primary"> {item.orderId}</span>
                    </td>
                    <td>
                      <span className="">{item.occasionTitle}</span>
                    </td>
                    <td>
                      <span className="">{item.transactionType}</span>
                    </td>

                    <td>{item.transactionText}</td>
                    <td>{item.amount}</td>
                    <td className="text-wrap">
                      {" "}
                      <span className="">
                        {" "}
                        {moment(item.createdAt).format("DD, MMM YYYY")}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
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

      {
        // orderList.length ? (
        <div className="text-center">
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={count}
            onChange={(e) => handlePageChange(e)}
          />
        </div>
        // ) : (
        //   ""
        // )
      }

      <ToastContainer />
    </div>
  );
};

export default Orders;
