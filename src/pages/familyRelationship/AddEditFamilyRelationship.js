import React, { useEffect, useState } from 'react'
import {  useHistory, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import { ToastContainer } from 'react-toastify'

const AddEditFamilyRelationship = () => {
  // const history = useHistory()
  // const { id } = useParams()
  const [relationshipName, setRelationshipName] = useState('')
  const [relationshipNameErr, setRelationshipNameErr] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [displayNameErr, setDisplayNameErr] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [iconUrlErr, setIconUrlErr] = useState('')
  const [isActive, setIsActive] = useState('1')
  const [accessToken, setAccessToken] = useState('');
  const [familyRelationshipId, setFamilyRelationshipId] = useState('');
  const [isAddFamilyRelationship, setIsAddFamilyRelationship] = useState(false);
  const [loader, setLoader] = useState(false)
  
  const breadcrumb = [
    { link: '/family-relationship', linkText: 'Family Relationship Management' },
    { link: '', linkText: 'Add Family Relationship' }
  ]

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

    if (!iconUrl.replace(/\s+/g, '')) {
      setIconUrlErr("Icon is required")
      validate = false
    } else {
      setIconUrlErr("")
    }
    return validate
  }


  useEffect(() => {
    console.log();
    if (window.location.pathname == '/family-relationship/create') {
        setIsAddFamilyRelationship(true)
    } 
  }, [])

  const onStatusChanged =e => {
    setIsActive(e.currentTarget.value);
  }

  const handleCreateFamilyRelationship = e => {
    e.preventDefault()
    if (handleValidate()) {
      let createTopicObj = {
        relationshipName,
        displayName,
        iconUrl,
        isActive,
        familyRelationshipId
      }
    
    }
  }

  const handleUpload=e=>{
    setIconUrl(e.target.files[0].name)
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

          <div className='col'>
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
          </div>
       
        </div>
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
              onClick={handleCreateFamilyRelationship}
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
