import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'

import Breadcrumb from '../../components/common/Breadcrumb'
import { deleteTemplate, templateList } from '../../services/ApiServices'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'


const TopicManagement = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Template Management' }]

  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmTopic, setConfirmTopic] = useState('')
  const [notificationName, setNotificationName] = useState([])
  const [templateArrayList, setTemplateList] = useState([])
  const [domainListAry, setDomainListAry] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    getTemplateList()
  }, [])

  const editPages = _id => {
    history.push('/edit-topic/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getTemplateList = () => {
    setLoader(true)
    let params = {
      limit: 10,
      LastEvaluatedKey: 'null'
    }
    templateList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setTemplateList(data.data.Items)
      }
    })
  }

  const handleDeleteTemplate = () => {
    let params = {
      notificationName: notificationName
    }
    handleClose()
    setLoader(true)
    deleteTemplate(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        toast.success(data.message)
        getTemplateList()
      } else {
        toast.error(data.message)
      }
    })
  }

  const handleClose = () => {
    setConfirmModal(false)
    setConfirmTopic('')
  }

  // all handler end
  return (
    <div className='page_wrapper'>
      <Modal show={confirmModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-center'>
            Are you sure you want to delete this Template?
          </p>
          <div className='d-flex justify-content-center pb-4'>
            <button
              onClick={handleClose}
              className='btn btn-dark btn-sm pl-5 pr-5'
            >
              No
            </button>
            <button
              onClick={handleDeleteTemplate}
              className='btn btn-danger btn-sm ml-3 pl-5 pr-5'
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* <div className="search_bar">
                <i className="fa fa-search" />
                <input type="text" className="form-control" placeholder="Search Topic" value={search} name="search" onChange={handlerOnChange} />
            </div> */}

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>Template Management</h2>
        <Link to='/add-topic' className='btn btn-primary btn-sm'>
          Add Topic
        </Link>
      </div>
      <div className='twocol sb page_header'>
        <div className='headerinner left'></div>
      </div>

      <div className='table-responsive cm_card p-0'>
        {loader ? (
          <Loader />
        ) : (
          <table className='table  table-bordered user-table table-hover align-items-center'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <span className='t_min_w'>Notification Name </span>
                </th>
                <th>
                  <span className='t_min_w'>Title</span>
                </th>
                <th align='center'> Body</th>
                <th>Image</th>
                <th>Message</th>
                <th>Composed</th>
                <th>Sound</th>
                <th>Event</th>
                <th>Event Type</th>
              </tr>
            </thead>
            <tbody>
              {templateArrayList.length ? (
                templateArrayList?.map((item, i) => (
                  <tr key={i}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <span className=''>{item.notificationName}</span>
                    </td>
                    <td>
                      <span className=''>{item.title}</span>
                    </td>

                    <td>
                      <span className=''>{item.body}</span>
                    </td>
                    <td>
                      <img
                        src={item.image}
                        alt='Avatar'
                        className='user-avatar high'
                      />
                    </td>
                    <td>
                      <span className=''>{item.message}</span>
                    </td>
                    <td>
                      <span className=''>{item.composed}</span>
                    </td>
                    <td>
                      <span className=''>{item.sound}</span>
                    </td>
                    <td>
                      <span className=''>{item.event}</span>
                    </td>
                    <td>
                      <span className=''>{item.event_type}</span>
                    </td>
                    <td>
                      <div className='action'>
                        <span onClick={() => editPages(item.notificationName)}>
                          <i className='fas fa-edit'></i>
                        </span>

                        <span
                          onClick={() => (
                            setConfirmModal(true),
                            setNotificationName(item.notificationName)
                          )}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8'>
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

      {templateArrayList.length ? (
        <div className='text-center'>
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={count}
            onChange={e => handlePageChange(e)}
          />
        </div>
      ) : (
        ''
      )}

      <ToastContainer />
    </div>
  )
}

export default TopicManagement
