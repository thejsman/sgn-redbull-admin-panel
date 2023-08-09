import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Breadcrumb from "../../components/common/Breadcrumb";
import {
  getAppUserByCondition,
  getRewardsByUserId,
  getTransactionsByUserId,
  getConnectionsByUserId,
  addReward,
} from "../../services/ApiUsers";
import { resHandle } from "../../components/util/utils";
import { ToastContainer } from "react-toastify";
import { Loader } from "../../components/common/loader";
import moment from "moment";

const AppUsers = () => {
  const breadcrumb = [{ link: "", linkText: "App User Management" }];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [userId, setUserId] = useState("");
  const [userIdErr, setUserIdErr] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userObject, setUserObject] = useState({});
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [loader, setLoader] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [connections, setConnections] = useState([]);
  const [rewardAmount, setRewardAmount] = useState("");
  const [rewardAmountErr, setRewardAmountErr] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [rewardDescriptionErr, setRewardDescriptionErr] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [index, setIndex] = useState(-1);

  // all handler start
  const handleClose = () => {
    setConfirmModal(false);
  };

  const handleValidate = () => {
    let validate = true;
    if (!userId.replace(/\s+/g, "")) {
      setUserIdErr("User Id is required");
      validate = false;
    } else {
      setUserIdErr("");
    }
    return validate;
  };

  const handleMobileValidate = () => {
    let validate = true;

    if (!mobileNo.replace(/\s+/g, "")) {
      setMobileNoErr("Mobile no is required");
      validate = false;
    } else {
      setMobileNoErr("");
    }

    return validate;
  };

  const userDetail = (params) => {
    let cond = "";
    if (params === "id" && handleValidate()) {
      cond = "userId=" + userId;
      callApi(cond);
    } else if (params === "mobile" && handleMobileValidate()) {
      cond = "phone=" + mobileNo;
      callApi(cond);
    }
  };

  const callApi = (cond) => {
    setLoader(1);
    setIsSearch(true);
    getAppUserByCondition(cond)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(0);
          setUserObject(data.data);
        }
      })
      .catch((err) => {
        setLoader(0);
        setUserObject({});
      });
  };

  const getRewards = (id) => {
    setLoader(2);
    getRewardsByUserId("userId=" + id)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(0);
          setRewards(data.data.Items);
        }
      })
      .catch((err) => {
        setLoader(0);
        setRewards([]);
      });
  };
  const getTransactions = (id) => {
    setLoader(3);
    getTransactionsByUserId("userId=" + id + "&transactionId=null")
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(0);
          setTransactions(data.data.Items);
        }
      })
      .catch((err) => {
        setLoader(0);
        setTransactions([]);
      });
  };
  const getConnections = (id) => {
    setLoader(4);
    getConnectionsByUserId("userId=" + id)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(0);
          setConnections(data.data.Items);
        }
      })
      .catch((err) => {
        setLoader(0);
        setConnections([]);
      });
  };
  const handleAddRewards = () => {
    if (rewardAmount.trim() === "" || rewardAmount < 0) {
      setRewardAmountErr("Amount is required");
      return;
    }
    if (rewardDescription.trim() === "") {
      setRewardDescriptionErr("Reward description is required");
      return;
    }
    const params = {
      userId: userObject?.userId,
      amount: rewardAmount,
      description: rewardDescription,
      transactionType: "credit",
    };
    addReward(params)
      .then((res) => {
        getRewards(userObject.userId);
        userObject.totalRewards =
          userObject.totalRewards + parseInt(rewardAmount);
        userObject.totalRewardEarned =
          userObject.totalRewardEarned + parseInt(rewardAmount);
        setRewardAmount("");
        setRewardDescription("");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const sendRewardSms = (e) => {
    e.preventDefault();

    alert("Feature coming soon");
  };

  // all handler end
  return (
    <div className="page_wrapper">
      <Modal size="lg" show={confirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Order No : {transactions[index]?.orderId} <br />
            User Id: {transactions[index]?.userId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col font-weight-bold">Occasion Title :</div>
            <div className="col">{transactions[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold">Transaction Type</div>
            <div className="col">{transactions[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Occasion Name :</div>
            <div className="col">{transactions[index]?.occasionName}</div>
            <div className="col  font-weight-bold">Transaction Text</div>
            <div className="col">{transactions[index]?.transactionText}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Amount:</div>
            <div className="col">{transactions[index]?.amount}</div>
            <div className="col  font-weight-bold">Transaction Date</div>
            <div className="col">{transactions[index]?.transactionDate}</div>
          </div>

          <div className="row">
            <div className="col font-weight-bold">Quantity :</div>
            <div className="col">{transactions[index]?.quantity}</div>
            <div className="col  font-weight-bold">Occasion Status</div>
            <div className="col">
              {transactions[index]?.occasionStatus === false ? "False" : "True"}
            </div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Trans Status :</div>
            <div className="col">{transactions[index]?.transactionStatus}</div>
            <div className="col  font-weight-bold">Order Detail Id</div>
            <div className="col">
              {transactions[index]?.orderDetailId
                ? transactions[index]?.orderDetailId
                : "--N/A--"}
            </div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Occasion Title :</div>
            <div className="col">{transactions[index]?.occasionTitle}</div>
            <div className="col  font-weight-bold">Transaction Type</div>
            <div className="col">{transactions[index]?.transactionType}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Item Id :</div>
            <div className="col">{transactions[index]?.itemId}</div>
            <div className="col  font-weight-bold">Wallet Bal Used</div>
            <div className="col">{transactions[index]?.walletBalanceUsed}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Currency Symbol:</div>
            <div className="col">{transactions[index]?.currencySymbol}</div>
            <div className="col  font-weight-bold">Amount</div>
            <div className="col">{transactions[index]?.amount}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Currency Code :</div>
            <div className="col">{transactions[index]?.currencyCode}</div>
            <div className="col  font-weight-bold">Payment Method</div>
            <div className="col">{transactions[index]?.paymentMethod}</div>
          </div>
          <div className="row">
            <div className="col font-weight-bold">Variant Id:</div>
            <div className="col">{transactions[index]?.variantId}</div>
            <div className="col  font-weight-bold">Product Name</div>
            <div className="col">
              {transactions[index]?.productName
                ? transactions[index]?.productName
                : "--N/A--"}
            </div>
          </div>
          {transactions[index]?.giftWith &&
          transactions[index]?.giftWith.length > 0 ? (
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
              </div>
            </>
          ) : null}

          {transactions[index]?.giftWith &&
          transactions[index]?.giftWith.length > 0
            ? transactions[index]?.giftWith?.map((item, i) => (
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
          {transactions[index]?.giftCardDetails &&
          transactions[index]?.giftCardDetails.length ? (
            transactions[index]?.giftCardDetails?.map((giftcard, j) => (
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
              {transactions[index]?.orderDetails?.source ? (
                <img
                  src={transactions[index]?.orderDetails?.source}
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
                  {transactions[index]?.orderDetails?.name}
                </div>
                <div className="col-3 font-weight-bold">Currency Symbol:</div>
                <div className="col-2">
                  {transactions[index]?.orderDetails?.currencySymbol}
                </div>
              </div>
              <div className="row">
                <div className="col-2 font-weight-bold">Amount :</div>
                <div className="col-5">
                  {transactions[index]?.orderDetails?.amount}
                </div>
                <div className="col-3 font-weight-bold">Quantity :</div>
                <div className="col-2">
                  {transactions[index]?.orderDetails?.quantity}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>App User Management</h2>
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
                  Search by User Id Or Mobile No
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
                    <div className="col-6">
                      <label>User Id</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userId"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => (
                          setUserId(e.target.value), setUserIdErr("")
                        )}
                      />
                      {userIdErr && (
                        <div className="inlineerror">{userIdErr} </div>
                      )}
                    </div>

                    <div className="col-2 mt-3 pt-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => userDetail("id")}
                      >
                        Search
                      </button>
                    </div>
                  </div>
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
                        onClick={() => userDetail("mobile")}
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

      {loader === 1 ? (
        <>
          <div className="cm_card m-4">
            <Loader />
          </div>
        </>
      ) : Object.keys(userObject).length > 0 ? (
        <>
          <div className="cm_card mt-2">
            <div className="row">
              <div className="col-12">
                <h4>User Detail &nbsp;&nbsp;&nbsp; ({userObject?.userId})</h4>
              </div>
            </div>

            <div className="row ">
              <div className="col-3">
                <img style={{ width: "50%" }} src={userObject?.profileImage} />
              </div>

              <div className="col-9 ">
                <div className="row">
                  <div className="col-3 cm_card mr-1">
                    <div className="row ">
                      <div className="col">
                        {" "}
                        <label>Name : {userObject?.screenName}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {" "}
                        <label>DOB :{userObject?.dob}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {" "}
                        <label>Gender :{userObject?.gender}</label>
                      </div>
                    </div>
                    <div className="row">
                      {" "}
                      <div className="col">
                        {" "}
                        <label>
                          Reg Date :{" "}
                          {moment(userObject?.createdDate).format("DD-MMM-YY")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 cm_card mr-1">
                    <div className="row ">
                      {" "}
                      <div className="col">
                        {" "}
                        <label>
                          Is Email Verified :{" "}
                          {userObject?.emailVerified == true ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {" "}
                        <label>Contact No. : {userObject?.phone}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {" "}
                        <label>Email : {userObject?.email}</label>
                      </div>
                    </div>
                    <div className="row">
                      {" "}
                      <div className="col">
                        {" "}
                        <label>Country : {userObject?.countryName}</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-4  cm_card">
                    <div className="row ">
                      <div className="col">
                        {" "}
                        <label>
                          Total Rewards : {userObject?.totalRewards}
                        </label>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col">
                        {" "}
                        <label>
                          Total Reward Earned : {userObject?.totalRewardEarned}
                        </label>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col">
                        {" "}
                        <label>
                          Total Reward Used : {userObject?.totalRewardUsed}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row"></div>
          <hr></hr>
          <div id="main">
            <div className="container">
              <div className="accordion" id="user">
                <div className="card">
                  <div className="card-header" id="rewards">
                    <a
                      href="#"
                      className="btn btn-header-link"
                      data-toggle="collapse"
                      data-target="#reward"
                      aria-expanded="true"
                      aria-controls="reward"
                      onClick={(e) => getRewards(userObject.userId)}
                    >
                      Rewards
                    </a>
                  </div>

                  <div
                    id="reward"
                    className="collapse"
                    aria-labelledby="rewards"
                    data-parent="#user"
                  >
                    <div className="card-body">
                      <div className="form-group  row mb-4">
                        <div className="col-3">
                          <label>Amount :</label>
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            placeholder="Amount"
                            value={rewardAmount}
                            min="1"
                            required
                            onChange={(e) => (
                              setRewardAmount(e.target.value),
                              setRewardAmountErr("")
                            )}
                          />
                          {rewardAmountErr && (
                            <div className="inlineerror">{rewardAmountErr}</div>
                          )}
                        </div>
                        <div className="col-4">
                          <label>Description :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Description"
                            value={rewardDescription}
                            required
                            onChange={(e) => (
                              setRewardDescription(e.target.value),
                              setRewardDescriptionErr("")
                            )}
                          />
                          {rewardDescriptionErr && (
                            <div className="inlineerror">
                              {rewardDescriptionErr}
                            </div>
                          )}
                        </div>
                        <div className="col-5 mt-4 pt-3 text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleAddRewards()}
                          >
                            Add Reward
                          </button>
                          <button
                            className="btn btn-primary ml-3"
                            onClick={(e) => sendRewardSms(e)}
                          >
                            Send Reward SMS
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive cm_card p-0">
                        {loader == 2 ? (
                          <Loader />
                        ) : (
                          <table className="table  table-bordered user-table table-hover align-items-center">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Transaction Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rewards.length ? (
                                rewards?.map((item, i) => (
                                  <tr key={i}>
                                    <td>{(page - 1) * limit + i + 1}</td>
                                    <td>
                                      <span className="">
                                        {item.transactionType}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="">{item.amount}</span>
                                    </td>

                                    <td>
                                      <span className="">
                                        {item.description}
                                      </span>
                                    </td>
                                    <td>
                                      {moment(item.createdAt).format(
                                        "DD-MMM-YY"
                                      )}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5">
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
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="transactions">
                    <a
                      href="#"
                      className="btn btn-header-link"
                      data-toggle="collapse"
                      data-target="#transaction"
                      aria-expanded="true"
                      aria-controls="transaction"
                      onClick={(e) => getTransactions(userObject.userId)}
                    >
                      Transactions
                    </a>
                  </div>

                  <div
                    id="transaction"
                    className="collapse"
                    aria-labelledby="transactions"
                    data-parent="#user"
                  >
                    <div className="card-body">
                      <div className="table-responsive cm_card p-0">
                        {loader == 3 ? (
                          <Loader />
                        ) : (
                          <table className="table  table-bordered user-table table-hover align-items-center">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Trans Id</th>
                                <th>Trans Type</th>
                                <th>Occasion</th>
                                <th>Quantity</th>
                                <th>Trans Status</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactions.length ? (
                                transactions?.map((item, i) => (
                                  <tr key={i}>
                                    <td>{(page - 1) * limit + i + 1}</td>
                                    <td>
                                      <span
                                        className="text-primary c-pointer"
                                        onClick={() => (
                                          setConfirmModal(true), setIndex(i)
                                        )}
                                      >
                                        {item.orderId}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="">
                                        {item.transactionType}
                                      </span>
                                    </td>

                                    <td>
                                      <span className="">
                                        {item.occasionTitle}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="">{item.quantity}</span>
                                    </td>
                                    <td>
                                      <span className="">
                                        {item.transactionStatus}
                                      </span>
                                    </td>
                                    <td>
                                      {moment(item.transactionDate).format(
                                        "DD-MMM-YY"
                                      )}
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
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="connections">
                    <a
                      href="#"
                      className="btn btn-header-link"
                      data-toggle="collapse"
                      data-target="#connection"
                      aria-expanded="true"
                      aria-controls="transaction"
                      onClick={(e) => getConnections(userObject.userId)}
                    >
                      Connections
                    </a>
                  </div>

                  <div
                    id="connection"
                    className="collapse"
                    aria-labelledby="connections"
                    data-parent="#user"
                  >
                    <div className="card-body">
                      <div className="table-responsive cm_card p-0">
                        {loader == 4 ? (
                          <Loader />
                        ) : (
                          <table className="table  table-bordered user-table table-hover align-items-center">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Relationship</th>
                                <th>To Name</th>
                                <th>Contact No</th>
                                <th>Status</th>
                                <th>Accept Date</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {connections.length ? (
                                connections?.map((item, i) => (
                                  <tr key={i}>
                                    <td>{(page - 1) * limit + i + 1}</td>
                                    <td>
                                      <span className="">
                                        {item.subToRelationTitle}
                                      </span>
                                    </td>

                                    <td>
                                      <span className="">{item.subToName}</span>
                                    </td>
                                    <td>
                                      <span className="">{item.subTo}</span>
                                    </td>
                                    <td>
                                      <span className="">{item.status}</span>
                                    </td>
                                    <td>
                                      {moment(item.acceptTime).format(
                                        "DD-MMM-YY"
                                      )}
                                    </td>
                                    <td>
                                      {moment(item.createdAt).format(
                                        "DD-MMM-YY"
                                      )}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        isSearch && (
          <div className="cm_card m-2">
            <p className="text-center">
              <label>Data Not Found</label>
            </p>
          </div>
        )
      )}

      <ToastContainer />
    </div>
  );
};
export default AppUsers;
