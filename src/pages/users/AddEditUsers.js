import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { createUser, getUserDetailById, updateUserDetailById } from "../../services/ApiUsers";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../components/common/loader'


const AddEditUsers = () => {
  const history = useHistory();
  const { id } = useParams();
  // const history = useHistory()
  // const { id } = useParams()
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [contactNoErr, setContactNoErr] = useState('')
  const [designation, setDesignation] = useState('')
  const [designationErr, setDesignationErr] = useState('')
  const [permissions, setpermissions] = useState([])
  const [permissionsErr, setpermissionsErr] = useState('')
  const [isActive, setIsActive] = useState('1')
  const [userType, setUserType] = useState('2')
  const [isAddUser, setIsAddUser] = useState(false);
  const [loader, setLoader] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false);

  const modules = ["notifications", "relationship-management", "occasion-management", "cards-management", "rozy", "voucher", "redis", "invitation-form", "orders"];



  const breadcrumb = [
    { link: '/users', linkText: 'User Management' },
    { link: '', linkText: isAddUser ? 'Add User' : 'Edit User' }
  ]



  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
  const handleValidate = () => {
    let validate = true
    const validateEmails = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    const mobileNoRegEx = /^[0-9]{10}$/;
    if (email == '') {
      setEmailErr('Email is required');
      validate = false
    } else if (!validateEmails.test(email)) {
      setEmailErr('Please enter a valid email');
      validate = false
    } else {
      setEmailErr('');
    }
    if (password == '') {
      setPasswordErr('Password is required');
      validate = false
    } else {
      setPasswordErr("");
    }

    if (name == '') {
      setNameErr('Name is required');
      validate = false
    } else {
      setNameErr('');
    }
    if (contactNo == "") {
      setContactNoErr("Mobile no is required");
      validate = false;
    } else if (!mobileNoRegEx.test(contactNo)) {
      setContactNoErr("Invalid mobile no")
      validate = false
    } else {
      setContactNoErr("");
    }
    if (designation == '') {
      setDesignationErr('Designation is required');
      validate = false
    } else {
      setDesignationErr('');
    }
    if (permissions.length == 0 && userType == 3) {
      setpermissionsErr('Select atleast one module ');
      validate = false
    } else {
      setpermissionsErr('')
    }
    return validate
  }


  const onChangeCheckbox = (e, item) => {
    setpermissionsErr("");
    let temp = permissions;
    if (e.target.checked == false) {
      temp = temp.filter((v) => v !== item);
    } else {
      if (temp.findIndex((i) => i == item) == -1) {
        temp.push(item);
      }
    }
    setpermissions([...temp]);
  }

  const handleGetUserDetailById = (id) => {
    getUserDetailById(id).then((res) => {
      let { status, data } = resHandle(res);
      console.log(status, data, "datadatadatadatadata");
      if (status === 200) {
        setName(data.name);
        setEmail(data.email);
        setContactNo(data.contactNo);
        setDesignation(data.designation);
        setPassword("*******");
        setIsActive(data.isActive)
        setpermissions(data.permissions);
        let utype = data.userType == "admin" ? 2 : 3;
        setUserType(utype);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }).catch((err) => {
      setLoader(false)
      toast.error("Sorry, a technical error occurred! Please try again later")
    });
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let permissionList = [];
      if (userType == 1) {
        permissionList = modules;
        permissionList.push("users");
        permissionList.push("dashboard");
      } else if (userType == 2) {
        permissionList = modules;
        permissionList.push("dashboard");
      } else {
        permissionList = permissions;
        if (permissionList.findIndex((i) => (i == 'dashboard')) == -1) {
          permissionList.push("dashboard");
        }
      }
      let createObj = {
        name,
        email,
        contactNo,
        designation,
        permissions,
        userType: (userType == 2 ? "admin" : "employee"),
        isActive,
        permissions: permissionList
      }
      console.log("createObj---", createObj, id);
      updateUserDetailById(id, createObj).then((res) => {
        let { status, data } = resHandle(res);
        console.log("data", data);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/users");
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        console.log('error', err)
        setIsSubmit(false);
        toast.error("Sorry, Could not create the User")
      });

    }

  };
  useEffect(() => {
    if (window.location.pathname == "/user/create") {
      setIsAddUser(true);
    }
    if (window.location.pathname !== "/user/create") {
      setLoader(true);
      setIsAddUser(false);
      handleGetUserDetailById(id);

    }
  }, []);

  const handleCreateUser = e => {
    e.preventDefault()
    if (handleValidate()) {

      setIsSubmit(true);
      let permissionList = [];
      if (userType == 1) {
        permissionList = modules;
        permissionList.push("users");
        if (permissionList.findIndex((i) => (i == 'dashboard')) == -1) {
          permissionList.push("dashboard");
        }

      } else if (userType == 2) {
        permissionList = modules;
        if (permissionList.findIndex((i) => (i == 'dashboard')) == -1) {
          permissionList.push("dashboard");
        }
      } else {
        permissionList = permissions;
        permissionList.push("dashboard");
      }
      let createObj = {
        name,
        email,
        contactNo,
        password,
        designation,
        permissions,
        userType: (userType == 1 ? "superadmin" : (userType == 2 ? "admin" : "employee")),
        isActive,
        permissions: permissionList
      }
      console.log("createObj---", createObj);
      createUser(createObj).then((res) => {
        let { status, data } = resHandle(res);
        console.log("data", data);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/users");
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        console.log('error', err)
        setIsSubmit(false);
        toast.error("Sorry, Could not create the User")
      });

    }
  }



  // All function End



  return (


    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>{isAddUser ? 'Add User' : 'Edit User'} </h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className='form-controller chosen'>
          <div className='form-group row'>
            <div className='col'>
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                value={name}
                name='name'
                onChange={e => (
                  setName(e.target.value), setNameErr('')
                )}
              />
              {nameErr ? (
                <div className='inlineerror'>{nameErr} </div>
              ) : (
                ''
              )}
            </div>
            <div className='col'>
              <label>Email</label>
              <input
                type='text'
                className='form-control'
                value={email}
                name='email'
                onChange={e => (
                  setEmail(e.target.value), setEmailErr('')
                )}
              />
              {emailErr && <div className='inlineerror'>{emailErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className="col">
              <label>Mobile No</label>
              <input
                type='number'
                className="form-control"
                keyboardType='phone-pad'
                value={contactNo}
                name="contactNo"
                onChange={(e) => (
                  setContactNo(e.target.value), setContactNoErr("")
                )}
              />
              {contactNoErr && (
                <div className="inlineerror">{contactNoErr} </div>
              )}
            </div>
            <div className="col">
              <label>Password</label>
              <input
                type='password'
                className="form-control"
                readOnly={isAddUser ? '' : 'readonly'}
                value={password}
                name="password"
                onChange={(e) => (
                  setPassword(e.target.value), setPasswordErr("")
                )}
              />
              {!isAddUser && (
                <small style={{ color: "#a6ada4" }}>*Change password option is available on User list page</small>
              )}
              {passwordErr && (
                <div className="inlineerror">{passwordErr} </div>
              )}
            </div>


          </div>
          <div className='form-group row'>
            <div className="col">
              <label>Designation</label>
              <input
                type='text'
                className="form-control"
                value={designation}
                name="designation"
                onChange={(e) => (
                  setDesignation(e.target.value), setDesignationErr("")
                )}
              />
              {designationErr && (
                <div className="inlineerror">{designationErr} </div>
              )}
            </div>
            <div className="col">
              <label>Status</label>
              <div>
                <div className="form-check-inline mt-2">
                  <label className="form-check-label">
                    <input type="radio" value="1" checked={isActive == 1}
                      onChange={(e) => (setIsActive(e.target.value))} className="form-check-input" name="isActive" />Active
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" value="0"
                      checked={isActive == 0}
                      onChange={(e) => (setIsActive(e.target.value))}
                      className="form-check-input" name="isActive" />Inactive
                  </label>
                </div>
              </div>
            </div>



          </div>


          <div className='form-group row'>

            <div className="col-12">
              <label>User Type</label>
              <div>
                {/* <div className="form-check-inline mt-2 mr-5">
                  <label className="form-check-label">
                    <input type="radio" value="1" checked={userType == 1}
                      onChange={(e) => (setUserType(e.target.value))}
                      className="form-check-input" name="userType" />Is Super Admin
                    <br /><small>(Access all modules)</small>
                  </label>
                </div> */}
                <div className="form-check-inline mr-5">
                  <label className="form-check-label">
                    <input type="radio" value="2"
                      checked={userType == 2}
                      onChange={(e) => (setUserType(e.target.value))}
                      className="form-check-input" name="userType" />Is Admin
                    <small style={{ color: "#a6ada4" }}> (Access all modules except the User section)</small>
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" value="3"
                      checked={userType == 3}
                      onChange={(e) => (setUserType(e.target.value))}
                      className="form-check-input" name="userType" />Restricted Access
                    <small style={{ color: "#a6ada4" }}> (Access only those modules that have  access permissions)</small>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {(userType == 3) && (
            <div className='form-group row mt-5'>
              <div className="col-12">
                <label>Select Modules</label>
                <div className="form-group row m-1" style={{ border: '1px solid #d9c5c5' }}>
                  {modules.map((item, index) => {
                    return (
                      <div className="col-3 m-3" key={index}>
                        <div className="form-check">
                          <input type="checkbox"
                            id={`custom-checkbox-${index}`}
                            className="form-check-input"
                            checked={permissions?.some((d) => d == item)}
                            value={item}
                            onChange={(e) => {
                              onChangeCheckbox(e, item);
                            }}
                          />
                          <label htmlFor={`custom-checkbox-${index}`} className="form-check-label"  > {item}
                          </label>
                        </div>
                      </div>
                    )
                  })}

                </div>
                {permissionsErr && (
                  <div className="inlineerror">{permissionsErr} </div>
                )}
              </div>
            </div>
          )}

          <div className='button300'>
            {isAddUser ? (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleCreateUser}
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
                {isSubmit ? ' Submitting..' : 'Create'}


              </button>

            ) : (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleUpdateUser}
                disabled={isSubmit ? 'disabled' : ''}
              >
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
                {isSubmit ? ' Submitting..' : 'Update'}

              </button>
            )}
          </div>
        </form>
      )
      }
      <ToastContainer />
    </div >


  )
}

export default AddEditUsers
