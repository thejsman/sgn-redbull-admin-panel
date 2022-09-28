import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../components/common/Breadcrumb";
import { couponList } from "../../services/ApiVoucher";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import { updateVoucher } from "../../services/ApiVoucher";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const Coupons = () => {
  const history = useHistory()
  const { id } = useParams();
  const breadcrumb = [{ link: '/voucher', linkText: 'Voucher Management' }, { link: '', linkText: 'Coupon List' }]
  const [couponVoucherId, setCouponVoucherId] = useState([]);
  const [productName, setProductName] = useState('')
  const [voucherStatus, setVoucherStatus] = useState('')
  const [couponArrList, setCouponList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [count, setCount] = useState(21)
  const [loader, setLoader] = useState(false)
  const [pk, setPK] = useState(null)
  const [couponVoucherIdPage, setcouponVoucherIdPage] = useState(null)
  const [pageState, setPageState] = useState([{ page: 1, pk: null, couponVoucherId: null }])
  const [isSubmit, setIsSubmit] = useState(false);
  // all handler start
  useEffect(() => {
    setProductName(id);
    getCouponList(id, null, null, page)

  }, [])

  const editPages = _id => {
    history.push('/coupon/edit/' + _id)
  }

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
    let pageno = parseInt(pageNumber);
    let arr = pageState;
    let data = arr.filter(item => item.page == pageno)
    if (data.length == 0) {
      setPage(pageno);
      if (couponVoucherIdPage !== null) {
        arr.push({ page: pageno, pk: pk, couponVoucherId: couponVoucherIdPage });
        setPageState([...arr]);
        let totCount = count + limit;
        setCount(totCount)
        getCouponList(id, pk, couponVoucherIdPage, pageno);
      } else {
        setCouponList([...[]])
      }
    } else {

      setPage(pageno);
      // setPK(data[0].pk)
      // setcouponVoucherIdPage(data[0].couponVoucherId)
      getCouponList(id, data[0].pk, data[0].couponVoucherId, data[0].page);

    }
  }

  const updateVoucherStatus = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let createObj = {
      productName,
      voucherStatus: (voucherStatus == "notArchived" ? "Archived" : "notArchived")
    };
    console.log("createObj---", createObj);
    updateVoucher(createObj)
      .then((res) => {
        let { status, data } = resHandle(res);
        console.log('ddddddddddddddd', data)
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          setVoucherStatus(data.data.Attributes.voucherStatus);
          history.push("/coupons/" + productName);
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => {
        setIsSubmit(false);
        toast.error(
          "Sorry, a technical error occurred! Please try again later"
        );
      });

  }

  const getCouponList = (id, pkvalue, couponVoucherIdValue, nextPage) => {
    setLoader(true)
    let params = {
      limit: limit,
      LastEvaluatedKey: 'null',
      productName: id,
      pk: pkvalue,
      couponVoucherId: couponVoucherIdValue

    }
    couponList(params).then((res) => {
      let { status, data } = resHandle(res)
      if (status === 200) {
        setLoader(false)
        setCouponList([...data.data.Items])
        if (data.data.Items.length > 0) {
          setVoucherStatus(data.data.Items[0].voucherStatus);
        }
        if (data.data.LastEvaluatedKey && (Object.keys(data.data.LastEvaluatedKey).length > 0)) {
          let arr = pageState;
          if (arr.findIndex(item => item.page == (nextPage + 1)) == -1) {
            setPK(data.data.LastEvaluatedKey.pk);
            setcouponVoucherIdPage(data.data.LastEvaluatedKey.couponVoucherId)
          }

        }
        if (data.data.Items.length == 0 || !data.data.LastEvaluatedKey) {
          setcouponVoucherIdPage(null)
          //let pageCount = count - limit
          //setCount(pageCount);
          // // let pageCount = count - limit
          // // setCount(pageCount);
          // console.log(count, 'cccccccccccccccccc');
        }
      } else {
        toast.error("Sorry, a technical error occurred! Please try again later")
        setLoader(false)
        setCouponList([])
      }
    }).catch((err) => {
      toast.error("Sorry, a technical error occurred! Please try again later")
      setLoader(false)
      setCouponList([])
    })
  }





  // all handler end
  return (
    <div className='page_wrapper'>

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className='twocol sb page_header'>
        <h2>Coupon List</h2>

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
            </div>
          </div>
          <div className='row'>

            <div className='col'>
              <span ml-5>Variant Id : </span> <span className='color-primary'>{couponArrList[0]?.variantId}</span>
            </div>
          </div>
          <div className='row'>

            <div className='col'>
              <span>Voucher Status : </span> <span className='color-primary'>{voucherStatus}</span>
            </div>
          </div>
          <div className='row'>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-sm mr-2"
                onClick={updateVoucherStatus}
                disabled={isSubmit ? "disabled" : ""}
              >
                {isSubmit ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                {isSubmit ? " Processing.." : (voucherStatus == "notArchived" ? "Archived" : "Unarchived")}
              </button>
              {/* <button className="btn btn-primary btn-sm mr-2">{voucherStatus == "notArchived" ? "Archived" : "Unarchived"}</button> */}

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
