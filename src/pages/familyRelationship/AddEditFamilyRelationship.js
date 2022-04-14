import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  createFamilyRelationship,
  getFamilyRelationshipByName,
  updateFamilyRelationship
} from "../../services/ApiFamilyRelationService";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";



const AddEditFamilyRelationship = () => {
  const history = useHistory();
  const { id } = useParams();
  // const history = useHistory()
  // const { id } = useParams()
  const [relationshipName, setRelationshipName] = useState('')
  const [relationshipNameErr, setRelationshipNameErr] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [displayNameErr, setDisplayNameErr] = useState('')
  const [order, setOrder] = useState('')
  const [orderErr, setOrderErr] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [iconUrlErr, setIconUrlErr] = useState('')
  //const [isActive, setIsActive] = useState('1')
  const [accessToken, setAccessToken] = useState('');
  const [familyRelationshipId, setFamilyRelationshipId] = useState('');
  const [isAddFamilyRelationship, setIsAddFamilyRelationship] = useState(false);
  const [loader, setLoader] = useState(false)
  const [base64, setBase64] = useState('')
  const [editImage, setEditImage] = useState(false)
  const [imageErr, setImageErr] = useState('')
  const [editCase, setEditCase] = useState(false)
  
  const breadcrumb = [
    { link: '/family-relationship', linkText: 'Family Relationship Management' },
    { link: '', linkText: 'Add Family Relationship' }
  ]

  const numberRegEx = /\-?\d*\.?\d{1,2}/;
  const handleValidate = () => {
    let validate = true
    if (!relationshipName.replace(/\s+/g, '')) {
      setRelationshipNameErr("Relationship name is required")
      validate = false
    } else {
      setRelationshipNameErr("")
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
    } else if(!numberRegEx.test(String(order).toLowerCase())){
      setOrderErr("Order no should be numeric");
      validate = false;
    } else {
      setOrderErr("");
    }
    if (isAddFamilyRelationship && !iconUrl.replace(/\s+/g, '')) {
      setIconUrlErr("Icon is required")
      validate = false
    } else {
      setIconUrlErr("")
    }
    return validate
  }

  const handleGetRealtionShipById = (id) => {
    debugger;
    let params = {
      relationshipName: id,
    };
    getFamilyRelationshipByName(params).then((res) => {
      let { status, data } = resHandle(res);
      console.log(status, data, "datadatadatadatadata");
      if (status === 200) {
        setRelationshipName(data.data.Items[0].relationshipName);
        setDisplayName(data.data.Items[0].displayName);
        setOrder(data.data.Items[0].displayOrder);
        setBase64(data.data.Items[0].icon);
      } else {
      }
    });
  };
  const handleUpdateFamilyRelationship= (e) => {
    e.preventDefault();
    if (handleValidate()) {
      let obj = {
        displayOrder:order,
        displayName: displayName,
        relationshipName:relationshipName
      };
      if(editImage){
        obj['fileName']=iconUrl;
        obj['base64']=base64;
      }
    

      console.log("createObj---", obj);
      updateFamilyRelationship(obj).then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          toast.success(data.message);
          history.push("/family-relationship");
        } else {
          toast.success(data.message);
        }
      });
    }
  };
  useEffect(() => {
    if (window.location.pathname == "/family-relationship/create") {
      setIsAddFamilyRelationship(true);
    } 
    if (window.location.pathname !== "/family-relationship/create") {
      handleGetRealtionShipById(id);
    }
  }, []);

  const handleCreateFamilyRelationship = e => {
    e.preventDefault()
    if (handleValidate()) {
      let createObj = {
        relationshipName:relationshipName,
        relationshipIdentifier:"relationship",
        displayOrder:order,
        displayName: displayName,
        fileName: iconUrl,
        base64: base64
      }
      console.log("createObj---", createObj);
      createFamilyRelationship(createObj).then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          toast.success(data.message);
          history.push("/family-relationship");
        } else {
          toast.success(data.message);
        }
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
        <h2>{isAddFamilyRelationship ? 'Add Family Relationship' : 'Edit Family Relationship'} </h2>
      </div>

      <form className='form-controller chosen'>
        <div className='form-group row'>
          <div className='col'>
            <label>Relationship Name</label>
            <input
              type='text'
              readOnly={isAddFamilyRelationship ? '' :'readonly'}
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
              type="text"
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
        {base64 ? <img className='img-fluid' src={base64} alt='icon' /> : ''}
        <div className='button300'>
          {isAddFamilyRelationship ? (
            <button
              type='button'
              className='btn btn-primary rounded-pill'
              onClick={handleCreateFamilyRelationship}
            >
              Create
            </button>
          ) : (
            <button
              type='button'
              className='btn btn-primary rounded-pill'
              onClick={handleUpdateFamilyRelationship}
            >
              Update
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
    
  )
}

export default AddEditFamilyRelationship
