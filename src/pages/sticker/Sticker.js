import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { deleteSticker, StickerList } from '../../services/ApiStickerService'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'


const Sticker = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Sticker Management' }]

  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [stickerName, setStickerName] = useState([])
  const [stickerArrayList, setStickerArrayList] = useState([])
  const [displayOrder, setDisplayOrder] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    getStickerList()
  }, [])

  const editPages = _id => {
    history.push('/sticker/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getStickerList = () => {
    setLoader(true)
    StickerList().then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setStickerArrayList(data.stickerList)
      }
    }).catch((err) => {
      setLoader(false);
      setStickerArrayList([])
    });
  }

  const handleDeleteSticker = () => {
    let params = {
      stickerName: stickerName,
    }
    handleClose()
    setLoader(true)
    deleteSticker(params).then(res => {
      getStickerList()
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        toast.success(data.message)
        getStickerList()
      } else {
        toast.error(data.message)
      }
    }).catch((err) => {
      setLoader(false);
      toast.error("Sorry, a technical error occurred! Please try again later")
    });
  }

  const handleClose = () => {
    setConfirmModal(false)
    setConfirmMsg('')
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
            Are you sure you want to delete this Sticker?
          </p>
          <div className='d-flex justify-content-center pb-4'>
            <button
              onClick={handleClose}
              className='btn btn-dark btn-sm pl-5 pr-5'
            >
              No
            </button>
            <button
              onClick={handleDeleteSticker}
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
        <h2>Sticker Management</h2>
        <Link to='/sticker/create' className='btn btn-primary btn-sm'>
          Add Sticker Management
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
                  <span className='t_min_w'>Sticker Name</span>
                </th>
                <th>
                  <span className='t_min_w'>Display Name</span>
                </th>
                <th align='center'> Order</th>
                <th>Icon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stickerArrayList.length ? (
                stickerArrayList?.map((item, i) => (
                  <tr key={i}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <span className=''>{item.stickerName}</span>
                    </td>
                    <td>
                      <span className=''>{item.displayName}</span>
                    </td>

                    <td>
                      <span className=''>{item.displayOrder}</span>
                    </td>
                    <td>
                      <img
                        src={item.icon}
                        alt='Avatar'
                        className='user-avatar high'
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>
                      <div className='action'>
                        <span onClick={() => editPages(item.stickerName)}>
                          <i className='fas fa-edit'></i>
                        </span>

                        <span
                          onClick={() => (
                            setConfirmModal(true),
                            setStickerName(item.stickerName),
                            setDisplayOrder(item.displayOrder)
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

      {stickerArrayList.length ? (
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
export default Sticker