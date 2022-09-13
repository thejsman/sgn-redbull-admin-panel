import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  createSticker,
  getStickerByName,
  updateSticker
} from "../../services/ApiStickerService";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../components/common/loader'


const AddEditSticker = () => {
  const history = useHistory();
  const { id } = useParams();
  const [stickerName, setStickerName] = useState('')
  const [stickerNameErr, setStickerNameErr] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [displayNameErr, setDisplayNameErr] = useState('')
  const [order, setOrder] = useState('')
  const [orderErr, setOrderErr] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [iconUrlErr, setIconUrlErr] = useState('')
  //const [isActive, setIsActive] = useState('1')
  const [accessToken, setAccessToken] = useState('');
  const [isAddSticker, setIsAddSticker] = useState(false);
  const [loader, setLoader] = useState(false)
  const [base64, setBase64] = useState('')
  const [editImage, setEditImage] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)


  const breadcrumb = [
    { link: '/sticker', linkText: 'Sticker Management' },
    { link: '', linkText: isAddSticker ? 'Add Sticker' : 'Edit Sticker' }
  ]

  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
  const handleValidate = () => {
    let validate = true
    if (!stickerName.replace(/\s+/g, '')) {
      setStickerNameErr("Sticker name is required")
      validate = false
    } else if (!albhaNumericRegEx.test(stickerName)) {
      setStickerNameErr("Special characters and spaces are not allowed")
      validate = false
    } else {
      setStickerNameErr("")
    }
    if (!displayName.replace(/\s+/g, '')) {
      setDisplayNameErr("Display name is required")
      validate = false
    } else {
      setDisplayNameErr("")
    }
    if (!order) {
      setOrderErr("Order no is required")
      validate = false
    } else if (!numberRegEx.test(order)) {
      setOrderErr("Order no should be numeric");
      validate = false;
    } else {
      setOrderErr("");
    }
    if (isAddSticker && !iconUrl.replace(/\s+/g, '')) {
      setIconUrlErr("Icon is required")
      validate = false
    } else {
      setIconUrlErr("")
    }
    return validate
  }

  const handleGetStickerById = (id) => {
    let params = {
      stickerName: id,
    };
    getStickerByName(params).then((res) => {
      let { status, data } = resHandle(res);
      console.log(status, data, "datadatadatadatadata");
      if (status === 200) {
        setStickerName(data.data.Items[0].stickerName);
        setDisplayName(data.data.Items[0].displayName);
        setOrder(data.data.Items[0].displayOrder);
        setBase64(data.data.Items[0].icon);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }).catch((err) => {
      setLoader(false)
      toast.error("Sorry, a technical error occurred! Please try again later")
    });
  };
  const handleUpdateSticker = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        displayOrder: order,
        displayName: displayName,
        stickerName: stickerName
      };
      if (editImage) {
        obj['fileName'] = iconUrl;
        obj['base64'] = base64;
      }


      console.log("createObj---", obj);
      updateSticker(obj).then((res) => {
        setIsSubmit(false);
        let { status, data } = resHandle(res);
        if (status === 200) {
          toast.success(data.message);
          history.push("/sticker");
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });
    }
  };
  useEffect(() => {
    if (window.location.pathname == "/sticker/create") {
      setIsAddSticker(true);
    }
    if (window.location.pathname !== "/sticker/create") {
      setLoader(true);
      handleGetStickerById(id);

    }
  }, []);

  const handleCreateSticker = e => {
    e.preventDefault()
    if (handleValidate()) {
      setIsSubmit(true);
      let createObj = {
        stickerName: stickerName,
        stickerIdentifier: "sticker",
        displayOrder: order,
        displayName: displayName,
        fileName: iconUrl,
        base64: base64
      }
      console.log("createObj---", createObj);
      createSticker(createObj).then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/sticker");
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });

    }
  }
  const handleUpload = e => {
    let reader = new FileReader()
    let file = e.target.files[0]
    console.log('filefile', file)
    reader.addEventListener(
      'load',
      () => {
        setBase64(reader.result)
        setIconUrl(file.name)
        setEditImage(true)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }


  // All function End



  return (


    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>{isAddSticker ? 'Add Sticker' : 'Edit Sticker'} </h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className='form-controller chosen'>
          <div className='form-group row'>
            <div className='col'>
              <label>Sticker Name</label>
              <input
                type='text'
                readOnly={isAddSticker ? '' : 'readonly'}
                className='form-control'
                value={stickerName}
                name='stickerName'
                onChange={e => (
                  setStickerName(e.target.value), setStickerNameErr('')
                )}
              />
              {stickerNameErr ? (
                <div className='inlineerror'>{stickerNameErr} </div>
              ) : (
                ''
              )}
            </div>
            <div className='col'>
              <label>Display Name</label>
              <input
                type='text'
                className='form-control'
                value={displayName}
                name='displayName'
                onChange={e => (
                  setDisplayName(e.target.value), setDisplayNameErr('')
                )}
              />
              {displayNameErr && <div className='inlineerror'>{displayNameErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className="col">
              <label>Order</label>
              <input
                type='number'
                className="form-control"
                keyboardType='phone-pad'
                value={order}
                name="order"
                onChange={(e) => (
                  setOrder(e.target.value), setOrderErr("")
                )}
              />
              {orderErr && (
                <div className="inlineerror">{orderErr} </div>
              )}
            </div>
            <div className='col'>
              <label>Icon:</label>
              <div className="custom-file">
                <input id="input-file" type="file"
                  className="custom-file-input"
                  onChange={handleUpload} />
                <label className="custom-file-label" htmlFor="input-file">
                  {iconUrl ? iconUrl : 'Choose file'}
                </label>
              </div>
              {iconUrlErr && <div className='inlineerror'>{iconUrlErr} </div>}
            </div>

            {/* <div className='col'>
            <label>Status</label>
            <div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" value="1"  checked={isActive == 1}
                onChange={onStatusChanged} className="form-check-input" name="isActive" />Active
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" value="0"
                checked={isActive == 0} 
                onChange={onStatusChanged}
                className="form-check-input" name="isActive" />Inactive
              </label>
            </div>
            </div>
          </div> */}

          </div>
          {base64 ? <img className='iconImg' src={base64} alt='icon' /> : ''}
          <div className='button300'>
            {isAddSticker ? (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleCreateSticker}
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
                {isSubmit ? ' Submitting..' : 'Create'}


              </button>

            ) : (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleUpdateSticker}
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
      )}
      <ToastContainer />
    </div>


  )
}

export default AddEditSticker
