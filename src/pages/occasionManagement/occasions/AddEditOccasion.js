import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  getOccasionByName,
  createOccasion,
} from "../../../services/ApiServices";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"
import { Loader } from '../../../components/common/loader'

const AddEditOccasion = () => {
  const history = useHistory();
  const { id } = useParams();
  ///const location=useLocation();
  // console.log("location",location.pathname);

  console.log("handleGetTopicByIdhandleGetTopicById", id);
  const [occasionName, setOccasionName] = useState("");
  const [occasionNameErr, setOccasionNameErr] = useState("");
  const [occasionTitle, setOccasionTitle] = useState("");
  const [occasionTitleErr, setOccasionTitleErr] = useState("");
  const [occasionIcon, setOccasionIcon] = useState("");
  const [occasionIconErr, setOccasionIconErr] = useState("");
  const [occasionStatus, setOccasionStatus] = useState(true);
  const [occasionStatusErr, setOccasionStatusErr] = useState("");
  const [occasionOrder, setOccasionOrder] = useState("");
  const [occasionOrderErr, setOccasionOrderErr] = useState("");
  const [occasionDesc, setOccasionDesc] = useState("");
  const [occasionDescErr, setOccasionDescErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isAddOccasion, setIsAddOccasion] = useState(false);
  const [base64, setBase64] = useState('')
  const [fileName, setFileName] = useState('')
  const [editImage, setEditImage] = useState(false)
  const [imageErr, setImageErr] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState(false)

  const breadcrumb = [
    { link: "/occasion-management/occasion", linkText: "Occasion Management" },
    { link: "", linkText: "Add Occasion" },
  ];

  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const handleValidate = () => {
    let validate = true;
    setOccasionOrderErr("");

    if (!occasionName.replace(/\s+/g, "")) {
      setOccasionNameErr("Occasion name is required");
      validate = false;
    } else if (!albhaRegEx.test(occasionName)) {
      setOccasionNameErr("only alphabets are allowed")
      validate = false
    } else {
      setOccasionNameErr("")
    }
    if (!occasionTitle.replace(/\s+/g, "")) {
      setOccasionTitleErr("Occasion title is required");
      validate = false;
    } else {
      setOccasionTitleErr("");
    }
    if (!occasionOrder) {
      setOccasionOrderErr("Occasion order is required");
      validate = false;
    } else if (!numberRegEx.test(occasionOrder)) {
      setOccasionOrderErr("Occasion order should be numeric");
      validate = false;
    } else {
      setOccasionOrderErr("");
    }
    if (!occasionDesc.replace(/\s+/g, "")) {
      setOccasionDescErr("Occasion describtion is required");
      validate = false;
    } else {
      setOccasionDescErr("");
    }
    if (isAddOccasion && !base64) {
      setImageErr('Image is required')
      validate = false
    } else {
      setImageErr('')
    }
    return validate;
  };

  const handleGetOccasionById = (id) => {
    setLoader(true);
    let params = {
      occasionName: id,
    };
    getOccasionByName(params).then((res) => {
      let { status, data } = resHandle(res);
      console.log(status, data, "datadatadatadatadata");
      setLoader(false);
      if (status === 200) {
        setOccasionName(data.occasionName);
        setOccasionTitle(data.displayTitle);
        setOccasionIcon(data.occasionIcon);
        setOccasionStatus(data.occasionStatus);
        setOccasionOrder(data.displayOrder);
        setOccasionDesc(data.occasionDescription);
        setBase64(data.occasionIcon);
      } else {
      }
    });
  };
  const handleUpdateOccasion = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let createOccasionObj = {
        "occasionIdentifier": "occasion",
        occasionName: occasionName.toLowerCase(),
        data: {
          displayTitle: occasionTitle,
          displayOrder: parseInt(occasionOrder),
          occasionDescription: occasionDesc,
          occasionStatus: occasionStatus,
        },
      };

      if (editImage) {
        createOccasionObj.data['occasionIcon'] = base64;
      }
      console.log("createOccasionObj---", createOccasionObj);
      createOccasion(createOccasionObj).then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/occasion-management/occasion");
        } else {
          toast.success(data.message);
        }
      });
    }
  };

  const handleFileChange = e => {
    let reader = new FileReader()
    let file = e.target.files[0]
    console.log('filefile', file)
    reader.addEventListener(
      'load',
      () => {
        setBase64(reader.result)
        setFileName(file.name)
        setEditImage(true)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    console.log();
    if (window.location.pathname == "/occasion/create") {
      setIsAddOccasion(true);
    }
    if (window.location.pathname !== "/occasion/create") {
      handleGetOccasionById(id);
    }
  }, []);

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let createOccasionObj = {
        "occasionIdentifier": "occasion",
        occasionName: occasionName.toLowerCase(),
        data: {
          displayTitle: occasionTitle,
          occasionIcon: base64,
          displayOrder: parseInt(occasionOrder),
          occasionDescription: occasionDesc,
          occasionStatus: occasionStatus,
        },
      };
      console.log("createOccasionObj---", createOccasionObj);
      createOccasion(createOccasionObj).then((res) => {
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          history.push("/occasion-management/occasion");
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
        <h2>{isAddOccasion ? "Add Occasion" : "Edit Occasion"} </h2>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <form className="form-controller chosen">
          <div className="form-group row">
            <div className="col">
              <label>Occasion Name</label>
              <input
                readOnly={isAddOccasion ? '' : 'readonly'}
                type="text"
                className="form-control"
                value={occasionName}
                name="topicName"
                onChange={(e) => (
                  setOccasionName(e.target.value), setOccasionNameErr("")
                )}
              />
              {occasionNameErr ? (
                <div className="inlineerror">{occasionNameErr} </div>
              ) : (
                ""
              )}
            </div>
            <div className="col">
              <label>Occasion Title</label>
              <input
                type="text"
                className="form-control"
                value={occasionTitle}
                name="topicName"
                onChange={(e) => (
                  setOccasionTitle(e.target.value), setOccasionTitleErr("")
                )}
              />
              {occasionTitleErr && (
                <div className="inlineerror">{occasionTitleErr} </div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label>Order</label>
              <input
                type='number'
                className="form-control"
                keyboardType='phone-pad'
                value={occasionOrder}
                name="topicName"
                onChange={(e) => (
                  setOccasionOrder(e.target.value), setOccasionOrderErr("")
                )}
              />
              {occasionOrderErr && (
                <div className="inlineerror">{occasionOrderErr} </div>
              )}
            </div>
            <div className="col">
              <label>Status</label>
              <select
                className="form-control"
                name="cars"
                value={occasionStatus}
                onChange={(e) => (
                  setOccasionStatus(e.target.value), setOccasionStatusErr("")
                )}
              >
                <option value="true">Activate</option>
                <option value="false">De-Activate</option>
              </select>
              {occasionStatusErr && (
                <div className="inlineerror">{occasionStatusErr} </div>
              )}
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={occasionDesc}
                name="topicName"
                onChange={(e) => (
                  setOccasionDesc(e.target.value), setOccasionDescErr("")
                )}
              />
              {occasionDescErr && (
                <div className="inlineerror">{occasionDescErr} </div>
              )}
            </div>
          </div>
          <div className='form-group row'>
            <div className='col'>
              <label>Icon</label>
              <input
                type='file'
                className='form-control'
                value=''
                onChange={handleFileChange}
              />
              {imageErr && (
                <div className='inlineerror'>{imageErr} </div>
              )}
            </div>


          </div>

          {base64 ? <img className='iconImg' src={base64} alt='icon' /> : ''}


          <div className="button300">
            {isAddOccasion ? (
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={handleCreateTemplate}
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
            ) : (
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={handleUpdateOccasion}
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
                {isSubmit ? ' Submitting..' : 'Update'}
              </button>
            )}
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddEditOccasion;
