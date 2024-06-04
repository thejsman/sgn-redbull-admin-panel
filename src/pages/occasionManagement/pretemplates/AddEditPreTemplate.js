import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import {
  createOccasionTemplate,
  updateOccasionTemplate,
  getOccasionTemplateByName,
} from "../../../services/ApiOccasionTemplate";
import { occasionList } from "../../../services/ApiServices";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Loader } from "../../../components/common/loader";

const AddEditPreTemplate = () => {
  const history = useHistory();
  const { oname, tname } = useParams();
  ///const location=useLocation();
  // console.log("location",location.pathname);

  console.log("handleGetTopicByIdhandleGetTopicById", oname, tname);
  const [occasionName, setOccasionName] = useState("");
  const [occasionNameErr, setOccasionNameErr] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateNameErr, setTemplateNameErr] = useState("");
  const [templateStatus, setTemplateStatus] = useState(true);
  const [templateStatusErr, setTemplateStatusErr] = useState("");
  const [templateOrder, setTemplateOrder] = useState("");
  const [templateOrderErr, setTemplateOrderErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [occasionArrList, setOccasionList] = useState([]);
  const [isAddOccasionTemplate, setIsAddOccasionTemplate] = useState(false);
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [editImage, setEditImage] = useState(false);
  const [imageErr, setImageErr] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);

  const breadcrumb = [
    {
      link: "/occasion-management/predefined-templates",
      linkText: "Predefined Template Management",
    },
    {
      link: "",
      linkText: isAddOccasionTemplate
        ? "Add Predefined Template"
        : "Edit Predefined Template",
    },
  ];

  const numberRegEx = /^[0-9\b]+$/;
  const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
  const handleValidate = () => {
    let validate = true;

    if (!occasionName.replace(/\s+/g, "")) {
      setOccasionNameErr("Occasion name is required");
      validate = false;
    } else {
      setOccasionNameErr("");
    }

    if (!templateName.replace(/\s+/g, "")) {
      setTemplateNameErr("Template name is required");
      validate = false;
    } else if (!albhaNumericRegEx.test(templateName)) {
      setTemplateNameErr("Special characters and spaces are not allowed");
      validate = false;
    } else {
      setTemplateNameErr("");
    }
    if (!templateOrder) {
      setTemplateOrderErr("template order is required");
      validate = false;
    } else if (!numberRegEx.test(templateOrder)) {
      setTemplateOrderErr("template order should be numeric");
      validate = false;
    } else {
      setTemplateOrderErr("");
    }
    if (isAddOccasionTemplate && !base64) {
      setImageErr("Image is required");
      validate = false;
    } else {
      setImageErr("");
    }
    return validate;
  };

  const handleGetTemplateById = (oname, tname) => {
    setLoader(true);
    let params = {
      occasionName: oname,
      templateName: tname,
    };
    getOccasionTemplateByName(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        console.log(status, data, "datadatadatadatadata");
        setLoader(false);
        if (status === 200) {
          setOccasionName(data.occasionName.replace("pre_", ""));
          setTemplateName(data.templateName);
          setBase64(data.templateImage);
          setTemplateStatus(data.status);
          setTemplateOrder(data.displayOrder);
        } else {
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error(
          "Sorry, a technical error occurred! Please try again later"
        );
      });
  };
  const handleUpdateTemplate = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        templateIdentifier: "occasionTemplate",
        occasionName: "pre_" + occasionName,
        templateName: templateName,
        data: {
          displayOrder: parseInt(templateOrder),
          status:
            templateStatus == true || templateStatus == "true" ? true : false,
          templateImage: base64,
          fileName: fileName,
        },
      };
      if (editImage) {
        obj["data"]["templateImage"] = base64;
        obj["data"]["fileName"] = fileName;
      }
      console.log("obj---", obj);
      updateOccasionTemplate(obj)
        .then((res) => {
          let { status, data } = resHandle(res);
          setIsSubmit(false);
          if (status === 200) {
            toast.success(data.message);
            history.push("/occasion-management/predefined-templates");
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

  const handleFileChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("filefile", file);
    reader.addEventListener(
      "load",
      () => {
        setBase64(reader.result);
        setFileName(file.name);
        setEditImage(true);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getOccasionList = () => {
    setLoader(true);
    let params = {
      limit: 200,
      LastEvaluatedKey: "null",
    };
    occasionList(params)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          let occasionList = data.occasionList.sort((a, b) => {
            return a.displayTitle.localeCompare(b.displayTitle);
          });
          setOccasionList(occasionList);

          // if (isAddOccasionTemplate) {
          //   setOccasionName(occasionList[0].occasionName)
          // }

          setLoader(false);
        }
      })
      .catch((err) => {
        setOccasionList([]);
        setLoader(false);
      });
  };
  useEffect(() => {
    if (window.location.pathname == "/predefined-templates/create") {
      setIsAddOccasionTemplate(true);
    }
    if (window.location.pathname !== "/predefined-templates/create") {
      handleGetTemplateById(oname, tname);
    }
    getOccasionList();
  }, []);

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        templateIdentifier: "occasionTemplate",
        occasionName: "pre_" + occasionName,
        templateName: templateName,
        data: {
          templateImage: base64,
          fileName: fileName,
          displayOrder: parseInt(templateOrder),
          status:
            templateStatus == true || templateStatus == "true" ? true : false,
        },
      };
      console.log("obj---", obj);
      createOccasionTemplate(obj)
        .then((res) => {
          let { status, data } = resHandle(res);
          setIsSubmit(false);
          if (status === 200) {
            toast.success(data.message);
            history.push("/occasion-management/predefined-templates");
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
        <h2>{isAddOccasionTemplate ? "Add Template" : "Edit Template"} </h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          <div className="form-group row">
            <div className="col">
              <label>Occasion Name</label>
              <select
                className="form-control"
                name="language"
                value={occasionName}
                disabled={isAddOccasionTemplate ? "" : "disabled"}
                onChange={(e) => (
                  setOccasionName(e.target.value), setOccasionNameErr("")
                )}
              >
                <option key={"kotion"} value="">
                  Select Occasion
                </option>
                {occasionArrList.map((item, index) => (
                  <option key={"k" + index} value={item.occasionName}>
                    {item.displayTitle}
                  </option>
                ))}
              </select>

              {occasionNameErr ? (
                <div className="inlineerror">{occasionNameErr} </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <label>Template Name</label>
              <input
                readOnly={isAddOccasionTemplate ? "" : "readonly"}
                type="text"
                className="form-control"
                value={templateName}
                name="templateName"
                onChange={(e) => (
                  setTemplateName(e.target.value), setTemplateNameErr("")
                )}
              />
              {templateNameErr ? (
                <div className="inlineerror">{templateNameErr} </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label>Order</label>
              <input
                type="number"
                className="form-control"
                keyboardType="phone-pad"
                value={templateOrder}
                name="templateOrder"
                onChange={(e) => (
                  setTemplateOrder(e.target.value), setTemplateOrderErr("")
                )}
              />
              {templateOrderErr && (
                <div className="inlineerror">{templateOrderErr} </div>
              )}
            </div>
            <div className="col">
              <label>Status</label>
              <select
                className="form-control"
                name="cars"
                value={templateStatus}
                onChange={(e) => (
                  setTemplateStatus(e.target.value), setTemplateStatusErr("")
                )}
              >
                <option value="true">Activate</option>
                <option value="false">De-Activate</option>
              </select>
              {templateStatus && (
                <div className="inlineerror">{templateStatusErr} </div>
              )}
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <label>Icon</label>
              <input
                type="file"
                className="form-control"
                value=""
                onChange={handleFileChange}
              />
              {imageErr && <div className="inlineerror">{imageErr} </div>}
            </div>
          </div>

          {base64 ? <img className="iconImg" src={base64} alt="icon" /> : ""}

          <div className="button300">
            {isAddOccasionTemplate ? (
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={handleCreateTemplate}
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
                {isSubmit ? " Submitting.." : "Create"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={handleUpdateTemplate}
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
                {isSubmit ? " Submitting.." : "Update"}
              </button>
            )}
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddEditPreTemplate;
