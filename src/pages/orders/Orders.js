import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { orderListByDate } from "../../services/ApiServices";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";


const Orders = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Orders" }];
  const [orderList, setOrderList] = useState([]);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(10);
  const [loader, setLoader] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    var utc = new Date().toJSON().slice(0, 10).toString();
    setDate(utc);
    console.log('date', utc)
    getOrderList()
  }, [])

  const getOrderList = () => {
    setLoader(true)
    let params = { date: (date ? date : new Date().toJSON().slice(0, 10).toString()) }

    orderListByDate(params).then((res) => {
      let { status, data } = resHandle(res);
      debugger;
      if (status === 200) {
        setLoader(false)
        setOrderList([...data.data.Items])
      } else {
        setLoader(false)
        setOrderList([])
      }
    }).catch((err) => {
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
          {orderList[index]?.giftWith.length ? (
            orderList[index]?.giftWith?.map((item, i) => (

              <div className="row" key={"gift" + i}>
                <div className="col-2" >{item?.profileImage ? <img src={item?.profileImage} style={{ width: '50%' }} /> : ""}</div>
                <div className="col-7" >{item?.userId}</div>
                <div className="col-3" >{item?.screenName}</div>
              </div>
            ))) : (
            <div className="row">
              <div className="col text-center" >--N/A--</div>
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
          {orderList[index]?.giftCardDetails.length ? (
            orderList[index]?.giftCardDetails?.map((giftcard, j) => (

              <div className="row" key={"giftcard" + j}>
                <div className="col-3" >{giftcard?.giftCardCode}</div>
                <div className="col-6" >{giftcard?.voucherId}</div>
                <div className="col-3" >{giftcard?.validTill}</div>
              </div>
            ))) : (
            <div className="row">
              <div className="col text-center" >--N/A--</div>
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
        <div className="col-2 mt-3"> <label>Select Date :</label></div>
        <div className="col-5">
          <input
            type='date'
            className="form-control"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              console.log(e, 'iiiiiiiiiiii')
            }}
          />

        </div>
        <div className="col-4 p-0">  <button className="btn btn-primary" onClick={getOrderList}>Search</button></div>
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

      {/* {
        templateList.length ? (
          <div className="text-center">
            <Pagination
              activePage={page}
              itemsCountPerPage={limit}
              totalItemsCount={count}
              onChange={(e) => handlePageChange(e)}
            />
          </div>
        ) : (
          ""
        )
      } */}

      <ToastContainer />
    </div >
  );
};

export default Orders;
