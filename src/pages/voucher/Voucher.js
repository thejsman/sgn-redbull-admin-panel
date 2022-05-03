import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Dropdown } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import Breadcrumb from '../../components/common/Breadcrumb'
import { VoucherList } from '../../services/ApiVoucher'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from '../../components/common/loader'
import moment from 'moment'


const Vocher = () => {
  const history = useHistory()
  const breadcrumb = [{ link: '', linkText: 'Voucher Management' }]
  const [itemId, setItemId] = useState([]);
  const [variantId, setVariantId] = useState([])
  const [productName, setProductName] = useState([])
  const [voucherArrList, setVoucherList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(10)
  const [loader, setLoader] = useState(false)

  // all handler start
  useEffect(() => {
    getVocherList()
  }, [])

  const editPages = _id => {
    history.push('/voucher/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
  }
  const getVocherList = () => {
    setLoader(true)
    let params = {
      limit: 100,
      LastEvaluatedKey: 'null',
      sOrder: 1,
      eOrder: 101,
      scanOrder: true
    }
    VoucherList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        let resData = data.data.Items;
        resData = resData.reduce((result, item) => {
          if (result[item.productName] == undefined)
            result[item.productName] = {
              productName: item.productName,
              createdAt: item.createdAt,
              itemId: item.itemId,
              variantId: item.variantId,
              pk: item.pk,
              coupon: [{ couponVoucherId: item.couponVoucherId, coupon: item.coupon, validTill: item.validTill, status: item.status, value: item.value }]
            };
          else {
            result[item.productName]["coupon"].push({ couponVoucherId: item.couponVoucherId, coupon: item.coupon, validTill: item.validTill, status: item.status, value: item.value });
          }

          return result;
        }, {});
        setLoader(false)
        setVoucherList(Object.values(resData))
      }
    })
  }





  // all handler end
  return (
    <div className='page_wrapper'>

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>Vocher Management</h2>
        <Link to='/voucher/create' className='btn btn-primary btn-sm'>
          Add Vocher
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
                  <span className='t_min_w'>Product Name</span>
                </th>
                <th>
                  <span className='t_min_w'>Item Id</span>
                </th>
                <th align='center'>Varient Id</th>
                <th>No. of Coupons</th>
                <th>Created At</th>

              </tr>
            </thead>
            <tbody>
              {voucherArrList.length ? (
                voucherArrList?.map((item, i) => (
                  <tr key={i}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <span className='c-pointer color-primary' onClick={() => history.push('/coupons/' + item.productName)}>
                        {item.productName}
                      </span>

                    </td>
                    <td>
                      <span className=''>{item.itemId}</span>
                    </td>

                    <td>
                      <span className=''>{item.variantId}</span>
                    </td>
                    <td>
                      <span className='c-pointer color-primary' onClick={() => history.push('/coupons/' + item.productName)}>
                        {item.coupon.length}
                      </span>


                    </td>
                    <td>
                      {moment(item.createdAt).format("DD, MMM YYYY")}
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

      {
        voucherArrList.length ? (
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
        )
      }

      <ToastContainer />
    </div >
  )
}
export default Vocher