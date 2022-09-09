import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import { getAppUserByCondition } from "../../services/ApiUsers";
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import moment from 'moment'


const AppUsers = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'App User Management' }]
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [userId, setUserId] = useState()
  const [userIdErr, setUserIdErr] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userObject, setUserObject] = useState({})
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [loader, setLoader] = useState(false)
  // all handler start


  const getOrderListByMobileNo = () => {


  }


  const userDetail = (params) => {
    setLoader(true)
    let cond = ""
    if (params == "id") {
      cond = "userId=" + userId;
    } else if (params == "mobile") {
      cond = "phone=" + mobileNo;
    }
    getAppUserByCondition(cond).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setUserObject(data)
      }
    }).catch((err) => {
      setLoader(false);
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
                  aria-expanded="true" aria-controls="faq1">Search by User Id</a>
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
                      <button className="btn btn-primary" onClick={getOrderListByMobileNo}>Search</button>
                      {/* <button className="btn btn-secondary ml-2" onClick={resetData}>Reset</button> */}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='cm_card p-0'>
        {loader ? (
          <Loader />
        ) : (
          <>
            <div className='form-group row'>
              <div className='col'>
                <label>Relationship Name</label>
                <input
                  type='text'
                  readOnly={isAddFamilyRelationship ? '' : 'readonly'}
                  className='form-control'
                  value={relationshipName}
                  name='relationshipName'
                  onChange={e => (
                    setRelationshipName(e.target.value), setRelationshipNameErr('')
                  )}
                />
                {relationshipNameErr ? (
                  <div className='inlineerror'>{relationshipNameErr} </div>
                ) : (
                  ''
                )}
              </div>
              <div className='col-6'>
                <label>Display Name</label>
                Shipra
              </div>
              <div className='col-6'>
                <label>Display Name</label>
                Shipra
              </div>
            </div>
          </>
        )}
      </div>



      <ToastContainer />
    </div>
  )
}
export default AppUsers