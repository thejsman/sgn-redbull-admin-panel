import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { redisCacheClear } from '../../services/ApiServices'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader';
import { Spinner } from "react-bootstrap";
import siteSetting from "../../config/env/Index";


const Redis = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Redis Management' }]

  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [arrList, setArrList] = useState([]);
  const [showVerificationForm, setShowVerificationForm] = useState(true)
  const [showVerificationFormErrorMsg, setShowVerificationFormErrorMsg] = useState('')
  const [item, setItem] = useState({})
  const [itemIndex, setItemIndex] = useState(-1)
  const [isSubmit, setIsSubmit] = useState(false)
  const [text, setText] = useState('');
  const [textErr, setTextErr] = useState('');

  // all handler start
  useEffect(() => {

  }, [])

  const handleClose = () => {
    setConfirmModal(false)
    setConfirmMsg('')
  }

  const handleValidate = () => {
    let validate = true;
    if (username == '') {
      setUsernameErr('UserName is required');
      validate = false
    }

    if (password == '') {
      setPasswordErr('Password is required');
      validate = false
    }
    return validate;
  }

  const handleClearCache = () => {
    handleClose()
    if (isSubmit) {
      redisCacheClear(text).then(res => {
        setIsSubmit(false);
        let { status, data } = resHandle(res)
        if (status === 200) {
          toast.success("Cache clear")
        } else {
          toast.error(data.message)
        }
      }).catch((err) => {
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });
    } else {
      let url = item.input ? (item.key + ":" + item.value) : item.key;
      let obj = arrList;
      obj[itemIndex].isProcess = true;
      setArrList([...obj]);
      redisCacheClear(url).then(res => {
        obj[itemIndex].isProcess = false;
        setArrList([...obj]);
        let { status, data } = resHandle(res)
        if (status === 200) {
          toast.success(item.key + " : Cache clear")
        } else {
          toast.error(data.message)
        }
      }).catch((err) => {
        obj[itemIndex].isProcess = false;
        setArrList([...obj]);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });
    }


  }





  const handleSubmit = e => {
    e.preventDefault();
    if (handleValidate()) {
      if (username == process.env.REACT_APP_REDIS_USERNAME && password == process.env.REACT_APP_REDIS_PWD) {
        setShowVerificationForm(false);
        let option = process.env.REACT_APP_REDIS;
        let arr = option.split(',');
        let arrList = [];
        arr.forEach(item => {
          let i = item.split(":");
          if (i.length > 1) {
            arrList.push({ key: i[0], input: true, value: i[1], isProcess: false })
          } else {
            arrList.push({ key: i[0], input: false, isProcess: false })
          }
        })
        setArrList([...arrList]);
      } else {
        console.log("error");
        setShowVerificationFormErrorMsg("Invalid credentials");
      }


    }

  }
  const handleValueChange = (index, e) => {
    const updatedValues = arrList.map((value, i) => {
      if (i === index) {
        value.value = e.target.value;
        return value;
      } else {
        return value;
      }
    });
    setArrList([...updatedValues])
  };

  return (
    <div className='page_wrapper'>
      {(showVerificationForm ?
        <div className="d-flex pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6 card p-5">
                <div className="form-group text-center">
                  <h3 className="color-primary">Access Verification</h3>
                </div>
                <form >
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      className={`form-control `}
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={e => (setUsername(e.target.value), setUsernameErr(''))}
                    />
                  </div>
                  {usernameErr && <div className='inlineerror'>{usernameErr} </div>}
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className={`form-control `}
                      placeholder="Enter password"
                      type={"password"}
                      value={password}
                      onChange={e => (setPassword(e.target.value), setPasswordErr(''))}
                    />

                  </div>
                  {passwordErr ? <div className="inlineerror"> {passwordErr} </div> : ''}

                  {showVerificationFormErrorMsg ? <div className="inlineerror"> {showVerificationFormErrorMsg} </div> : ''}
                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary rounded-pill pl-5 pr-5"
                      onClick={handleSubmit}
                    >Verify</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div> :
        <>
          <Modal show={confirmModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='text-center'>
                Are you sure you want to clear cache?
              </p>
              <div className='d-flex justify-content-center pb-4'>
                <button
                  onClick={handleClose}
                  className='btn btn-dark btn-sm pl-5 pr-5'
                >
                  No
                </button>
                <button
                  onClick={handleClearCache}
                  className='btn btn-danger btn-sm ml-3 pl-5 pr-5'
                >
                  Yes
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Breadcrumb breadcrumb={breadcrumb} />
          <div className='twocol sb page_header'>
            <h2>Redis Management</h2>

          </div>
          <div className='twocol sb page_header'>
            <div className='headerinner left'></div>
          </div>
          <form className='form-controller chosen'>
            <div className='form-group row p-3 mb-2 bg-secondary text-white'>
              <div className='col-4 pt-2'>

                <label>{siteSetting.api.redis_url}</label>
              </div>

              <div className='col-5'>
                <input
                  type='text'
                  className='form-control'
                  value={text}
                  onChange={e => (setText(e.target.value), setTextErr(''))}

                />



              </div>
              {textErr ? <div className="inlineerror"> {textErr} </div> : ''}
              <div className='col-3'>
                {isSubmit ? (<>
                  <span>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ color: '#603be1' }}
                    />
                    <label style={{ color: '#603be1' }}> Processing...</label>
                  </span>
                </>
                )
                  : (
                    <span
                      onClick={() => (
                        setIsSubmit(true),
                        setConfirmModal(true)

                      )}
                    >
                      <i className='fas fa-trash' style={{ color: '#603be1', cursor: 'pointer' }}></i>
                    </span>
                  )
                }


              </div>


            </div>

            {arrList.length ? (
              arrList?.map((item, i) => (

                <div className='form-group row border-bottom p-2'>
                  <div className='col-3'>

                    <label><b>{(i + 1)}.</b> &nbsp; {item.key}</label>
                  </div>
                  <div className='col-9'>
                    <div className='form-group row'>
                      <div className='col-9'>
                        {item.input && (<input
                          type='text'
                          className='form-control'
                          value={item.value}
                          onChange={e => handleValueChange(i, e)}

                        />

                        )}

                      </div>
                      <div className='col-3'>
                        {item.isProcess ? (<>
                          <span>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              style={{ color: '#603be1' }}
                            />
                            <label style={{ color: '#603be1' }}> Processing...</label>
                          </span>
                        </>
                        )
                          : (
                            <span
                              onClick={() => (
                                setConfirmModal(true),
                                setItem(item),
                                setItemIndex(i)
                              )}
                            >
                              <i className='fas fa-trash' style={{ color: '#603be1', cursor: 'pointer' }}></i>
                            </span>
                          )
                        }


                      </div>

                    </div>
                    <div className='row'>
                      <div className='col'>

                        {item.input ? (
                          siteSetting.api.redis_url + item.key + ":" + item.value
                        ) : siteSetting.api.redis_url + item.key}
                      </div>
                    </div>
                  </div>

                </div>

              ))
            ) : (
              <div className='form-group row'>
                <div className='col'>
                  No Record found
                </div></div>
            )}
          </form>



        </>
      )}
      <ToastContainer />
    </div>

  )

}
export default Redis