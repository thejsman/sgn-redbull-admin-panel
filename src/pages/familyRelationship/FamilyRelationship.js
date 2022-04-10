import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'


const FamilyRelationManagement = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Family Relation Management' }]
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
   
  }, [])


  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }



  const handleClose = () => {

  }

  // all handler end
  return (
    <div className='page_wrapper'>
   
     
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>Family Relationship Management</h2>
        <Link to='/family-relationship/create' className='btn btn-primary btn-sm'>
          Add Family Relationship
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
                  <span className='t_min_w'>Relationship Name </span>
                </th>
                <th>
                  <span className='t_min_w'>Display Name</span>
                </th>
                <th>Icon</th>
                <th>Status</th>
                <th>Created On</th>
              
              </tr>
            </thead>
            <tbody>
            <td>S.No</td>
                <td>
                    Mother
                </td>
                <td>
                  Mother
                </td>
                <td><img src="../bluelogo.svg" /></td>
                <td>Active</td>
                <td>12 Jan 2022</td>
            </tbody>
          </table>
        )}
      </div>

      {/* {templateArrayList.length ? (
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
      )} */}

      <ToastContainer />
    </div>
  )
}

export default FamilyRelationManagement
