import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { sendSmsManagement } from "../../services/ApiSMSManagement";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Loader } from "../../components/common/loader";

const SendSmsManagement = () => {
  const history = useHistory();
  const { id } = useParams();
  const [dialCode, setDialCode] = useState("977");
  const [dialCodeErr, setDialCodeErr] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdDateErr, setCreatedDateErr] = useState("");
  const [smsText, setSmsText] = useState("");
  const [smsTextErr, setSmsTextErr] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [mobileNumbers, setMobileNumbers] = useState("");

  const breadcrumb = [
    // { link: '/family-relationship', linkText: 'Family Relationship Management' },
    { link: "", linkText: "Send SMS Management" },
  ];

  const handleValidate = () => {
    let validate = true;
    if (!dialCode.replace(/\s+/g, "")) {
      setDialCodeErr("Country Code is required");
      validate = false;
    } else {
      setDialCodeErr("");
    }
    if (!createdDate.replace(/\s+/g, "")) {
      setCreatedDateErr("Date is required");
      validate = false;
    } else {
      setCreatedDateErr("");
    }
    if (!smsText) {
      setSmsTextErr("Sms Text is required");
      validate = false;
    } else {
      setSmsTextErr("");
    }

    return validate;
  };

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let createObj = {
        dialCode,
        createdDate,
        smsText,
      };
      // console.log("createObj---", createObj);
      sendSmsManagement(createObj)
        .then((res) => {
          let { status, data } = resHandle(res);
          setIsSubmit(false);
          if (status === 200) {
            setCreatedDate("");
            setSmsText("");
            toast.success(data.message);
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
  };

  // All function End

  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Send SMS</h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          <div className="form-group row">
            <div className="col">
              <label>Country Code</label>
              <select
                className="form-control"
                name="cars"
                value={dialCode}
                onChange={(e) => (
                  setDialCode(e.target.value), setDialCodeErr("")
                )}
              >
                <option value="NP">Nepal</option>
              </select>

              {dialCodeErr ? (
                <div className="inlineerror">{dialCodeErr} </div>
              ) : (
                ""
              )}
            </div>

            <div className="col">
              <label>Created Date</label>
              <input
                type="date"
                className="form-control"
                name="createdDate"
                value={createdDate}
                onChange={(e) => (
                  setCreatedDate(e.target.value), setCreatedDateErr("")
                )}
              />
              {createdDateErr && (
                <div className="inlineerror">{createdDateErr} </div>
              )}
            </div>
          </div>

          {/* <div className="form-group row">
            <div className="col">
              <label>Mobile numbers(comma seperated)</label>
              <textarea
                className="form-control"
                rows="5"
                cols="10"
                value={mobileNumbers}
                name="mobileNumbers"
                onChange={(e) => (
                  setMobileNumbers(e.target.value), setMobileNumbersErr("")
                )}
              ></textarea>
            </div>
          </div> */}
          <div className="form-group row">
            <div className="col">
              <label>SMS Text</label>
              <textarea
                className="form-control"
                rows="5"
                cols="10"
                value={smsText}
                name="smsText"
                onChange={(e) => (
                  setSmsText(e.target.value), setSmsTextErr("")
                )}
              ></textarea>
              {smsTextErr && <div className="inlineerror">{smsTextErr} </div>}
            </div>
          </div>
          <div className="button300">
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleSendSMS}
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
              {isSubmit ? " Sending.." : "Send"}
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default SendSmsManagement;
