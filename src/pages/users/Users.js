import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { getUserList, changePassword } from "../../services/ApiUsers";
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import moment from 'moment'
import { Spinner } from "react-bootstrap"


const Users = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'User Management' }]
  const [confirmModal, setConfirmModal] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [userId, setUserId] = useState()
  const [userArrayList, setUserArrayList] = useState([])
  const [loader, setLoader] = useState(false)
  const [name, setName] = useState('')
  const [userType, setUserType] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('')
  const [isSubmit, setIsSubmit] = useState(false);
  // all handler start
  useEffect(() => {
    userList()
  }, [])


  const handleValidate = () => {
    let validate = true
    if (password == '') {
      setPasswordErr('Password is required');
      validate = false
    } else {
      setPasswordErr('');
    }
    if (confirmPassword == '') {
      setConfirmPasswordErr('Confirm password is required');
      validate = false
    } else if (confirmPassword !== password) {
      setConfirmPasswordErr('confirm password is not matched');
      validate = false
    } else {
      setConfirmPasswordErr("");
    }
    return validate
  }


  const editPages = _id => {
    history.push('/user/edit/' + _id)
  }

  const userList = () => {
    setLoader(true)
    getUserList().then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setUserArrayList(data)
      }
    }).catch((err) => {
      setLoader(false);
      setUserArrayList([])
    });
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let createObj = {
        id,
        password
      }
      console.log("createObj---", createObj, id);
      changePassword(createObj).then((res) => {
        let { status, data } = resHandle(res);
        console.log("data", data);
        setIsSubmit(false);
        if (status === 200) {
          setPassword("");
          setConfirmPassword("");
          toast.success(data.message);
          setConfirmModal(false)
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        console.log('error', err)
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });

    }
  }

  const handleClose = () => {
    setConfirmModal(false)
  }


  // all handler end
  return (
    <div className='page_wrapper'>
      <Modal size="lg" show={confirmModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <div className="col-6" > <span className='font-weight-bold'>Name: </span>{name} </div>
            <div className="col-6" > <span className='font-weight-bold'>User Type: </span>{userType == "admin" ? "Admin Permission" : "Restrict Permission"}</div>
          </div>
          <div className="form-group row">
            <div className="col" >
              <label>Password</label>
              <input
                type='password'
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => (
                  setPassword(e.target.value), setPasswordErr("")
                )}
              />
              {passwordErr && (
                <div className="inlineerror">{passwordErr} </div>
              )}
            </div>
            <div className="col" >
              <label>Confirm Password</label>
              <input
                type='password'
                className="form-control"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => (
                  setConfirmPassword(e.target.value), setConfirmPasswordErr("")
                )}
              />
              {confirmPasswordErr && (
                <div className="inlineerror">{confirmPasswordErr} </div>
              )}
            </div>
          </div>

          <div className='d-flex justify-content-center pb-4'>
            <button
              type='button'
              className='btn btn-primary rounded-pill'
              onClick={handleChangePassword}
              disabled={isSubmit ? 'disabled' : ''}>
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
              {isSubmit ? ' Submitting..' : 'Submit'}


            </button>


          </div>
        </Modal.Body>
      </Modal>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>User Management</h2>
        <Link to='/user/create' className='btn btn-primary btn-sm'>
          Add User
        </Link>
      </div>
      <div className='twocol sb page_header'>
        <div className='headerinner left'></div>
      </div>

      <div className='table-responsive cm_card p-0'>
        {loader ? (
          <Loader />
        ) : (
          <table className='table  table-bordered user-table table-hover align-items-center  tablecollapse'>
            <thead>
              <tr>
                {/* <th>S.No</th> */}
                <th>Name </th>
                <th>Email </th>
                {/* <th>Contact No</th> */}
                <th>Premission</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userArrayList.length ? (
                userArrayList?.map((item, i) => (
                  <>
                    <tr key={i}
                      data-toggle="collapse"
                      data-target={".multi-collapse" + i}
                      aria-controls={"multiCollapseEx" + i}
                    >
                      {/* <td>{(page - 1) * limit + i + 1}</td> */}
                      <td>
                        <span className=''>{item.name}</span>
                      </td>
                      <td className="text-wrap">
                        <span className=''>{item.email}</span>
                      </td>

                      {/* <td>
                        <span className=''>{item.contactNo}</span>
                      </td> */}
                      <td className="text-wrap">
                        {item.userType == "admin" ? "Admin Permission" : "Restrict Permission"}
                      </td>
                      <td>
                        <span className=''>{item.isActive ? "Active" : "InActive"}</span>
                      </td>
                      <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                      <td>
                        <div className='action'>
                          <span onClick={() => editPages(item._id)}>
                            <i className='fas fa-edit'></i>
                          </span>
                          <span
                            onClick={() => (
                              setName(item.name),
                              setUserType(item.userType),
                              setId(item._id),
                              setConfirmModal(true)

                            )}
                          >
                            <i className='fas fa-key fa-fw' style={{ color: "#5e3fe3" }}></i>
                          </span>

                        </div>
                      </td>
                    </tr>
                    <tr key={"k" + i} className={"collapse multi-collapse" + i} id={"multiCollapseEx" + i}>
                      <td colSpan={6} className="is-breakable">
                        <div className='row' style={{ width: "100%" }}>

                          {item.permissions?.map((content, j) => (

                            <div className='col-3'>
                              <span><i className="far fa-check-circle" style={{ color: "#5e3fe3" }}></i>{content}</span>
                            </div>


                          )
                          )}
                        </div>
                      </td>

                    </tr>

                  </>
                ))
              ) : (
                <tr>
                  <td colSpan='6'>
                    <div className='nodatafound'>
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>



      <ToastContainer />
    </div>
  )
}
export default Users