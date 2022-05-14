import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../components/common/Breadcrumb";
import { couponList } from "../../services/ApiVoucher";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import moment from "moment";

const Coupons = () => {
  const history = useHistory()
  const { id } = useParams();
  const breadcrumb = [{ link: '/voucher', linkText: 'Voucher Management' }, { link: '', linkText: 'Coupon Management' }]
  const [couponVoucherId, setCouponVoucherId] = useState([]);
  const [productName, setProductName] = useState([])
  const [couponArrList, setCouponList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [count, setCount] = useState(21)
  const [loader, setLoader] = useState(false)
  const [pk, setPK] = useState(null)
  const [couponVoucherIdPage, setcouponVoucherIdPage] = useState(null)
  const [pageState, setPageState] = useState([{ page: 1, pk: null, couponVoucherId: null }])
  // all handler start
  useEffect(() => {
    getCouponList(id)

  }, [])

  const editPages = _id => {
    history.push('/coupon/edit/' + _id)
  }
  const handlePageChange = pageNumber => {
    debugger;
    console.log(`active page is ${pageNumber}`)
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter(item => item.page == pageno)
    if (data.length == 0) {
      setPage(pageno);
      arr.push({ page: pageno, pk: pk, couponVoucherId: couponVoucherIdPage });
      setPageState([...arr]);
      setCount(count + limit)
    } else {
      setPage(pageno);
      setPK(data[0].pk)
      setcouponVoucherIdPage(data[0].couponVoucherId)
    }


    getCouponList(id);
  }
  const getCouponList = (id) => {
    setLoader(true)
    let params = {
      limit: limit,
      LastEvaluatedKey: 'null',
      productName: id,
      pk: pk,
      couponVoucherId: couponVoucherIdPage

    }
    couponList(params).then(res => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        debugger;
        setLoader(false)
        setCouponList([...data.data.Items])
        if (data.data.LastEvaluatedKey && (Object.keys(data.data.LastEvaluatedKey).length > 0)) {
          setPK(data.data.LastEvaluatedKey.pk);
          setcouponVoucherIdPage(data.data.LastEvaluatedKey.couponVoucherId)
        }
        if (data.data.Items.length == 0) {
          setCount(count - limit);
        }
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
                  <td colSpan='7'>
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


      <div className='text-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={limit}
          totalItemsCount={count}
          onChange={e => handlePageChange(e)}
        />
      </div>


      <ToastContainer />
    </div>
  )
}
export default Coupons
