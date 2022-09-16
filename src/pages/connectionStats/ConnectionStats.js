import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import { connectionStats } from '../../services/ApiServices';
import { resHandle } from "../../components/util/utils";
import moment from 'moment'


const ConnectionStats = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Connection Stats" }];
  const [connectionStatsList, setConnectionStatsList] = useState({});
  const [subList, setSubList] = useState({});
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [month, setMonth] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [monthErr, setMonthErr] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState("");





  const handleValidate = () => {
    let validate = true;

    if (!date.replace(/\s+/g, "")) {
      setDateErr("Date is required");
      validate = false;
    } else {
      let dt = moment(date);
      let ck = dt.isValid();
      if (ck) {
        setDateErr("");
      } else {
        setDateErr("Invalid date format ('DD-MM-YYYY')");
        validate = false
      }

    }

    return validate;
  };

  const handleMonthValidation = () => {
    let validate = true;
    if (!month.replace(/\s+/g, "")) {
      setMonthErr("");
      validate = false;
    } else {
      setMonthErr("");
    }
    return validate;
  };

  const getList = (type) => {
    setIsShow(true);
    if (type == 'date') {
      setMonth("");
      setTitle("Date")
      if (handleValidate()) {
        getConnectionList("date=" + date, "date");
      }
    } else {
      setDate("");
      setTitle("Month")
      if (handleMonthValidation()) {
        getConnectionList("month=" + month, "month");
      }
    }

  }

  const getConnectionList = (params, type) => {
    setLoader(true);
    params += "&week=";
    connectionStats(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false);
        setConnectionStatsList(data.data.lastWeek);
        setSubList(data.data[type]);
      } else {
        setLoader(false)
        setConnectionStatsList({})
        setSubList({});
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    }).catch((err) => {
      setLoader(false)
      setConnectionStatsList({})
      setSubList({});
      if (err.response.status !== 400) {
        toast.error("Sorry, a technical error occurred! Please try again later")
      }
    });

  }

  return (
    <div className="page_wrapper">

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header mr-3">
        <h2>Connection Stats</h2>
      </div>
      <div id="main">

        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                  aria-expanded="true" aria-controls="faq1">Search By Date</a>
              </div>

              <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Select Date :</label>
                      <input
                        type='date'
                        className="form-control"
                        name="date"
                        value={date}
                        onChange={(e) => (
                          setDate(e.target.value), setDateErr("")
                        )}
                      />
                      {dateErr && (
                        <div className="inlineerror">{dateErr} </div>
                      )}

                    </div>

                    <div className="col-4 mt-4 pt-3">
                      <button className="btn btn-primary" onClick={() => getList('date')}>Search</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="faqhead2">
                <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2"
                  aria-expanded="true" aria-controls="faq2">Search By Month</a>
              </div>

              <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                <div className="card-body">
                  <div className="form-group  row mb-4">

                    <div className="col-6">
                      <label>Select Month :</label>
                      <input
                        type='month'
                        className="form-control"
                        name="month"
                        value={month}
                        onChange={(e) => (
                          setMonth(e.target.value),
                          setMonthErr("")
                        )
                        }
                      />
                      {monthErr && (
                        <div className="inlineerror">{monthErr} </div>
                      )}

                    </div>
                    <div className="col-6 mt-4 pt-3">
                      <button className="btn btn-primary" onClick={() => getList('month')}>Search</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {isShow && (
        <>
          <div className="card mt-5 mb-3">
            <div className="card-header title">
              {title}
            </div>
          </div>

          <div className="table-responsive cm_card p-0">

            {loader ? (
              <Loader />
            ) : (
              <>

                <table className="table table-bordered user-table table-hover align-items-center table-fixed tablecollapse"  >
                  <thead>
                    <tr>

                      <th>Sent</th>
                      <th>Initiative</th>
                      <th>Accept</th>
                      <th>Expire</th>
                      <th>Delete</th>
                      <th>Reject</th>
                      <th>Total</th>


                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{subList['sent']}</td>
                      <td>{subList['initiative']}</td>
                      <td>{subList['accept']}</td>
                      <td>{subList['expire']}</td>
                      <td>{subList['delete']}</td>
                      <td>{subList['reject']}</td>
                      <td>{subList['total']}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>


          <div className="card mt-5 mb-3">
            <div className="card-header title">
              Last Week Transactions
            </div>
          </div>

          <div className="table-responsive cm_card p-0">

            {loader ? (
              <Loader />
            ) : (
              <>

                <table className="table table-bordered user-table table-hover align-items-center table-fixed tablecollapse"  >
                  <thead>
                    <tr>

                      <th>Date</th>
                      <th>Sent</th>
                      <th>Initiative</th>
                      <th>Accept</th>
                      <th>Expire</th>
                      <th>Delete</th>
                      <th>Reject</th>
                      <th>Total</th>


                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(connectionStatsList).length > 0 ? (
                      Object.keys(connectionStatsList)?.map((item, i) => (

                        <tr key={i}>
                          <td>{moment(item).format("DD, MMM YYYY")}</td>
                          <td>{connectionStatsList[item]['sent']}</td>
                          <td>{connectionStatsList[item]['initiative']}</td>
                          <td>{connectionStatsList[item]['accept']}</td>
                          <td>{connectionStatsList[item]['expire']}</td>
                          <td>{connectionStatsList[item]['delete']}</td>
                          <td>{connectionStatsList[item]['reject']}</td>
                          <td>{connectionStatsList[item]['total']}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          <div className="nodatafound">
                            <h3>No Data Found</h3>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>

          <br />
        </>
      )}

      <ToastContainer />
    </div >
  );
};

export default ConnectionStats;
