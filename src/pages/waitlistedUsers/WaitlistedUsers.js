import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { waitlistedUsers } from "../../services/ApiServices";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import { sendInvitation } from '../../services/ApiServices';
import moment from 'moment'


const WaitlistedUsers = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Waitlisted Users" }];
  const [waitlistedUserList, setWaitlistedUserList] = useState([]);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(6);
  const [loader, setLoader] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState("PENDING");
  const [mobileNo, setMobileNo] = useState("");
  const [keyId, setKeyId] = useState(null);
  const [dateErr, setDateErr] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [orderIdPage, setOrderIdPage] = useState(null);
  const [isSearch, setIsSearch] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [orderIdErr, setOrderIdErr] = useState("");
  const [pageState, setPageState] = useState([{ page: 1, key: null }])

  useEffect(() => {
    getWaitlistedUsersList(null, null, null, page, 1)
  }, [])

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter(item => item.page == pageno);

    if (data.length == 0) {
      setPage(pageno);
      if (keyId !== null) {
        arr.push({ page: pageno, key: keyId });
        setPageState([...arr]);
        let totCount = count + limit;
        setCount(totCount)
        if (isSearch == 1) {
          getWaitlistedUsersList(keyId, null, null, pageno, 0);
        } else if (isSearch == 2) {
          getWaitlistedUsersList(keyId, date, null, pageno, 0);
        } else if (isSearch == 3) {
          getWaitlistedUsersList(keyId, null, mobileNo, pageno, 0);
        }

      } else {

        setWaitlistedUserList([...[]])
      }
    } else {
      setPage(pageno);
      setKeyId(data[0].key);
      if (isSearch == 1) {
        getWaitlistedUsersList(data[0].key, null, null, pageno, 0);
      } else if (isSearch == 2) {
        getWaitlistedUsersList(data[0].key, date, null, pageno, 0);
      } else if (isSearch == 3) {
        getWaitlistedUsersList(data[0].key, null, mobileNo, pageno, 0);
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

  const sendInvitations = (e, flag, item) => {
    e.target.className = "btn btn-gradient btn-sm"
    e.target.textContent = "Sending...";

    let obj = {};
    if (flag == 1) {
      obj = {
        receiversList: [
          {
            phone: item.phone,
            dialCode: item.dialCode,
            firstName: "",
            lastName: "",
          }]
      };
    } else {
      let arr = [];
      waitlistedUserList.forEach(item => {
        if (item.ischecked) {
          arr.push({
            phone: item.phone,
            dialCode: item.dialCode,
            firstName: "",
            lastName: "",
          })
        }
      })

      obj = {
        receiversList: arr
      }
    }
    // let temp = waitlistedUserList;
    // temp.forEach(item => { item['ischecked'] = false });
    // setWaitlistedUserList([...temp]);

    sendInvitation(obj).then((res) => {
      let { status, data } = resHandle(res);
      e.target.className = "btn btn-primary btn-sm"
      e.target.textContent = "Send Invitation";

      if (status === 200) {
        toast.success("Invitation code has been sent successfully");
      } else {
        toast.success(data.message);
      }
    }).catch((err) => {
      e.target.className = "btn btn-primary btn-sm"
      e.target.textContent = "Send Invitation";
      toast.error("Sorry, a technical error occurred! Please try again later")
    });


  }


  const getListByDate = () => {
    if (handleValidate()) {
      setIsSearch(2);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = { page: 1, key: null };
      let array = [obj]
      setPageState(...[array])
      setKeyId(null);
      setMobileNo("");
      setPage(1);
      setCount(6);
      getWaitlistedUsersList(null, date, null, 1, 1);
    }
  }


  const getListByMobile = () => {
    if (handleMobileNoValidate()) {
      setIsSearch(3);
      if (count < limit) {
        let totCount = count + limit;
        setCount(totCount);
      }
      let obj = { page: 1, key: null };
      let array = [obj]
      setPageState(...[array])
      setKeyId(null);
      setDate("");
      setPage(1);
      setCount(6);
      getWaitlistedUsersList(null, null, mobileNo, 1, 1);
    }
  }


  const getWaitlistedUsersList = (keyId, dt, mobNo, nextPage, firstSearh) => {
    setLoader(true);
    let params = `key=`;
    if (keyId) {
      params += keyId;
    }

    if (dt) {
      params += "&date=" + dt;
    }

    if (mobNo) {
      params += "&mobile=" + mobNo;
    }

    waitlistedUsers(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false);
        let arr = data.data.items;
        arr.forEach(item => { item['ischecked'] = false });
        console.log('arr', arr);
        setWaitlistedUserList([...arr]);
        if (data.data.key) {
          if (firstSearh !== 1) {
            let arr = pageState;
            if (arr.findIndex(item => item.page == (nextPage + 1)) == -1) {
              setKeyId(data.data.key);
            }
          } else {
            setKeyId(data.data.key);
          }
        }
        if (data.data.items.length == 0 || data.data.key == "") {
          setKeyId(null)
        }
      } else {
        setLoader(false)
        setWaitlistedUserList([])
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    }).catch((err) => {
      setLoader(false)
      setWaitlistedUserList([])
      if (err.response.status !== 400) {
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    });

  };

  const getList = () => {
    let arr = [{ page: 1, key: null }];
    setIsSearch(1);
    setPage(1);
    setCount(6);
    setKeyId(null);
    setMobileNo("");
    setDate("")
    setPageState([...arr]);
    getWaitlistedUsersList(null, null, null, 1, 1);
  };

  const onChangeCheckbox = (e, i) => {
    let temp = waitlistedUserList;
    temp[i]['ischecked'] = e.target.checked;
    setWaitlistedUserList([...temp]);
  }

  const selectAllCheckbox = (e) => {
    let temp = waitlistedUserList;
    temp.forEach(item => { item['ischecked'] = e.target.checked });
    setWaitlistedUserList([...temp]);
  }


  return (
    <div className="page_wrapper">

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header mr-3">
        <h2>Waitlisted Users</h2>
        <Button className='btn btn-primary' onClick={() => { getList() }}>
          All Waitlisted Users
        </Button>
      </div>
      <div id="main">

        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                  aria-expanded="true" aria-controls="faq1">Search By Date</a>
              </div>

              <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                <div className="card-body">
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

                    <div className="col-4 mt-4 pt-3">
                      <button className="btn btn-primary" onClick={getListByDate}>Search</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="faqhead2">
                <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2"
                  aria-expanded="true" aria-controls="faq2">Search By Mobile No</a>
              </div>

              <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                <div className="card-body">
                  <div className="form-group  row mb-4">

                    <div className="col-6">
                      <label>Mobile :</label>
                      <input
                        type='number'
                        className="form-control"
                        name="userId"
                        placeholder="Enter Mobile No with Country Code like : 919999999999"
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
                    <div className="col-6 mt-4 pt-3">
                      <button className="btn btn-primary" onClick={getListByMobile}>Search</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



      <div className=" mt-5 mb-2">
        <button className="btn btn-primary btn-sm" onClick={(e) => (sendInvitations(e, 0, {}))}>Send Invitations</button>
      </div>

      <div className="table-responsive cm_card p-0">

        {loader ? (
          <Loader />
        ) : (
          <>
            <table className="table table-bordered user-table table-hover align-items-center table-fixed tablecollapse"  >
              <thead>
                <tr>
                  <th style={{ width: "5%" }}><input type="checkbox"
                    onChange={(e) => (selectAllCheckbox(e))}
                  /></th>
                  <th>Detail</th>
                  <th>Code Sent Info</th>
                  <th style={{ width: "15%" }}>Created At</th>
                  <th style={{ width: "15%" }}>Action</th>


                </tr>
              </thead>
              <tbody>
                {waitlistedUserList.length > 0 ? (
                  waitlistedUserList?.map((item, i) => (

                    <tr key={i}>
                      <td>
                        <input type="checkbox" id={`custom-checkbox-${i}`}
                          value={item.ischecked}
                          checked={item.ischecked}
                          onChange={(e) => {
                            onChangeCheckbox(e, i);
                          }}
                        /></td>
                      <td className="text-wrap">
                        <div>Country Code : {item.countryName} ({item.countryCode})</div>
                        <div>Mobile No : {item.dialCode}-{item.phone}</div>
                      </td>



                      <td>
                        {item?.codeSentInfo && (<>
                          <div> Attempts : {item?.codeSentInfo?.attempts}</div>
                          <div> Invitation Code : {item?.codeSentInfo?.invitationCode}</div>
                          <div> Created At : {moment(item?.codeSentInfo?.createdAt).format("DD, MMM YYYY")}</div>
                        </>
                        )}

                      </td>
                      <td>{moment(item.createdAt).format("DD, MMM YYYY")}</td>


                      <td><button className="btn btn-primary btn-sm "
                        onClick={(e) => { sendInvitations(e, 1, item) }}
                      >Send Invitation</button></td>
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
          </>
        )}
      </div>

      {
        // waitlistedUserList.length>0 ? (
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

export default WaitlistedUsers;
