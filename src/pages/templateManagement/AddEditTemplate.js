import React, { useEffect, useState } from 'react'
import {  useHistory, useParams,useLocation } from 'react-router-dom'
import {
  createTemplate,
  getTemplateByName,
  updateTemplate,
} from '../../services/ApiServices'
import Breadcrumb from '../../components/common/Breadcrumb'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import siteSetting from '../../config/env/Index'
const AddEditTemplate = () => {
  const history = useHistory()
  const { id } = useParams()
  ///const location=useLocation();
  // console.log("location",location.pathname);
  
console.log("handleGetTopicByIdhandleGetTopicById",id);
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
  const [composed, setComposed] = useState('');
  const [composedErr, setComposedErr] = useState('');
  const [badge, setBadge] = useState('');
  const [badgeErr, setBadgeErr] = useState('');
  const [priority, setPriority] = useState('');
  const [priorityErr, setPriorityErr] = useState('');
  const [sound, setSound] = useState('');
  const [soundErr, setSoundErr] = useState('');
  const [event, setEvent] = useState('');
  const [eventErr, setEventErr] = useState('');
  const [event_type, setEventType] = useState('');
  const [event_typeErr, setEvent_typeErr] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [topicId, setTopicId] = useState('');
  const [isAddTopic, setIsAddTopic] = useState(false);
  
  const breadcrumb = [
    { link: '/topic-management', linkText: 'Template Management' },
    { link: '', linkText: 'Add Template' }
  ]

  const handleValidate = () => {
    let validate = true
    if (!notificationName.replace(/\s+/g, '')) {
      setNotificationNameErr("Topic name is required")
      validate = false
    } else {
        setNotificationNameErr("")
    }

    return validate
  }

  const handleGetTopicById = (id) => {
    console.log("topicId",id);
    let baseUrl = 'https://Sagoon-dev.s3.amazonaws.com/'
    let params = {
      accessToken,
      notificationName: id
    }
    getTemplateByName(params).then(res => {
     let { status, data } = resHandle(res)
      console.log(status,data, 'datadatadatadatadata')
      if(status===200){
        setNotificationName(data.data.notificationName);
        setTitle(data.data.title);
        setBody(data.data.body);
        setComposed(data.data.composed);
        setEvent(data.data.event);
        setEventType(data.data.event_type);
        setPriority(data.data.priority);
        setSound(data.data.sound);
      }
      else{

      }
    })
  }
  const handleUpdateTemplate = e => {
    e.preventDefault()
    if (handleValidate()) {
      let createTopicObj = {
        notificationName,
        title,
        image,
        message,
        body,
        composed,
        badge,
        priority,
        sound,
        event,
        event_type
      }

      updateTemplate(createTopicObj).then(res => {
        let { status, data } = resHandle(res)
        if (status===200) {
          toast.success(data.message)
          history.push('/topic-management')
        } else {
          toast.success(data.message)
        }

      })
    }
  }
  useEffect(() => {
    console.log();
    if (window.location.pathname == '/add-topic') {
        setIsAddTopic(true)
    }
    if (window.location.pathname !== '/add-topic') {
      handleGetTopicById(id)
    }
  }, [])

  const handleCreateTemplate = e => {
    e.preventDefault()
    if (handleValidate()) {
      let createTopicObj = {
        notificationName,
        title,
        image,
        message,
        body,
        composed,
        badge,
        priority,
        sound,
        event,
        event_type
      }
      createTemplate(createTopicObj).then(res => {
        let { status, data } = resHandle(res)
        history.push('/topic-management')

        // if (status) {
        //   toast.success(data.message)
        //   history.push('/topic-management')
        // } else {
        //   toast.error(data.message)
        // }
      })
    }
  }

  // All function End

  

  return (
    <div className='page_wrapper'>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>{isAddTopic ? 'Add Template' : 'Edit Template'} </h2>
      </div>

      <form className='form-controller chosen'>
        <div className='form-group row'>
          <div className='col'>
            <label>Notification Name</label>
            <input
              type='text'
              className='form-control'
              value={notificationName}
              name='topicName'
              onChange={e => (
                setNotificationName(e.target.value), setNotificationNameErr('')
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
              name='topicName'
              onChange={e => (
                setTitle(e.target.value), setTitleErr('')      
              )}
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
              name='topicName'
              onChange={e => (
                setMessage(e.target.value), setMessageErr('')              )}
            />
            {messageErr && <div className='inlineerror'>{messageErr} </div>}
          </div>
          <div className='col'>
            <label>Body</label>
            <input
              type='text'
              className='form-control'
              value={body}
              name='topicName'
              onChange={e => (
                setBody(e.target.value), setBodyErr('')              )}
            />
            {bodyErr && <div className='inlineerror'>{bodyErr} </div>}
          </div>
        </div>
        <div className='form-group row'>
          <div className='col'>
            <label>Composed</label>
            <input
              type='text'
              className='form-control'
              value={composed}
              name='topicName'
              onChange={e => (
                setComposed(e.target.value), setComposedErr('')              )}
            />
            {composedErr && <div className='inlineerror'>{composedErr} </div>}
          </div>
          <div className='col'>
            <label>Badge</label>
            <input
              type='text'
              className='form-control'
              value={badge}
              name='topicName'
              onChange={e => (
                setBadge(e.target.value), setBadgeErr('')              )}
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
              name='topicName'
              onChange={e => (
                setPriority(e.target.value), setPriorityErr('')              )}
            />
            {priorityErr && <div className='inlineerror'>{priorityErr} </div>}
          </div>
        </div>
        <div className='form-group row'>
          <div className='col'>
            <label>Sound</label>
            <input
              type='text'
              className='form-control'
              value={sound}
              name='topicName'
              onChange={e => (
                setSound(e.target.value), setSoundErr('')              )}
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
              name='topicName'
              onChange={e => (
                setEvent(e.target.value), setEventErr('')              )}
            />
            {eventErr && <div className='inlineerror'>{eventErr} </div>}
          </div>
        </div>
        <div className='form-group row'>
          <div className='col'>
            <label>Event Type</label>
            <input
              type='text'
              className='form-control'
              value={event_type}
              name='topicName'
              onChange={e => (
                setEventType(e.target.value), setEventErr('')              )}
            />
            {event_typeErr && (
              <div className='inlineerror'>{event_typeErr} </div>
            )}
          </div>
        </div>
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
      <ToastContainer />
    </div>
  )
}

export default AddEditTemplate
