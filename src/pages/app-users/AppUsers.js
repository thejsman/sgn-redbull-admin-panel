import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import { getAppUserByCondition, getRewardsByUserId, getTransactionsByUserId, getConnectionsByUserId } from "../../services/ApiUsers";
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import moment from 'moment'


const AppUsers = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'App User Management' }]
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [userId, setUserId] = useState("")
  const [userIdErr, setUserIdErr] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userObject, setUserObject] = useState({})
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [loader, setLoader] = useState(0)
  const [isSearch, setIsSearch] = useState(false);
  const [rewards, setRewards] = useState([])
  // all handler start



  const handleValidate = () => {
    let validate = true
    if (!userId.replace(/\s+/g, "")) {
      setUserIdErr("User Id is required")
      validate = false
    } else {
      setUserIdErr("")
    }
    return validate
  }

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
    let cond = ""
    if (params == "id" && handleValidate()) {
      cond = "userId=" + userId;
      callApi(cond);
    } else if (params == "mobile" && handleMobileValidate()) {
      cond = "phone=" + mobileNo;
      callApi(cond);
    }
  }

  const callApi = (cond) => {
    setLoader(1)
    setIsSearch(true);
    getAppUserByCondition(cond).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(0)
        setUserObject(data.data)
      }
    }).catch((err) => {
      setLoader(0);
      setUserObject({})
    });
  }

  const getRewards = (id) => {
    setLoader(2)
    getAppUserByCondition(cond).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(0)
        setUserObject(data.data)
      }
    }).catch((err) => {
      setLoader(0);
      setUserObject({})
    });

  }

  // all handler end
  return (
    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>App User Management</h2>
      </div>
      <div id="main">
        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                  aria-expanded="true" aria-controls="faq1">Search by User Id Or Mobile No</a>
              </div>

              <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-6">
                      <label>User Id</label>
                      <input
                        type='text'
                        className="form-control"
                        name="userId"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => (
                          setUserId(e.target.value),
                          setUserIdErr("")
                        )}
                      />
                      {userIdErr && (
                        <div className="inlineerror">{userIdErr} </div>
                      )}

                    </div>

                    <div className="col-2 mt-3 pt-3">
                      <button className="btn btn-primary"
                        onClick={() => userDetail('id')}
                      >Search</button>
                    </div>

                  </div>
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
                      <button className="btn btn-primary"
                        onClick={() => userDetail('mobile')}
                      >Search</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {loader == 1 ? (
        <>
          <div className='cm_card m-4'>
            <Loader />
          </div>
        </>
      ) : (
        Object.keys(userObject).length > 0 ? (
          <>
            <div className='cm_card mt-2'>
              <div className='row'>
                <div className='col-12'><h4>User Detail &nbsp;&nbsp;&nbsp;   ({userObject?.userId})</h4></div>
              </div>

              <div className='row '>
                <div className='col-3'>
                  <img style={{ width: "50%" }} src={userObject?.profileImage} />
                </div>

                <div className='col-9 '>
                  <div className='row' >
                    <div className='col-3 cm_card mr-1'>
                      <div className='row '><div className='col'> <label>Name  : {userObject?.screenName}</label></div></div>
                      <div className='row'><div className='col'>  <label>DOB :{userObject?.dob}</label></div></div>
                      <div className='row'><div className='col'> <label>Gender  :{userObject?.gender}</label></div></div>
                      <div className='row'>  <div className='col'> <label>Reg Date  : {userObject?.createdDate}</label></div></div>

                    </div>


                    <div className='col-4 cm_card mr-1'>
                      <div className='row '> <div className='col'> <label>Is Email Verified  : {userObject?.emailVerified == true ? "Yes" : "No"}</label></div></div>
                      <div className='row'><div className='col'> <label>Contact No.  : {userObject?.phone}</label></div></div>
                      <div className='row'><div className='col'> <label>Email  : {userObject?.email}</label></div></div>
                      <div className='row'> <div className='col'> <label>Country  : {userObject?.countryName}</label></div></div>

                    </div>

                    <div className='col-4  cm_card'>
                      <div className='row '><div className='col'> <label>Total Rewards  : {userObject?.totalRewards}</label></div></div>
                      <div className='row '><div className='col'> <label>Total Reward Earned : {userObject?.totalRewardEarned}</label></div></div>
                      <div className='row '><div className='col'> <label>Total Reward Used  : {userObject?.totalRewardUsed}</label></div></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className='form-group row'>

            </div>
            <hr></hr>
            <div id="main">
              <div className="container">
                <div className="accordion" id="user">
                  <div className="card">
                    <div className="card-header" id="rewards">
                      <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#reward"
                        aria-expanded="true" aria-controls="reward" onClick={(e) => (getRewards(userObject.userId))}>Rewards</a>
                    </div>

                    <div id="reward" className="collapse" aria-labelledby="rewards" data-parent="#user">
                      <div className="card-body">
                        <div className='table-responsive cm_card p-0'>
                          {loader == 2 ? (
                            <Loader />
                          ) : (
                            <table className='table  table-bordered user-table table-hover align-items-center'>
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
                                {/* {relationArrayList.length ? (
                relationArrayList?.map((item, i) => ( */}
                                <tr >
                                  <td>1</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>2</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>3</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                {/* ))
              ) : (
                <tr>
                  <td colSpan='6'>
                    <div className='nodatafound'>
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )} */}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="transactions">
                      <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#transaction"
                        aria-expanded="true" aria-controls="transaction">Transactions</a>
                    </div>

                    <div id="transaction" className="collapse" aria-labelledby="transactions" data-parent="#user">
                      <div className="card-body">
                        <div className='table-responsive cm_card p-0'>
                          {loader ? (
                            <Loader />
                          ) : (
                            <table className='table  table-bordered user-table table-hover align-items-center'>
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
                                {/* {relationArrayList.length ? (
                relationArrayList?.map((item, i) => ( */}
                                <tr >
                                  <td>1</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>2</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>3</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                {/* ))
              ) : (
                <tr>
                  <td colSpan='6'>
                    <div className='nodatafound'>
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )} */}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="connections">
                      <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#connection"
                        aria-expanded="true" aria-controls="transaction">Connections</a>
                    </div>

                    <div id="connection" className="collapse" aria-labelledby="connections" data-parent="#user">
                      <div className="card-body">
                        <div className='table-responsive cm_card p-0'>
                          {loader ? (
                            <Loader />
                          ) : (
                            <table className='table  table-bordered user-table table-hover align-items-center'>
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
                                {/* {relationArrayList.length ? (
                relationArrayList?.map((item, i) => ( */}
                                <tr >
                                  <td>1</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>2</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                <tr >
                                  <td>3</td>
                                  <td>
                                    <span className=''>Credit</span>
                                  </td>
                                  <td>
                                    <span className=''>10</span>
                                  </td>

                                  <td>
                                    <span className=''>Scratch card game</span>
                                  </td>
                                  <td>
                                    29/07/2022
                                  </td>

                                </tr>
                                {/* ))
              ) : (
                <tr>
                  <td colSpan='6'>
                    <div className='nodatafound'>
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )} */}
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
            <div className='cm_card m-2'>
              <p className="text-center"><label>Data Not Found</label></p>

            </div>
          )
        )
      )
      }







      <ToastContainer />
    </div >
  )
}
export default AppUsers