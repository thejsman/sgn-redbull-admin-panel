import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  getOccasionByName,
  createOccasion,
} from "../../../services/ApiServices";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Loader } from '../../../components/common/loader';
import { PhotoshopPicker } from "react-color";

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
  const [occasionType, setOccasionType] = useState('private');
  const [occasionTypeErr, setOccasionTypeErr] = useState("");
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
  const visibilityData = [{ label: "Universal", value: 0 }, { label: "India", value: 91 }, { label: "Nepal", value: 977 }];
  const [lottieBackgroundFileName, setLottieBackgroundFileName] = useState('');
  const [lottieBackgroundFileNameErr, setLottieBackgroundFileNameErr] = useState('');
  const [lottieBackgroundBase64, setLottieBackgroundBase64] = useState('');
  const [visibility, setVisibility] = useState([]);
  const [visibilityErr, setVisibilityErr] = useState('');
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [textColorErr, setTextColorErr] = useState('');
  const [bcolor, setBColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundColorErr, setBackgroundColorErr] = useState('');
  const [isShowTextColorPicker, setIsShowTextColorPicker] = useState(false);
  const [isShowBackgroundColorPicker, setIsShowBackgroundColorPicker] = useState(false);


  const onChangeCheckbox = (e, item) => {
    let temp = visibility;
    if (e.target.checked == false) {
      temp = temp.filter((v) => v.value !== item.value);
    } else {
      if (temp.findIndex((i) => i.value == item.value) == -1) {
        temp.push(item);
      }
    }
    setVisibility([...temp]);
  }

  const breadcrumb = [
    { link: "/occasion-management/occasion", linkText: "Occasion Management" },
    { link: "", linkText: isAddOccasion ? "Add Occasion" : "Edit Occasion" },
  ];

  const numberRegEx = /^[0-9\b]+$/;
  const albhaRegEx = /^[a-zA-z]+$/;
  const albhaNumericRegEx = /^[A-Za-z0-9]+$/;
  const handleValidate = () => {
    let validate = true;
    setOccasionOrderErr("");

    if (!occasionName.replace(/\s+/g, "")) {
      setOccasionNameErr("Occasion name is required");
      validate = false;
    } else if (!albhaNumericRegEx.test(occasionName)) {
      setOccasionNameErr("Special characters and spaces are not allowed")
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

    if (visibility.length == 0) {
      setVisibilityErr("Please select visibility option");
    }
    // if (!occasionDesc.replace(/\s+/g, "")) {
    //   setOccasionDescErr("Occasion describtion is required");
    //   validate = false;
    // } else {
    //   setOccasionDescErr("");
    // }
    if (isAddOccasion && !base64) {
      setImageErr('Image is required')
      validate = false
    } else {
      setImageErr('')
    }
    return validate;
  };


  const handleUpload = e => {
    let reader = new FileReader()
    let file = e.target.files[0]
    console.log('filefile', file)
    reader.addEventListener(
      'load',
      () => {
        setLottieBackgroundBase64(reader.result);
        setLottieBackgroundFileName(file.name);
        setLottieBackgroundFileNameErr("")
      },
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }


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
        setTextColor(data.textColor);
        setBackgroundColor(data.backgroundColor);
        setColor(data.textColor);
        setBColor(data.backgroundColor)
        if (data.occasionStatus == true) {
          setOccasionStatus(true);
        } else {
          setOccasionStatus(false);
        }

        setLottieBackgroundBase64(data.userLottiBackgroundIcon);

        setFileName(data.fileName);
        setOccasionOrder(data.displayOrder);
        setOccasionDesc(data.occasionDescription);
        setBase64(data.occasionIcon);
        setOccasionType(data.occasionType ? data.occasionType : 'private');
        let arr = [];
        if (data.visibility) {
          arr = data.visibility.map(e => {
            let index = visibilityData.findIndex((item) => item.value == e);
            return visibilityData[index];
          })
        }

        setVisibility(arr);
      } else {
      }
    }).catch((err) => {
      setLoader(false);
      toast.error("Sorry, a technical error occurred! Please try again later")
    });
  };
  const handleUpdateOccasion = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      debugger;
      let createOccasionObj = {
        "occasionIdentifier": "occasion",
        occasionName: occasionName,
        data: {
          displayTitle: occasionTitle,
          displayOrder: parseInt(occasionOrder),
          occasionDescription: occasionDesc,
          occasionType: occasionType,
          occasionStatus: occasionStatus == true || occasionStatus == "true" ? true : false,
          occasionIcon: occasionIcon,
          fileName: fileName,
          visibility: visibility.map(a => a.value),
          userLottiBackgroundIcon: lottieBackgroundBase64,
          textColor : textColor,
          backgroundColor: backgroundColor
        },
      };

      if (editImage) {
        createOccasionObj.data['occasionIcon'] = base64;
        createOccasionObj.data['fileName'] = fileName;
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
      }).catch((err) => {
        setIsSubmit(false);
        toast.error("Sorry, a technical error occurred! Please try again later")
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
        occasionName: occasionName,
        data: {
          displayTitle: occasionTitle,
          occasionIcon: base64,
          displayOrder: parseInt(occasionOrder),
          occasionDescription: occasionDesc,
          occasionType: occasionType,
          occasionStatus: occasionStatus == true || occasionStatus == "true" ? true : false,
          fileName: fileName,
          visibility: visibility.map(a => a.value),
          userLottiBackgroundIcon: lottieBackgroundBase64,
          textColor,
          backgroundColor
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
            <div className="col">
              <label>Occasion Type</label>
              <select
                className="form-control"
                name="occassionType"
                value={occasionType}
                onChange={(e) => (
                  setOccasionType(e.target.value), setOccasionTypeErr("")
                )}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="wishes">Wishes</option>
              </select>
              {occasionTypeErr && (
                <div className="inlineerror">{occasionTypeErr} </div>
              )}
            </div>
            <div className='col'>
              <label>Background Json File</label>
              <div className="custom-file">
                <input id="lottieBackground" type="file"
                  className=" form-control custom-file-input"
                  name="lottieBackgroundFileName"
                  accept=".json"
                  onChange={handleUpload} />
                <label className="custom-file-label" htmlFor="lottieBackground">
                  {lottieBackgroundFileName ? lottieBackgroundFileName : 'Choose file'}
                </label>
              </div>
              {lottieBackgroundBase64 && <a href={lottieBackgroundBase64} download={lottieBackgroundBase64.includes("https://") ? lottieBackgroundBase64 : lottieBackgroundFileName} target="blank"> {lottieBackgroundBase64.includes("https://") ? lottieBackgroundBase64 : lottieBackgroundFileName} </a>}
              {lottieBackgroundFileNameErr && <div className='inlineerror'>{lottieBackgroundFileNameErr} </div>}
            </div>



          </div>
          <div className="form-group row">
            <div className='col'>
              <label>Text Color</label>
              <div className="p-2 rounded-sm border" style={{
                  backgroundColor: textColor,
                  transition: "ease all 500ms",
                  cursor: 'pointer',
                  height: '40px',

              }}
                  onClick={e => {
                      setIsShowTextColorPicker(true);
                      setTextColorErr("");
                  }}
              > {textColor ? textColor : "Click here"}</div>
              {textColorErr ? (
                  <div className='inlineerror'>{textColorErr} </div>
              ) : (
                  ''
              )}
              {isShowTextColorPicker && (
                  <PhotoshopPicker
                      color={color}
                      onChangeComplete={color => {
                          setColor(color.hex);
                      }}
                      onAccept={() => {
                          console.log('color', color)
                          setTextColor(color);
                          setIsShowTextColorPicker(false);
                      }}
                      onCancel={() => {
                          setIsShowTextColorPicker(false);
                      }}
                  />
              )}
          <div>

        </div>
            </div>
            <div className='col'>
              <label>Background Color</label>
              <div className="p-2 rounded-sm border" style={{
                  backgroundColor: backgroundColor,
                  transition: "ease all 500ms",
                  cursor: 'pointer',
                  height: '40px',

              }}
                  onClick={e => {
                      setIsShowBackgroundColorPicker(true);
                      setBackgroundColorErr("");
                  }}
              > {backgroundColor ? backgroundColor : "Click here"}</div>
              {backgroundColorErr ? (
                  <div className='inlineerror'>{backgroundColorErr} </div>
              ) : (
                  ''
              )}
              {isShowBackgroundColorPicker && (
                  <PhotoshopPicker
                      color={bcolor}
                      onChangeComplete={color => {
                          setBColor(color.hex);
                      }}
                      onAccept={() => {
                          console.log('color', bcolor)
                          setBackgroundColor(bcolor);
                          setIsShowBackgroundColorPicker(false);
                      }}
                      onCancel={() => {
                          setIsShowBackgroundColorPicker(false);
                      }}
                  />
              )}
          <div>

        </div>
            </div>
          </div>

          <div className="form-group row">
            <div className='col'>
              <label>Icon</label>
              <input
                type='file'
                className='form-control'
                value=''
                onChange={handleFileChange}
              />
            </div>

            <div className='col'>
              <div className='rounded-sm pb-3'>
                <label className="pl-1 ">Visibility</label>
                <div className="form-group row">
                  {visibilityData.map((item, index) => {
                    return (
                      <div className="col" key={index}>
                        <div className="form-check">
                          <input type="checkbox"
                            id={`custom-checkbox-${index}`}
                            className="form-check-input"
                            checked={visibility?.some((d) => d.value == item.value)}
                            value={visibility}
                            onChange={(e) => {
                              onChangeCheckbox(e, item);
                            }}
                          />
                          <label htmlFor={`custom-checkbox-${index}`} className="form-check-label"  > {item.label} ({item.value})
                          </label>
                        </div>
                      </div>
                    )
                  })}

                </div>
                {visibilityErr && (
                  <div className="inlineerror">{visibilityErr} </div>
                )}
              </div>

            </div>
          </div>
          <div className="form-grop row">
            <div className='col'>
              {base64 ? <img className='iconImg' src={base64} alt='icon' /> : ''}
            </div>
            <div className="col">

            </div>
          </div>



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
