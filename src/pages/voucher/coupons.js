import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { couponList } from '../../services/ApiVoucher'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import moment from 'moment'


const Coupons = () => {
  const history = useHistory()
  const { id } = useParams();
  const breadcrumb = [{ link: '/voucher', linkText: 'Voucher Management' }, { link: '', linkText: 'Coupon Management' }]
  const [couponVoucherId, setCouponVoucherId] = useState([]);
  const [productName, setProductName] = useState([])
  const [couponArrList, setCouponList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    debugger;
    getCouponList(id)
  }, [])

  const editPages = _id => {
    history.push('/coupon/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getCouponList = (id) => {
    setLoader(true)
    let params = {
      limit: 100,
      LastEvaluatedKey: 'null',
      productName: id

    }
    couponList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setCouponList(data.data.Items)
      }
    })
  }





  // all handler end
  return (
    <div className='page_wrapper'>

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>Coupon Management</h2>

      </div>
      <div className='twocol sb page_header'>
        <div className='headerinner left '>
          <div className='row'>
            <div className='col'>
              <span>Product Name : </span> <span className='color-primary'>{couponArrList[0]?.productName}</span>
            </div>

          </div>
          <div className='row'>

            <div className='col'>
              <span>Item Id : </span> <span className='color-primary'>{couponArrList[0]?.itemId}</span> &nbsp; &nbsp; &nbsp;
              <span ml-5>Variant Id : </span> <span className='color-primary'>{couponArrList[0]?.variantId}</span>
            </div>
          </div>

        </div>

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
                  coupon Voucher Id
                </th>
                <th>
                  coupon
                </th>

                <th>Value</th>
                <th>Status</th>
                <th>
                  Valid Till
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {couponArrList.length ? (
                couponArrList?.map((item, i) => (
                  <tr key={i}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      {item.couponVoucherId}
                    </td>
                    <td>
                      {item.coupon}
                    </td>


                    <td>
                      {item.value}
                    </td>
                    <td>
                      {item.status}
                    </td>
                    <td>
                      {moment.unix(item.validTill).format("DD, MMM YYYY")}
                    </td>
                    <td>
                      <div className='action'>
                        <span onClick={() => editPages(item.couponVoucherId)}>
                          <i className='fas fa-edit'></i>
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

      {couponArrList.length ? (
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
export default Coupons