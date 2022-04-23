import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import Pagination from "react-js-pagination";

import Breadcrumb from "../../../components/common/Breadcrumb";
import {
  deleteOccasionTemplate,
  OccasionTemplateList,
} from "../../../services/ApiOccasionTemplate";
import { resHandle } from "../../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../../components/common/loader";
import { templateList } from "../../../services/ApiServices";


const Templates = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Templates" }];

  const [confirmModal, setConfirmModal] = useState(false);
  //const [confirmTopic, setConfirmTopic] = useState("");
  const [occasionName, setOccasionName] = useState([]);
  const [templateName, setTemplateName] = useState([]);
  const [tempalateList, setTemplateList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(10);
  const [loader, setLoader] = useState(false);
  // all handler start
  useEffect(() => {
    getTemplateList();
  }, []);

  const editPages = (_id) => {
    history.push("/template/edit/" + _id);
  };
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
  };
  const getTemplateList = () => {
    setLoader(true)
    let params = {
      limit: 200,
      LastEvaluatedKey: "null",
    };
    OccasionTemplateList(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false)
        setTemplateList(data.templateList);
      }
    });
  };

  const handleDeleteTemplate = () => {
    let params = {
      occasionName,
      templateName
    };
    handleClose();
    setLoader(true)
    deleteOccasionTemplate(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status === 200) {
        setLoader(false)
        toast.success(data.message)
        getTemplateList();
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleClose = () => {
    setConfirmModal(false);
    // setConfirmTopic("");
  };

  // all handler end
  return (
    <div className="page_wrapper">
      <Modal show={confirmModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to delete this Template?
          </p>
          <div className="d-flex justify-content-center pb-4">
            <button
              onClick={handleClose}
              className="btn btn-dark btn-sm pl-5 pr-5"
            >
              No
            </button>
            <button
              onClick={handleDeleteTemplate}
              className="btn btn-danger btn-sm ml-3 pl-5 pr-5"
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* <div className="search_bar">
                <i className="fa fa-search" />
                <input type="text" className="form-control" placeholder="Search Topic" value={search} name="search" onChange={handlerOnChange} />
            </div> */}

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Occasion Template Management</h2>
        <Link to="/template/create" className="btn btn-primary btn-sm">
          Add Template
        </Link>
      </div>
      <div className="twocol sb page_header">
        <div className="headerinner left"></div>
      </div>

      <div className="table-responsive cm_card p-0">
        {loader ? (
          <Loader />
        ) : (
          <table className="table table-bordered user-table table-hover align-items-center table-fixed" style={{ "tableLayout": "fixed" }} >
            <thead>
              <tr>
                <th>Occasion Name</th>
                <th>Template Name</th>
                <th>Icon</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tempalateList.length ? (
                tempalateList?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <span className="">{item.occasionName}</span>
                    </td>
                    <td>
                      <span className="">{item.templateName}</span>
                    </td>
                    <td  >
                      <img
                        src={item.templateImage}
                        alt="Avatar"
                        className="user-avatar high"
                        style={{ width: '50px' }}
                      />
                    </td>


                    <td>{item.displayOrder}</td>
                    <td>{item.status ? "Activated" : "Deactivated"}</td>

                    <td>
                      <div className="action">
                        <span onClick={() => editPages(item.occasionName, item.templateName)}>
                          <i className="fas fa-edit"></i>
                        </span>

                        <span
                          onClick={() => (
                            setConfirmModal(true),
                            setOccasionName(item.occasionName),
                            setTemplateName(item.templateName)
                          )}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </div>
                    </td>
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
        )}
      </div>

      {templateList.length ? (
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

export default Templates;
