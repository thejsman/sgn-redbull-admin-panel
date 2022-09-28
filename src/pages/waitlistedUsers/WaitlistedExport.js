import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { waitlistedExport } from "../../services/ApiServices";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import { sendInvitation } from '../../services/ApiServices';
import moment from 'moment'


const WaitlistedExport = () => {
  const breadcrumb = [{ link: "", linkText: "Waitlisted Users" }];
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [endDateErr, setEndDateErr] = useState(null);
  const [dateErr, setDateErr] = useState("");
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [msg, setMsg] = useState('')


  const handleValidate = () => {
    let validate = true;
    if (!startDate.replace(/\s+/g, "")) {
      setDateErr("Date is required");
      validate = false;
    } else {
      let dt = moment(startDate);
      let ck = dt.isValid();
      if (ck) {
        setDateErr("");
      } else {
        setDateErr("Invalid start date format ('DD-MM-YYYY')");
        validate = false
      }
    }
    const validateEmails = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    if (email == '') {
      setEmailErr('Email is required');
      validate = false
    } else if (!validateEmails.test(email)) {
      setEmailErr('Please enter a valid email');
      validate = false
    } else {
      setEmailErr('');
    }



    return validate;
  };

  const getListByDate = () => {
    if (handleValidate()) {
      setLoader(true);
      let params = `startDate=` + startDate;
      if (endDate) {
        params += "&endDate=" + endDate;
      }
      params += "&email=" + email;
      waitlistedExport(params).then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          setMsg(data);

        } else {
          setLoader(false)
          toast.error("Sorry, a technical error occurred! Please try again later")
        }
      }).catch((err) => {
        setLoader(false)
        if (err.response.status !== 400) {
          toast.error("Sorry, a technical error occurred! Please try again later")
        }
      });

    }

  };




  return (
    <div className="page_wrapper">

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header mr-3">
        <h2>Waitlisted Users</h2>
      </div>
      <div id="main">

        <div className="container">
          <div className="accordion" id="faq">
            <div className="card">
              <div className="card-header" id="faqhead1">
                <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                  aria-expanded="true" aria-controls="faq1">By Date</a>
              </div>

              <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                <div className="card-body">
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Email :</label>
                      <input
                        type='text'
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => (
                          setEmail(e.target.value), setEmailErr("")
                        )}
                      />
                      {emailErr && (
                        <div className="inlineerror">{emailErr} </div>
                      )}

                    </div>


                  </div>
                  <div className="form-group row">
                    <div className="col-4">
                      <label>Start Date :</label>
                      <input
                        type='date'
                        className="form-control"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => (
                          setStartDate(e.target.value), setDateErr("")
                        )}
                      />
                      {dateErr && (
                        <div className="inlineerror">{dateErr} </div>
                      )}

                    </div>
                    <div className="col-4">
                      <label>End Date :</label>
                      <input
                        type='date'
                        className="form-control"
                        name="date"
                        value={endDate}
                        onChange={(e) => (
                          setendDate(e.target.value), setEndDateErr("")
                        )}
                      />
                      {endDateErr && (
                        <div className="inlineerror">{endDateErr} </div>
                      )}

                    </div>
                    <div className="col-4 mt-4 pt-3">
                      <button className="btn btn-primary" onClick={getListByDate}>Export</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>





      <div className="pt-3">

        {loader ? (
          <Loader />
        ) : (
          <>
            {msg && (
              <div className="alert alert-success">{msg}</div>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </div >
  );
};

export default WaitlistedExport;
