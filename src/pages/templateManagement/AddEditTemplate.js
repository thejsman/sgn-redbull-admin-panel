import React, { useEffect, useState } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import {
  createTemplate,
  getTemplateByName,
  updateTemplate
} from '../../services/ApiServices'
import Breadcrumb from '../../components/common/Breadcrumb'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'

const AddEditTemplate = () => {
  const history = useHistory()
  const { id } = useParams()
  ///const location=useLocation();
  // console.log("location",location.pathname);

  console.log('handleGetTopicByIdhandleGetTopicById', id)
  const [notificationName, setNotificationName] = useState('')
  const [notificationNameErr, setNotificationNameErr] = useState('')
  const [title, setTitle] = useState('')
  const [titleErr, setTitleErr] = useState('')
  const [image, setImage] = useState('')
  const [imageErr, setImageErr] = useState('')
  const [message, setMessage] = useState('')
  const [messageErr, setMessageErr] = useState('')
  const [body, setBody] = useState('')
  const [bodyErr, setBodyErr] = useState('')
  const [composed, setComposed] = useState('')
  const [composedErr, setComposedErr] = useState('')
  const [badge, setBadge] = useState('')
  const [badgeErr, setBadgeErr] = useState('')
  const [priority, setPriority] = useState('')
  const [priorityErr, setPriorityErr] = useState('')
  const [sound, setSound] = useState('')
  const [soundErr, setSoundErr] = useState('')
  const [event, setEvent] = useState('')
  const [eventErr, setEventErr] = useState('')
  const [event_type, setEventType] = useState('')
  const [event_typeErr, setEventTypeErr] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [topicId, setTopicId] = useState('')
  const [isAddTopic, setIsAddTopic] = useState(false)
  const [base64, setBase64] = useState('')
  const [fileName, setFileName] = useState('')
  const [loader, setLoader] = useState(false)
  const [editCase, setEditCase] = useState(false)
  const [editImage, setEditImage] = useState(false)

  const breadcrumb = [
    { link: '/topic-management', linkText: 'Template Management' },
    { link: '', linkText: 'Add Template' }
  ]

  const handleValidate = () => {
    let validate = true
    const albhaRegEx = /^[a-zA-z]+$/;
    if (!notificationName.replace(/\s+/g, '')) {
      setNotificationNameErr('Notification name is required')
      validate = false
    } else if (!albhaRegEx.test(notificationName)) {
      setNotificationNameErr("only alphabets are allowed")
      validate = false
    } else {
      setNotificationNameErr('')
    }
    if (!title.replace(/\s+/g, '')) {
      setTitleErr('Title is required')
      validate = false
    } else {
      setTitleErr('')
    }
    if (!message.replace(/\s+/g, '')) {
      setMessageErr('Message is required')
      validate = false
    } else {
      setMessageErr('')
    }
    if (!body.replace(/\s+/g, '')) {
      setBodyErr('Body  is required')
      validate = false
    } else {
      setBodyErr('')
    }
    if (!composed.replace(/\s+/g, '')) {
      setComposedErr('Composed  is required')
      validate = false
    } else {
      setComposedErr('')
    }
    if (!sound.replace(/\s+/g, '')) {
      setSoundErr('Sound  is required')
      validate = false
    } else {
      setSoundErr('')
    }
    if (!badge.replace(/\s+/g, '')) {
      setBadgeErr('Badge  is required')
      validate = false
    } else {
      setBadgeErr('')
    }
    if (!event.replace(/\s+/g, '')) {
      setEventErr('Event  is required')
      validate = false
    } else {
      setEventErr('')
    }
    if (!priority.replace(/\s+/g, '')) {
      setPriorityErr('Priority  is required')
      validate = false
    } else {
      setPriorityErr('')
    }
    if (!event_type.replace(/\s+/g, '')) {
      setEventTypeErr('Event type is required')
      validate = false
    } else {
      setEventTypeErr('')
    }
    if (!editCase && !base64) {
      setImageErr('Image is required')
      validate = false
    } else {
      setImageErr('')
    }

    return validate
  }

  const handleGetTopicById = id => {
    console.log('topicId', id)
    let baseUrl = 'https://Sagoon-dev.s3.amazonaws.com/'
    let params = {
      accessToken,
      notificationName: id
    }
    getTemplateByName(params).then(res => {
      let { status, data } = resHandle(res)
      console.log(status, data, 'datadatadatadatadata')
      if (status === 200) {
        setLoader(false)
        setNotificationName(data.data.notificationName)
        setMessage(data.data.message)
        setTitle(data.data.title)
        setBody(data.data.body)
        setComposed(data.data.composed)
        setEvent(data.data.event)
        setEventType(data.data.event_type)
        setPriority(data.data.priority)
        setSound(data.data.sound)
        setBase64(data.data.image)
        setBadge(data.data.badge)

      } else {
      }
    }).catch((err) => {
      setLoader(false);
      toast.error("Sorry, a technical error occurred! Please try again later")
    });
  }
  const handleUpdateTemplate = e => {
    e.preventDefault()
    if (handleValidate()) {
      setLoader(true)
      let createTopicObj = {};
      if (!editImage) {
        createTopicObj = {
          notificationName: notificationName.toLowerCase(),
          title,
          image,
          message,
          body,
          composed,
          badge,
          priority,
          sound,
          event,
          event_type,
          fileName
        }
      }
      else {
        createTopicObj = {
          notificationName: notificationName.toLowerCase(),
          title,
          image,
          message,
          body,
          composed,
          badge,
          priority,
          sound,
          event,
          event_type,
          base64,
          fileName
        }
      }


      updateTemplate(createTopicObj).then(res => {
        let { status, data } = resHandle(res)
        if (status === 200) {
          setLoader(false)
          setEditCase(false)
          toast.success(data.message)
          history.push('/topic-management')
        } else {
          toast.success(data.message)
        }
      }).catch((err) => {
        setLoader(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });
    }
  }
  useEffect(() => {
    console.log()
    if (window.location.pathname == '/add-topic') {
      setIsAddTopic(true)
    }
    if (window.location.pathname !== '/add-topic') {
      setLoader(true)
      handleGetTopicById(id)
      setEditCase(true)
    }
  }, [])

  const handleCreateTemplate = e => {
    e.preventDefault()
    if (handleValidate()) {
      setLoader(true)
      let createTopicObj = {
        notificationName: notificationName.toLowerCase(),
        title,
        image,
        message,
        body,
        composed,
        badge,
        priority,
        sound,
        event,
        event_type,
        base64,
        fileName
      }
      createTemplate(createTopicObj).then(res => {
        let { status, data } = resHandle(res)
        // history.push('/topic-management')

        if (status == 200) {
          setLoader(false)
          toast.success(data.message)
          history.push('/topic-management')
        } else {
          toast.error(data.message)
        }
      }).catch((err) => {
        setLoader(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });
    }
  }

  // All function End

  const handleFileChange = e => {
    let reader = new FileReader()
    let file = e.target.files[0]
    console.log('filefile', file)
    reader.addEventListener(
      'load',
      () => {
        setBase64(reader.result)
        setFileName(file.name)
        setEditImage(true)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>{isAddTopic ? 'Add Template' : 'Edit Template'} </h2>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <form className='form-controller chosen'>
          <div className='form-group row'>
            <div className='col'>
              <label>Notification Name</label>
              <input
                type='text'
                className='form-control'
                value={notificationName}
                name='notificationName'
                disabled={editCase ? true : false}
                onChange={e => (
                  setNotificationName(e.target.value),
                  setNotificationNameErr('')
                )}
              />
              {notificationNameErr ? (
                <div className='inlineerror'>{notificationNameErr} </div>
              ) : (
                ''
              )}
            </div>
            <div className='col'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                value={title}
                name='title'
                onChange={e => (setTitle(e.target.value), setTitleErr(''))}
              />
              {titleErr && <div className='inlineerror'>{titleErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className='col'>
              <label>Message</label>
              <input
                type='text'
                className='form-control'
                value={message}
                name='message'
                onChange={e => (setMessage(e.target.value), setMessageErr(''))}
              />
              {messageErr && <div className='inlineerror'>{messageErr} </div>}
            </div>
            <div className='col'>
              <label>Body</label>
              <input
                type='text'
                className='form-control'
                value={body}
                name='body'
                onChange={e => (setBody(e.target.value), setBodyErr(''))}
              />
              {bodyErr && <div className='inlineerror'>{bodyErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className='col'>
              <label>Composed</label>
              <input
                type='number'
                name="composed"
                className='form-control'
                value={composed}
                onChange={e => (
                  setComposed(e.target.value), setComposedErr('')
                )}
              />
              {composedErr && <div className='inlineerror'>{composedErr} </div>}
            </div>
            <div className='col'>
              <label>Badge</label>
              <input
                type='text'
                className='form-control'
                value={badge}
                name='badge'
                onChange={e => (setBadge(e.target.value), setBadgeErr(''))}
              />
              {badgeErr && <div className='inlineerror'>{badgeErr} </div>}
            </div>
          </div>
          <div className='form-group row'>
            <div className='col'>
              <label>Priority</label>
              <input
                type='text'
                className='form-control'
                value={priority}
                name='priority'
                onChange={e => (
                  setPriority(e.target.value), setPriorityErr('')
                )}
              />
              {priorityErr && <div className='inlineerror'>{priorityErr} </div>}
            </div>

            <div className='col'>
              <label>Sound</label>
              <input
                type='text'
                className='form-control'
                value={sound}
                name='sound'
                onChange={e => (setSound(e.target.value), setSoundErr(''))}
              />
              {soundErr && <div className='inlineerror'>{soundErr} </div>}
            </div>
          </div>

          <div className='form-group row'>
            <div className='col'>
              <label>Event</label>
              <input
                type='text'
                className='form-control'
                value={event}
                name='event'
                onChange={e => (setEvent(e.target.value), setEventErr(''))}
              />
              {eventErr && <div className='inlineerror'>{eventErr} </div>}
            </div>

            <div className='col'>
              <label>Event Type</label>
              <input
                type='text'
                className='form-control'
                value={event_type}
                name='eventType'
                onChange={e => (setEventType(e.target.value), setEventTypeErr(''))}
              />
              {event_typeErr && (
                <div className='inlineerror'>{event_typeErr} </div>
              )}
            </div>
          </div>

          <div className='form-group row'>
            <div className='col'>
              <label>Image</label>
              <input
                type='file'
                className='form-control'
                value=''
                onChange={handleFileChange}
              />
            </div>
            {imageErr && (
              <div className='inlineerror'>{imageErr} </div>
            )}
          </div>

          {base64 ? <img className='img-fluid' src={base64} alt='icon' /> : ''}

          <div className='button300'>
            {isAddTopic ? (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleCreateTemplate}
              >
                Create
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-primary rounded-pill'
                onClick={handleUpdateTemplate}
              >
                Update
              </button>
            )}
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  )
}

export default AddEditTemplate
