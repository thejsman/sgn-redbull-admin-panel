import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getRozyByName, createRozy, updateRozy, deleteRozy } from '../../services/ApiRozy'
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
  const [contentList, setContentList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [rozyStatus, setRozyStatus] = useState(true);
  const [rozyStatusErr, setRozyStatusErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isAddRozy, setIsAddRozy] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isShowInsert, setIsShowInsert] = useState(true)

  const location = useLocation();
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

  useEffect(() => {
    console.log();
    if (window.location.pathname == "/rozy/create") {
      setIsAddRozy(true);
    }
    if (window.location.pathname !== "/rozy/create") {
      console.log(location)

      setSectionName(location.state.section);
      let cList = location.state.content;
      cList.map(a => { a.isSubmit = false; a.isDelete = false; a.isItemShow = true });
      setContentList(cList)

      var list = ["english", "hindi", "nepali"].filter(
        val => !location.state.content.find(arr => arr.key == val)
      );
      setLanguageList(list);
      if (list.length > 0) {
        setSectionLanguage(list[0])
      }
    }
  }, []);

  const handleDeleteRozy = (index, e) => {
    e.preventDefault();
    contentList[index]['isDelete'] = true;
    setContentList([...contentList]);
    let obj = {
      sectionName,
      sectionLanguage: contentList[index].key,
    };
    console.log("createObj---", obj);
    deleteRozy(obj).then((res) => {
      console.log('resresresres', res)
      let { status, data } = resHandle(res);
      if (status === 200) {
        toast.success(data.message);
        contentList[index]['isDelete'] = false;
        contentList[index]['isItemShow'] = false;
        setContentList([...contentList]);
        let list = languageList;
        list.push(contentList[index].key);
        setContent('');
        setLanguageList([...list])
      } else {
        toast.success(data.message);
        contentList[index]['isDelete'] = false;
      }
    });

  }



  const handleSubmit = (index, e) => {
    e.preventDefault();
    contentList[index]['isSubmit'] = true;
    setContentList([...contentList]);
    let obj = {
      sectionName,
      sectionLanguage: contentList[index].key,
      data: {
        content: contentList[index].value,
        active: contentList[index].status,
      }
    };
    console.log("createObj---", obj);
    updateRozy(obj).then((res) => {
      console.log('resresresres', res)
      let { status, data } = resHandle(res);
      contentList[index]['isSubmit'] = false;
      setContentList([...contentList]);
      if (status === 200) {
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    });

  };

  const handleUpdateRozy = (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmit(true);
      let obj = {
        sectionName,
        sectionLanguage,
        data: {
          content: content,
          active: rozyStatus
        }
      };
      console.log("createObj---", obj);
      updateRozy(obj).then((res) => {
        console.log('resresresres', res)
        let { status, data } = resHandle(res);
        setIsSubmit(false);
        if (status === 200) {
          toast.success(data.message);
          let arr = contentList;
          arr.push({ key: sectionLanguage, value: content, status: rozyStatus, isSubmit: false, isDelete: false, isItemShow: true });
          setContentList([...arr]);
          let list = languageList.filter(e => e !== sectionLanguage);
          setLanguageList(list);
          if (list.length > 0) {
            setSectionLanguage(list[0]);
            setContent("");
            setRozyStatus(true);

          }
        } else {
          toast.success(data.message);
        }
      });
    }
  };

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

  const handleChange = (i, type, e) => {
    let arr = contentList;
    if (type == 'status') {
      arr[i]['status'] = e.target.checked;
    } else {
      arr[i]['value'] = e.target.value;
    }

    setContentList([...arr]);
  }


  // All function End

  return (
    <div className="page_wrapper">
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>{isAddRozy ? 'Add Rozy' : 'Edit Rozy'}</h2>

      </div>
      {loader ? (
        <Loader />
      ) : (
        isAddRozy ? (
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
        ) : (

          <form className="form-controller chosen">

            <div className="form-group row">
              <div className="col">
                <label>Section Name</label>
                <input
                  readOnly="readOnly"
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

            </div>

            {(languageList.length > 0) && (

              <div className="form-group row">
                <div className="col-2">
                  <label>Section Language</label>
                  <select
                    className="form-control"
                    name="language"
                    value={sectionLanguage}
                    onChange={(e) => (
                      setSectionLanguage(e.target.value), setSectionLanguageErr("")
                    )}
                  >
                    {languageList.map(option => (
                      <option key={"k" + option} value={option}>
                        {option}
                      </option>
                    ))}

                  </select>

                  {sectionLanguageErr && (
                    <div className="inlineerror">{sectionLanguageErr} </div>
                  )}
                </div>

                <div className="col-3">
                  <label>Content</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content}
                    name="content"
                    onChange={(e) => (
                      setContent(e.target.value), setContentErr("")
                    )}
                  />

                  {contentErr && (
                    <div className="inlineerror">{contentErr} </div>
                  )}
                </div>
                <div className="col-1 mr-5">
                  <div className='custom-control custom-switch mt-5'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='customSwitchesChecked'
                      defaultChecked={rozyStatus}
                      onChange={(e) => (
                        setRozyStatus(e.target.checked)
                      )}

                    />
                    <label className='custom-control-label' htmlFor='customSwitchesChecked'>
                      Status
                    </label>
                  </div>
                </div>
                <div className="col-4 mt-4">

                  <button
                    type="button"
                    className="btn btn-primary rounded-pill mt-2"
                    onClick={handleUpdateRozy}
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
                    {isSubmit ? ' Submitting..' : 'Insert'}

                  </button>
                </div>
              </div>
            )}
            {contentList.map((item, index) => {

              return (item.isItemShow) && (
                <div className="form-group row">
                  <div className="col-2">
                    <label>Section Language</label>
                    <select
                      className="form-control"
                      disabled='disabled'
                      name="cars"
                      value={item.key}
                      onChange={(e) => (
                        setSectionLanguage(e.target.value), setSectionLanguageErr("")
                      )}
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="nepali">Nepali</option>
                    </select>

                  </div>

                  <div className="col-3">

                    <label>Content</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.value}
                      name="content"
                      onChange={e => handleChange(index, 'value', e)}
                    />

                    {/* {contentErr && (
                    <div className="inlineerror">{contentErr} </div>
                  )} */}
                  </div>
                  <div className="col-1 mr-5">
                    <div className='custom-control custom-switch mt-5'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id={'id' + index}
                        defaultChecked={item.status}
                        onChange={e => handleChange(index, 'status', e)}
                      />
                      <label className='custom-control-label' htmlFor={'id' + index}>
                        Status
                      </label>
                    </div>
                  </div>
                  <div className="col-2 mt-4">

                    <button
                      type="button"
                      className="btn btn-primary rounded-pill mt-2"
                      onClick={(e) => handleSubmit(index, e)}
                      disabled={item.isSubmit ? 'disabled' : ''}
                    >
                      {/* {item.isSubmit ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )
                        : ('')
                      } */}
                      {item.isSubmit ? 'Updating...' : 'Update'}

                    </button>
                  </div>
                  <div className="col-2 mt-4">


                    <button
                      type="button"
                      className="btn btn-danger rounded-pill mt-2"
                      onClick={(e) => handleDeleteRozy(index, e)}
                      disabled={item.isDelete ? 'disabled' : ''}
                    >
                      {/* {item.isDelete ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )
                        : ('')
                      } */}
                      {item.isDelete ? ' Deleting...' : 'Delete'}

                    </button>
                  </div>
                </div>
              )
            })}




            <div className="button300">



            </div>
          </form>
        )
      )}
      <ToastContainer />
    </div>
  );
};

export default AddRozy;
