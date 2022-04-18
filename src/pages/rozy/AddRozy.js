import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getRozyByName, createRozy } from '../../services/ApiRozy'
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../components/common/loader'

const AddRozy = () => {
  const history = useHistory();
  const { id } = useParams();

  const [sectionName, setSectionName] = useState("");
  const [sectionNameErr, setSectionNameErr] = useState("");
  const [sectionLanguage, setSectionLanguage] = useState("english");
  const [sectionLanguageErr, setSectionLanguageErr] = useState("");
  const [content, setContent] = useState("");
  const [contentErr, setContentErr] = useState("");
  // const [occasionStatus, setOccasionStatus] = useState(true);
  // const [occasionStatusErr, setOccasionStatusErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const [isAddOccasion, setIsAddOccasion] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState(false)

  const breadcrumb = [
    { link: "/rozy", linkText: "Rozy Management" },
    { link: "", linkText: "Add Rozy" },
  ];


  const albhaRegEx = /^[a-zA-z]+$/;
  const handleValidate = () => {
    let validate = true;

    if (!sectionName.replace(/\s+/g, "")) {
      setSectionNameErr("Section name is required");
      validate = false;
    } else if (!albhaRegEx.test(sectionName)) {
      setSectionNameErr("only alphabets are allowed")
      validate = false
    } else {
      setSectionNameErr("")
    }
    if (!sectionLanguage.replace(/\s+/g, "")) {
      setSectionLanguageErr("Section Language is required");
      validate = false;
    } else {
      setSectionLanguageErr("");
    }

    if (!content.replace(/\s+/g, "")) {
      setContentErr("Content is required");
      validate = false;
    } else {
      setContentErr("");
    }
    return validate;
  };

  // const handleGetOccasionById = (id) => {
  //   setLoader(true);
  //   let params = {
  //     occasionName: id,
  //   };
  //   getOccasionByName(params).then((res) => {
  //     let { status, data } = resHandle(res);
  //     console.log(status, data, "datadatadatadatadata");
  //     setLoader(false);
  //     if (status === 200) {
  //       setOccasionName(data.occasionName);
  //       setOccasionTitle(data.displayTitle);
  //       setOccasionIcon(data.occasionIcon);
  //       setOccasionStatus(data.occasionStatus);
  //       setOccasionOrder(data.displayOrder);
  //       setOccasionDesc(data.occasionDescription);
  //       setBase64(data.occasionIcon);
  //     } else {
  //     }
  //   });
  // };
  // const handleUpdateOccasion = (e) => {
  //   e.preventDefault();
  //   if (handleValidate()) {
  //     setIsSubmit(true);
  //     let createOccasionObj = {
  //       "occasionIdentifier": "occasion",
  //       occasionName: occasionName.toLowerCase(),
  //       data: {
  //         displayTitle: occasionTitle,
  //         displayOrder: parseInt(occasionOrder),
  //         occasionDescription: occasionDesc,
  //         occasionStatus: occasionStatus,
  //       },
  //     };

  //     if (editImage) {
  //       createOccasionObj.data['occasionIcon'] = base64;
  //     }
  //     console.log("createOccasionObj---", createOccasionObj);
  //     createOccasion(createOccasionObj).then((res) => {
  //       let { status, data } = resHandle(res);
  //       setIsSubmit(false);
  //       if (status === 200) {
  //         toast.success(data.message);
  //         history.push("/occasion-management/occasion");
  //       } else {
  //         toast.success(data.message);
  //       }
  //     });
  //   }
  // };


  // useEffect(() => {
  //   console.log();
  //   if (window.location.pathname == "/occasion/create") {
  //     setIsAddOccasion(true);
  //   }
  //   if (window.location.pathname !== "/occasion/create") {
  //     handleGetOccasionById(id);
  //   }
  // }, []);

  const handleCreateRozy = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        sectionName,
        sectionLanguage,
        content
      };
      console.log("createObj---", obj);
      createRozy(obj).then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/rozy");
        } else {
          toast.success(data.message);
        }
      });
    }
  };

  // All function End

  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Add Rozy</h2>

      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          <div className="form-group row">
            <div className="col">
              <label>Section Name</label>
              <input
                type="text"
                className="form-control"
                value={sectionName}
                name="topicName"
                onChange={(e) => (
                  setSectionName(e.target.value), setSectionNameErr("")
                )}
              />
              {sectionNameErr ? (
                <div className="inlineerror">{sectionNameErr} </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <label>Section Language</label>
              <select
                className="form-control"
                name="cars"
                value={sectionLanguage}
                onChange={(e) => (
                  setSectionLanguage(e.target.value), setSectionLanguageErr("")
                )}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="nepali">Nepali</option>
              </select>

              {sectionLanguageErr && (
                <div className="inlineerror">{sectionLanguageErr} </div>
              )}
            </div>
          </div>


          <div className="form-group row">
            <div className="col">
              <label>Content</label>
              <textarea
                className="form-control"
                rows="5" cols="10"
                value={content}
                name="content"
                onChange={(e) => (
                  setContent(e.target.value), setContentErr("")
                )} ></textarea>
              {/* <input
                type="text"
                className="form-control"
                value={content}
                name="content"
                onChange={(e) => (
                  setContent(e.target.value), setContentErr("")
                )}
              /> */}
              {contentErr && (
                <div className="inlineerror">{contentErr} </div>
              )}
            </div>
          </div>

          <div className="button300">

            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleCreateRozy}
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
              {isSubmit ? ' Submitting..' : 'Create'}

            </button>

          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddRozy;
