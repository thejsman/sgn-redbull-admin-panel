import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { orderListByDate, orderListByMobileno } from "../../services/ApiServices";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import moment from 'moment'


const Orders = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Orders" }];
  const [orderList, setOrderList] = useState([]);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(6);
  const [loader, setLoader] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState("PENDING");
  const [mobileNo, setMobileNo] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [orderIdPage, setOrderIdPage] = useState(null);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [pageState, setPageState] = useState([{ page: 1, transactionDate: null, transactionId: null, transactionStatus: null, userId: null }])

  useEffect(() => {
    var utc = new Date().toJSON().slice(0, 10).toString();
    setDate(utc);
    console.log('date', utc)
    getOrderList(null, null, null, null, page)
  }, [])

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter(item => item.page == pageno);
    if (isMobileSearch) {
      if (data.length == 0) {
        setPage(pageno);
        if (transactionId !== null) {
          arr.push({ page: pageno, userId: userId, transactionId: transactionId });
          setPageState([...arr]);
          let totCount = count + limit;
          setCount(totCount)
          getOrderListByMobile(userId, transactionId, pageno);
        } else {
          setOrderList([...[]])
        }
      } else {
        setPage(pageno);
        setUserId(data[0].userId);
        setTransactionId(data[0].transactionId);
        getOrderListByMobile(data[0].userId, data[0].transactionId, pageno);
      }
    } else {
      if (data.length == 0) {
        setPage(pageno);
        if (transactionId !== null) {
          arr.push({ page: pageno, userId: userId, transactionDate: transactionDate, transactionStatus: transactionStatus, transactionId: transactionId });
          setPageState([...arr]);
          let totCount = count + limit;
          setCount(totCount)
          getOrderList(userId, transactionDate, transactionStatus, transactionId, pageno);
        } else {
          setOrderList([...[]])
        }
      } else {
        setPage(pageno);
        setUserId(data[0].userId);
        setTransactionDate(data[0].transactionDate);
        setTransactionStatus(data[0].transactionStatus);
        setTransactionId(data[0].transactionId);
        getOrderList(data[0].userId, data[0].transactionDate, data[0].transactionStatus, data[0].transactionId, pageno);
      }
    }
  }

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
        setDateErr("Invalid date formate ('DD-MM-YYYY')");
        validate = false
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

  const getList = () => {
    if (handleValidate()) {
      setIsMobileSearch(false);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = { page: 1, transactionDate: null, transactionId: null, transactionStatus: null, userId: null };
      let array = [obj]
      setPageState(...[array])


      setTransactionId(null);
      setTransactionDate(null);
      setTransactionStatus(null);
      setUserId(null);
      setPage(1);
      setCount(6);
      getOrderList(null, null, null, null, 1)
    }
  }

  const getOrderListByMobileNo = () => {
    if (handleMobileNoValidate()) {
      setIsMobileSearch(true);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = { page: 1, transactionId: null, userId: null };
      let array = [obj]
      setPageState(...[array])
      setTransactionId(null);
      setUserId(null);
      setPage(1);
      setCount(6);
      getOrderListByMobile(null, null, 1)
    }
  }

  const resetData = () => {
    setStatus("PENDING");
    setMobileNo("");
    setDate(new Date().toJSON().slice(0, 10).toString())
  }

  const getOrderListByMobile = (userId, transactionId, nextPage) => {
    setLoader(true)
    let params = `mobileNo=${mobileNo}`;

    if (userId) {
      params += `&userId=${userId}`
    }
    if (transactionId) {
      params += `&transactionId=${transactionId}`
    }
    params += `&limit=${limit}`

    orderListByMobileno(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false);
        setOrderList([...data.data.Items]);
        if (data.data.LastEvaluatedKey && (Object.keys(data.data.LastEvaluatedKey).length > 0)) {
          let arr = pageState;
          if (arr.findIndex(item => item.page == (nextPage + 1)) == -1) {
            setTransactionId(data.data.LastEvaluatedKey.transactionId);
            setUserId(data.data.LastEvaluatedKey.userId)
          }
        }
        if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
          setTransactionId(null)
        }
      } else {
        setLoader(false)
        setOrderList([])
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    }).catch((err) => {
      toast.error("Sorry, a technical error occurred! Please try again later")
      setLoader(false)
      setOrderList([])
    });

  };




  const getOrderList = (userId, transactionDate, transactionStatus, transactionId, nextPage) => {
    setLoader(true)
    let dt = (date ? date : new Date().toJSON().slice(0, 10).toString());
    let params = `transactionDate=${dt}`;
    if (status) {
      params += `&status=${status}`
    }
    if (userId) {
      params += `&userId=${userId}`
    }
    if (transactionId) {
      params += `&transactionId=${transactionId}`
    }
    params += `&limit=${limit}`

    orderListByDate(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false);
        setOrderList([...data.data.Items]);
        if (data.data.LastEvaluatedKey && (Object.keys(data.data.LastEvaluatedKey).length > 0)) {
          let arr = pageState;
          if (arr.findIndex(item => item.page == (nextPage + 1)) == -1) {
            setTransactionId(data.data.LastEvaluatedKey.transactionId);
            setTransactionDate(data.data.LastEvaluatedKey.transactionDate)
            setTransactionStatus(data.data.LastEvaluatedKey.transactionStatus)
            setUserId(data.data.LastEvaluatedKey.userId)
          }
        }
        if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
          setTransactionId(null)
        }
      } else {
        setLoader(false)
        setOrderList([])
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    }).catch((err) => {
      toast.error("Sorry, a technical error occurred! Please try again later")
      setLoader(false)
      setOrderList([])
    });

  };

  const handleClose = () => {
    setConfirmModal(false);
  };




  return (
    <div className="page_wrapper">
      <Modal size="lg" show={confirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Order No :  {orderList[index]?.orderId} <br />
            User Id: {orderList[index]?.userId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col font-weight-bold" >Occasion Title :</div>
            <div className="col" >{orderList[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold" >Transaction Type</div>
            <div className="col" >{orderList[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Occasion Name :</div>
            <div className="col" >{orderList[index]?.occasionName}</div>
            <div className="col  font-weight-bold" >Transaction Text</div>
            <div className="col" >{orderList[index]?.transactionText}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Amount:</div>
            <div className="col" >{orderList[index]?.amount}</div>
            <div className="col  font-weight-bold" >Transaction Date</div>
            <div className="col" >{orderList[index]?.transactionDate}</div>
          </div>

          <div className="row">
            <div className="col font-weight-bold" >Quantity :</div>
            <div className="col" >{orderList[index]?.quantity}</div>
            <div className="col  font-weight-bold" >Occasion Status</div>
            <div className="col" >{orderList[index]?.occasionStatus == false ? "False" : "True"}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Trans Status :</div>
            <div className="col" >{orderList[index]?.transactionStatus}</div>
            <div className="col  font-weight-bold" >Order Detail Id</div>
            <div className="col" >{orderList[index]?.orderDetailId ? orderList[index]?.orderDetailId : "--N/A--"}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Occasion Title :</div>
            <div className="col" >{orderList[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold" >Transaction Type</div>
            <div className="col" >{orderList[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Item Id :</div>
            <div className="col" >{orderList[index]?.itemId}</div>
            <div className="col  font-weight-bold" >Wallet Bal Used</div>
            <div className="col" >{orderList[index]?.walletBalanceUsed}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Currency Symbol :</div>
            <div className="col" >{orderList[index]?.currencySymbol}</div>
            <div className="col  font-weight-bold" >Amount</div>
            <div className="col" >{orderList[index]?.amount}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Currency Code :</div>
            <div className="col" >{orderList[index]?.currencyCode}</div>
            <div className="col  font-weight-bold" >Payment Method</div>
            <div className="col" >{orderList[index]?.paymentMethod}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold" >Variant Id:</div>
            <div className="col" >{orderList[index]?.variantId}</div>
            <div className="col  font-weight-bold" >Product Name</div>
            <div className="col" >{orderList[index]?.productName ? orderList[index]?.productName : "--N/A--"}</div>
          </div>
          <div className="row">
            <div className="col">
              <hr />
              <p className="text-primary">Gift With</p>
            </div>
          </div>
          <div className="row" key={"gift"}>
            <div className="col-2 font-weight-bold">Image</div>
            <div className="col-7 font-weight-bold" >User Id</div>
            <div className="col-3 font-weight-bold" >Screen Name</div>
          </div>
          {(orderList[index]?.giftWith && orderList[index]?.giftWith.length > 0) ? (
            orderList[index]?.giftWith?.map((item, i) => (

              <div className="row" key={"gift" + i}>
                <div className="col-2" >{item?.profileImage ? <img src={item?.profileImage} style={{ width: '50%' }} /> : ""}</div>
                <div className="col-7" >{item?.userId}</div>
                <div className="col-3" >{item?.screenName}</div>
              </div>
            ))) : (
            <div className="row">
              <div className="col-2" >--N/A--</div>
              <div className="col-7" >--N/A--</div>
              <div className="col-3" >--N/A--</div>

            </div>
          )}
          <div className="row">
            <div className="col">
              <hr />
              <p className="text-primary">Gift Card Details</p>
            </div>
          </div>
          <div className="row" key={"giftcard"}>
            <div className="col-3 font-weight-bold" >Gift Card Code</div>
            <div className="col-6 font-weight-bold" >Voucher Id</div>
            <div className="col-3 font-weight-bold">Valid Till</div>

          </div>
          {(orderList[index]?.giftCardDetails && orderList[index]?.giftCardDetails.length) ? (
            orderList[index]?.giftCardDetails?.map((giftcard, j) => (

              <div className="row" key={"giftcard" + j}>
                <div className="col-3" >{giftcard?.giftCardCode}</div>
                <div className="col-6" >{giftcard?.voucherId}</div>
                <div className="col-3" >{giftcard?.validTill}</div>
              </div>
            ))) : (
            <div className="row">
              <div className="col-3" >--N/A--</div>
              <div className="col-6" >--N/A--</div>
              <div className="col-3" >--N/A--</div>
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
              {orderList[index]?.orderDetails?.source ? <img src={orderList[index]?.orderDetails?.source} style={{ width: '70%' }} /> : ""}
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-2 font-weight-bold" >Name :</div>
                <div className="col-5" >{orderList[index]?.orderDetails?.name}</div>
                <div className="col-3 font-weight-bold">Currency Symbol :</div>
                <div className="col-2" >{orderList[index]?.orderDetails?.currencySymbol}</div>

              </div>
              <div className="row">
                <div className="col-2 font-weight-bold" >Amount :</div>
                <div className="col-5" >{orderList[index]?.orderDetails?.amount}</div>
                <div className="col-3 font-weight-bold">Quantity :</div>
                <div className="col-2" >{orderList[index]?.orderDetails?.quantity}</div>

              </div>
            </div>

          </div>



        </Modal.Body>
      </Modal>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Orders</h2>

      </div>

      <div className="form-group row">
        <div className="col-4">
          <label>Select Date :</label>
          <input
            type='date'
            className="form-control"
            name="date"
            value={date}
            onChange={(e) => (
              setDate(e.target.value), setDateErr("")
            )}
          />
          {dateErr && (
            <div className="inlineerror">{dateErr} </div>
          )}

        </div>
        <div className="col-4">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={status}
            onChange={(e) => (
              setStatus(e.target.value)
            )}
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>

          </select>

        </div>
        <div className="col-4 mt-4 pt-2">
          <button className="btn btn-primary" onClick={getList}>Search</button>
        </div>

      </div>
      <div className="form-group  row mb-4">

        <div className="col-4">
          <label>Mobile :</label>
          <input
            type='number'
            className="form-control"
            name="userId"
            value={mobileNo}
            onChange={(e) => (
              setMobileNo(e.target.value),
              setMobileNoErr("")
            )
            }
          />
          {mobileNoErr && (
            <div className="inlineerror">{mobileNoErr} </div>
          )}

        </div>
        <div className="col-8 mt-4 pt-2">
          <button className="btn btn-primary" onClick={getOrderListByMobileNo}>Search</button>
          <button className="btn btn-secondary ml-2" onClick={resetData}>Reset</button>
        </div>

      </div>
      <div className="table-responsive cm_card p-0">

        {loader ? (
          <Loader />
        ) : (
          <table className="table table-bordered user-table table-hover align-items-center table-fixed tablecollapse"  >
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Occasion Title</th>
                <th>Trans. Type</th>
                <th>Trans. Text</th>
                <th>Amount</th>
                <th>User Id</th>

              </tr>
            </thead>
            <tbody>
              {orderList.length ? (
                orderList?.map((item, i) => (

                  <tr key={i} onClick={() => (
                    setConfirmModal(true),
                    setIndex(i)

                  )}>
                    <td className="text-wrap">
                      <span className="text-primary"> {item.orderId}</span>
                    </td>
                    <td>
                      <span className="">{item.occasionTitle}</span>
                    </td>
                    <td  >
                      <span className="">{item.transactionType}</span>
                    </td>


                    <td>{item.transactionText}</td>
                    <td>{item.amount}</td>
                    <td className="text-wrap"> <span className="">{item.userId}</span></td>


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
            onChange={e => handlePageChange(e)}
          />
        </div>
        // ) : (
        //   ""
        // )
      }

      <ToastContainer />
    </div >
  );
};

export default Orders;
