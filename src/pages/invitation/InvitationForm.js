import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { sendInvitation } from '../../services/ApiServices';
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../components/common/loader'
import copy from "copy-to-clipboard";

const InvitationForm = () => {
  const history = useHistory();


  const [country, setCountry] = useState("");
  const [countryErr, setCountryErr] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastName, setLastName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState(false);



  const breadcrumb = [
    { link: "", linkText: 'Invitation Form' },
  ];


  const copyToClipboard = () => {
    copy(invitationCode);
    alert(`You have copied "${invitationCode}"`);
  }



  const mobileNoRegEx = /^[0-9]{10}$/;
  const handleValidate = () => {
    let validate = true;

    if (!country.replace(/\s+/g, "")) {
      setCountryErr("Country code is required");
      validate = false;
    } else {
      setCountryErr("")
    }

    if (!mobileNo.replace(/\s+/g, "")) {
      setMobileNoErr("Mobile no is required");
      validate = false;
    } else if (!mobileNoRegEx.test(mobileNo)) {
      setMobileNoErr("Invalid mobile no")
      validate = false
    } else {
      setMobileNoErr("");
    }

    return validate;
  };





  const handleSubmit = e => {
    e.preventDefault()
    setInvitationCode("");
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        phone: mobileNo,
        dialCode: country,
        firstName: firstName,
        lastName: lastName
      };
      sendInvitation(obj).then((res) => {
        setIsSubmit(false);
        let { status, data } = resHandle(res);
        if (status === 200) {
          setInvitationCode(data.data.pk)
          toast.success("Invitation code has been sent successfully");
          setCountry("");
          setMobileNo("");
          setFirstName("");
          setLastName("");
        } else {
          toast.success(data.message);
        }
      }).catch((err) => {
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
      });

    }

  };








  // All function End

  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Invitation Form</h2>

      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          {invitationCode !== "" && (
            <div className="alert alert-primary text-center"> Invitation code has been sent successfully. Your invitation Code is <span style={{ color: "red" }}> {invitationCode} </span><i class="fas fa-copy" style={{ cursor: 'pointer' }} title="Copy invitation code" onClick={copyToClipboard} ></i></div>
          )}
          <div className="form-group row">
            <div className="col">
              <label>Country</label>
              <select
                className="form-control"
                name="cars"
                value={country}
                onChange={(e) => (
                  setCountry(e.target.value),
                  setCountryErr("")
                )}
              >
                <option value="" disabled>Select Country Code</option>
                <option value="91">India</option>
                <option value="977">Nepal</option>
              </select>

              {countryErr ? (
                <div className="inlineerror">{countryErr} </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <label>Mobile No</label>
              <input
                type="number"
                className="form-control"
                value={mobileNo}
                name="content"
                onChange={(e) => (
                  setMobileNo(e.target.value), setMobileNoErr("")
                )}
              />

              {mobileNoErr && (
                <div className="inlineerror">{mobileNoErr} </div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                name="content"
                onChange={(e) => (
                  setFirstName(e.target.value)
                )}
              />


            </div>
            <div className="col">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                name="content"
                onChange={(e) => (
                  setLastName(e.target.value)
                )}
              />

            </div>
          </div>




          <div className="button300">

            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleSubmit}
              disabled={isSubmit ? 'disabled' : ''}
            >
              {isSubmit ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
                : ('')
              }
              {isSubmit ? ' Sending..' : 'Send'}

            </button>

          </div>
        </form>

      )}
      <ToastContainer />
    </div>
  );

}
export default InvitationForm