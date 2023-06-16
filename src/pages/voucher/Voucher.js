import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Breadcrumb from "../../components/common/Breadcrumb";
import { VoucherList } from "../../services/ApiVoucher";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import moment from "moment";

const Voucher = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Voucher Management" }];
  const [itemId, setItemId] = useState([]);
  const [variantId, setVariantId] = useState([]);
  const [productName, setProductName] = useState([]);
  const [voucherArrList, setVoucherList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(10);
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState("India");
  const [status, setStatus] = useState("notArchived");

  // all handler start
  useEffect(() => {
    // getVoucherList()
  }, []);

  const editPages = (_id) => {
    history.push("/voucher/edit/" + _id);
  };
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
  };
  const getVoucherList = () => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    setLoader(true);
    let params = {
      limit: 10000,
      LastEvaluatedKey: "null",
      sOrder: 1,
      eOrder: 5001,
      scanOrder: true,
      country: countryCode,
      voucherStatus: status,
    };
    VoucherList(params)
      .then((res) => {
        let { status, data } = resHandle(res);
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
                coupon: [
                  {
                    couponVoucherId: item.couponVoucherId,
                    coupon: item.coupon,
                    validTill: item.validTill,
                    status: item.status,
                    value: item.value,
                  },
                ],
              };
            else {
              result[item.productName]["coupon"].push({
                couponVoucherId: item.couponVoucherId,
                coupon: item.coupon,
                validTill: item.validTill,
                status: item.status,
                value: item.value,
              });
            }

            return result;
          }, {});

          Object.values(resData).forEach((result, index) => {
            let days = result.coupon.filter((value) => {
              return (
                (new Date(moment.unix(value.validTill)).getTime() -
                  currentDate.getTime()) /
                  (1000 * 3600 * 24) <
                6
              );
            });
            result["expiry"] = days;
          });

          console.log("resData", resData);
          setLoader(false);
          setVoucherList(Object.values(resData));
        }
      })
      .catch((err) => {
        setLoader(false);
        setVoucherList([]);
      });
  };

  // all handler end
  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Voucher Management</h2>
        <Link to="/voucher/create" className="btn btn-primary btn-sm">
          Add Voucher
        </Link>
      </div>
      <div id="main">
        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a
                  href="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#faq1"
                  aria-expanded="true"
                  aria-controls="faq1"
                >
                  Search
                </a>
              </div>

              <div
                id="faq1"
                className="collapse show"
                aria-labelledby="faqhead1"
                data-parent="#faq"
              >
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Country Code</label>
                      <select
                        className="form-control"
                        name="cars"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="India">India</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Web">Web</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <label>Voucher Status</label>
                      <select
                        className="form-control"
                        name="cars"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="notArchived">Not Archived</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="col-4 mt-4 pt-3">
                      <button
                        className="btn btn-primary"
                        onClick={getVoucherList}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive cm_card p-0">
        {loader ? (
          <Loader />
        ) : (
          <table className="table  table-bordered user-table table-hover align-items-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <span className="t_min_w">Product Name</span>
                </th>
                <th>
                  <span className="t_min_w">Item Id</span>
                </th>
                <th align="center">Varient Id</th>
                <th>No. of Coupons</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {voucherArrList.length ? (
                voucherArrList?.map((item, i) => (
                  <tr
                    key={i}
                    style={{ color: item.expiry.length > 0 ? "red" : "" }}
                  >
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <span
                        className="c-pointer color-primary"
                        style={{ color: item.expiry.length > 0 ? "red" : "" }}
                        onClick={() =>
                          history.push("/coupons/" + item.productName)
                        }
                      >
                        {item.productName}
                      </span>
                    </td>
                    <td>
                      <span className="">{item.itemId}</span>
                    </td>

                    <td>
                      <span className="">{item.variantId}</span>
                    </td>
                    <td>
                      <span
                        className="c-pointer color-primary"
                        style={{ color: item.expiry.length > 0 ? "red" : "" }}
                        onClick={() =>
                          history.push("/coupons/" + item.productName)
                        }
                      >
                        {item.coupon.length}
                      </span>
                    </td>
                    <td>{moment(item.createdAt).format("DD, MMM YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="nodatafound">
                      <h3>No Data Found</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {voucherArrList.length ? (
        <div className="text-center">
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={count}
            onChange={(e) => handlePageChange(e)}
          />
        </div>
      ) : (
        ""
      )}

      <ToastContainer />
    </div>
  );
};
export default Voucher;
