import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../../components/common/Breadcrumb'
import { cardOccasionList, deleteCardOccasion } from '../../../services/ApiCardOccasion'
import { resHandle } from '../../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../../components/common/loader'



const OccasionCard = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Card Occasion Management' }]

  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [cardName, setCardName] = useState([])
  const [cardList, setCardList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    getOccasionCardList()
  }, [])

  const editPages = _id => {
    history.push('/card/occasions/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getOccasionCardList = () => {
    setLoader(true)
    let params = {
      limit: 100,
      LastEvaluatedKey: 'null',
    }
    cardOccasionList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setCardList(data.cardList)
      }
    }).catch((err) => {
      setLoader(false)
      setCardList([])
    });
  }

  const handleDeleteCardOccasion = () => {
    let params = {
      cardName: cardName,
      cardIdentifier: "cardIdentifier"
    }
    handleClose();
    setLoader(true);
    deleteCardOccasion(params).then(res => {
      setLoader(false)
      let { status, data } = resHandle(res)
      if (status === 200) {
        toast.success(data.message)
        getOccasionCardList()
      } else {
        toast.error(data.message)
      }
    }).catch((err) => {
      setLoader(false)
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
            Are you sure you want to delete this card occasion?
          </p>
          <div className='d-flex justify-content-center pb-4'>
            <button
              onClick={handleClose}
              className='btn btn-dark btn-sm pl-5 pr-5'
            >
              No
            </button>
            <button
              onClick={handleDeleteCardOccasion}
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
        <h2>Card Occasion Management</h2>
        <Link to='/card/occasions/create' className='btn btn-primary btn-sm'>
          Add Card Occasion
        </Link>
      </div>
      <div className='twocol sb page_header'>
        <div className='headerinner left'></div>
      </div>

      <div className='table-responsive cm_card p-0'>
        {loader ? (
          <Loader />
        ) : (
          <table className='table tablecollapse table-bordered user-table table-hover align-items-center' style={{ "tableLayout": "fixed" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Card Name</th>
                <th>Heading</th>
                <th>Content</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cardList.length ? (
                cardList?.map((item, i) => (
                  <tr key={i}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <span className=''>{item.cardName}</span>
                    </td>
                    <td className="text-wrap">
                      <span style={{
                        color: item?.heading?.textColor,
                        transition: "ease all 500ms",
                        height: '10px'
                      }}>{item?.heading?.text}</span>
                    </td>

                    <td className="text-wrap">
                      <span style={{
                        color: item?.content?.textColor,
                        transition: "ease all 500ms",
                        height: '10px'
                      }}> {item?.content?.text}</span>

                    </td>

                    <td>
                      {item.status == "true" || item.status == true ? "Activated" : "Deactivated"}
                    </td>

                    <td>
                      <div className='action'>
                        <span onClick={() => editPages(item.cardName)}>
                          <i className='fas fa-edit'></i>
                        </span>

                        <span
                          onClick={() => (
                            setConfirmModal(true),
                            setCardName(item.cardName)
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

      {cardList.length ? (
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
export default OccasionCard