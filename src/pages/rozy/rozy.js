import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import { deleteRozy, rozyList } from '../../services/ApiRozy'
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import { Composite } from 'react-composite';



const Rozy = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Rozy Management' }]

  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [relationshipName, setRelationshipName] = useState([])
  const [rozyArrayList, setRozyArrayList] = useState([])
  const [displayOrder, setDisplayOrder] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    getRozyList()
  }, [])

  const editPages = _id => {
    history.push('/rozy/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getRozyList = () => {
    setLoader(true)
    let params = {
      limit: 100,

    }
    rozyList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        let rozyData = JSON.parse(data.message)
        rozyData = rozyData.reduce((result, item) => {
          if (result[item.sectionName] == undefined)
            result[item.sectionName] = { section: item.sectionName, languages: [item.sectionLanguage], content: [{ key: item.sectionLanguage, value: item.content }] };
          else {
            result[item.sectionName]["languages"].push(item.sectionLanguage);
            result[item.sectionName]["content"].push({ key: item.sectionLanguage, value: item.content });
          }

          return result;
        }, {});
        rozyData = Object.values(rozyData);
        setRozyArrayList(rozyData);
      }
    })
  }

  // const handleDeleteRozy = () => {
  //   let params = {
  //     relationshipName: relationshipName,
  //     displayOrder: displayOrder

  //   }
  //   handleClose()
  //   setLoader(true)
  //   deleteFamilyRelationship(params).then(res => {
  //     getRozyList()
  //     let { status, data } = resHandle(res)
  //     if (status === 200) {
  //       setLoader(false)
  //       toast.success(data.message)
  //       getRozyList()
  //     } else {
  //       toast.error(data.message)
  //     }
  //   })
  // }

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
            Are you sure you want to delete this Rozy?
          </p>
          <div className='d-flex justify-content-center pb-4'>
            <button
              onClick={handleClose}
              className='btn btn-dark btn-sm pl-5 pr-5'
            >
              No
            </button>
            <button
              // onClick={handleDeleteRelationship}
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
        <h2>Rozy Management</h2>
        <Link to='/rozy/create' className='btn btn-primary btn-sm'>
          Add Rozy
        </Link>
      </div>
      <div className='twocol sb page_header'>
        <div className='headerinner left'></div>
      </div>

      <div className='table-responsive cm_card p-0'>
        {loader ? (
          <Loader />
        ) : (
          <table className='table  table-bordered user-table table-hover align-items-center tablecollapse'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <span className='t_min_w'>Section Name</span>
                </th>
                <th>
                  <span className='t_min_w'>Supported Language</span>
                </th>

                <th>Actions

                </th>
              </tr>
            </thead>
            <tbody>

              {rozyArrayList.length ? (
                rozyArrayList?.map((item, i) => (
                  <Composite>
                    <tr key={i}
                      data-toggle="collapse"
                      data-target={".multi-collapse" + i}
                      aria-controls={"multiCollapseEx" + i}
                    >
                      <td >{(page - 1) * limit + i + 1}  </td>
                      <td >
                        <span className=''>{item.section}</span>
                      </td>
                      <td>
                        <span className=''>{item.languages.join(", ")}</span>
                      </td>

                      <td>
                        <div className='action'>
                          <span onClick={() => editPages(item.section)}>
                            <i className='fas fa-edit'></i>
                          </span>

                          <span
                            onClick={() => (
                              setConfirmModal(true),
                              setRelationshipName(item.section)
                            )}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr key={"k" + i} className={"collapse multi-collapse" + i} id={"multiCollapseEx" + i}>
                      <td></td>
                      <td colSpan={3} className="is-breakable">

                        {item.content?.map((content, j) => (
                          <p>{content.key} : {content.value}</p>
                        )
                        )}

                      </td>

                    </tr>
                  </Composite>


                ))
              ) : (
                <tr key="notfound">
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

      {rozyArrayList.length ? (
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
export default Rozy