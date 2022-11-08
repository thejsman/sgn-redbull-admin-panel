import React, { useReducer, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";

import {
  getUserList,
  updateStatus,
  deleteUserService,
} from "../../services/ApiServices";
import {
  checkUrlType,
  countryData,
  resHandle,
} from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";
import Breadcrumb from "../../components/common/Breadcrumb";

const AskerManagement = () => {
  const history = useHistory();
  const breadcrumb = [{ link: "", linkText: "Asker Management" }];
  const [confirmModal, setConfirmModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [confirmUser, setConfirmUser] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [f_country, setF_country] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortFeild, setSortFeild] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [reportStatus, setReportStatus] = useState("");
  const [limit, setLimit] = useState(20);
  const [state, setstate] = useReducer(
    (state, newstate) => ({ ...state, ...newstate }),
    {
      accessToken: "",
      domainId: "",
      search: "",
      page: 1,
      filterType: "",
      domainName: "",
      count: "",
      loader: true,
      gender: "",
      userType: 1,
      valTopicName: "",
      getUserListArr: [],
      solver: 2,
      askerCount: "",
      userStatus: "",
      searchByDomain: "",
      searchByTopic: "",
    }
  );

  const handlerOnChange = (e) => {
    setstate({
      [e.target.name]: e.target.value,
      page: 1,
    });
  };

  const handleGetUserList = () => {
    let params = {
      domainId: domainName,
      topicId: valTopicName,
      search: search,
      page,
      limit,
      solver: solver,
      userType: userType,
      status: userStatus,
      country: f_country,
      sortType,
      sortFeild,
      reportStatus,
    };
    getUserList(params).then((res) => {
      let { status, data } = resHandle(res);
      if (status) {
        setstate({
          getUserListArr: data[0]?.userList,
          askerCount: data[0]?.total,
          loader: false,
        });
      }
    });
  };

  useEffect(() => {
    handleGetUserList();
  }, [
    state.search,
    f_country,
    sortType,
    sortFeild,
    reportStatus,
    state.page,
    limit,
  ]);

  useEffect(() => {
    setstate({ ...state, page: 1 });
  }, [sortType, sortFeild]);

  useEffect(() => {
    if (state.askerCount) {
      let params = {
        domainId: domainName,
        topicId: valTopicName,
        search: "",
        page: 1,
        limit,
        solver: solver,
        userType: userType,
        status: userStatus,
        country: f_country,
        sortType,
        sortFeild,
      };
      getUserList(params).then((res) => {
        let { status, data } = resHandle(res);
        if (status) {
          let all_data = data[0]?.userList;
          console.log(all_data, "dgrsteafdgbsrte");
          let modifyData = all_data.map((i) => [
            i.name,
            i.lastName,
            i.mobile,
            i.email,
            moment(i.dob).format("DD-MMM-YY"),
            i.country,
            i.linkedInUrl,
            i.fbUrl,
            i.twitterUrl,
            i.youtubeUrl,
            i.instaUrl,
            i.tiktokUrl,
            i.websiteUrl,
            moment(i.created).format("DD-MMM-YY"),
          ]);

          setCsvData([
            [
              "First Name",
              "Last Name",
              "Phone Number",
              "Email",
              "Date of Birth",
              "Country",
              "Linkedin",
              "Facebook",
              "Twitter",
              "Youtube",
              "Instagram",
              "Tiktok",
              "Website",
              "Joining Date",
            ],
            ...modifyData,
          ]);
        }
      });
    }
  }, [state.askerCount]);

  const userStatusUpdate = () => {
    let params = {};

    if (isDeleteModal) {
      params.deleteUserId = confirmUser._id;
      handleClose();
      deleteUserService(params).then((res) => {
        let { status, data } = resHandle(res);
        if (status) {
          toast.success(data.message);
          handleGetUserList();
        }
      });
    } else {
      params.userId = confirmUser._id;
      params.status = confirmUser.status == 1 ? 2 : 1;
      handleClose();
      updateStatus(params).then((res) => {
        let { status, data } = resHandle(res);
        if (status) {
          toast.success(data.message);
          handleGetUserList();
        }
      });
    }
  };

  const viewaAsker = (id) => {
    history.push("/asker-view/" + id);
  };

  const handleClose = () => {
    setConfirmModal(false);
    setStatusModal(false);
    setIsDeleteModal(false);
    setConfirmUser("");
  };

  const viewaSolver = (id) => {
    history.push("/asker-view/" + id);
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setstate({
      page: pageNumber,
    });
  };

  // all handler end
  let {
    domainListAry,
    search,
    domainName,
    page,
    count,
    loader,
    valTopicName,
    searchByTopic,
    filterType,
    gender,
    getUserListArr,
    searchByDomain,
    topicName,
    solver,
    askerCount,
    userStatus,
    userType,
  } = state;

  return (
    <div className="page_wrapper">
      <Modal show={confirmModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to delete this user?
          </p>
          <div className="d-flex justify-content-center pb-4">
            <button
              onClick={handleClose}
              className="btn btn-dark btn-sm pl-5 pr-5"
            >
              No
            </button>
            <button
              onClick={userStatusUpdate}
              className="btn btn-danger btn-sm ml-3 pl-5 pr-5"
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={statusModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to{" "}
            {confirmUser.status == 1 ? "inactive" : "active"} this user?
          </p>
          <div className="d-flex justify-content-center pb-4">
            <button
              onClick={handleClose}
              className="btn btn-dark btn-sm pl-5 pr-5"
            >
              No
            </button>
            <button
              onClick={userStatusUpdate}
              className="btn btn-danger btn-sm ml-3 pl-5 pr-5"
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="search_bar">
        <i className="fa fa-search" />
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={search}
          name="search"
          onChange={handlerOnChange}
        />
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />
      <div className="twocol sb page_header">
        <h2>Asker Management</h2>

        <div>
          {csvData ? (
            <CSVLink className="btn btn-primary btn-sm" data={csvData}>
              Download CSV
            </CSVLink>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="cm_filters">
        <Select
          classNamePrefix="select"
          placeholder="Filter by country"
          onChange={(e) => (setF_country(e.value), setstate({ page: 1 }))}
          options={[
            { label: "All", value: "" },
            ...countryData.map((i) => ({ value: i.name, label: i.name })),
          ]}
        />

        <Select
          classNamePrefix="select"
          placeholder="Reported Status"
          onChange={(e) => (setReportStatus(e.value), setstate({ page: 1 }))}
          options={[
            { label: "All", value: "" },
            { label: "Yes", value: 1 },
            { label: "No", value: 2 },
          ]}
        />

        <div className="limit_select">
          <Select
            classNamePrefix="select"
            placeholder="Per Page Render"
            onChange={(e) => setLimit(e.value)}
            options={[
              { label: "10", value: 10 },
              { label: "20", value: 20 },
              { label: "30", value: 30 },
              { label: "40", value: 40 },
              { label: "50", value: 50 },
              { label: "75", value: 75 },
              { label: "100", value: 100 },
            ]}
          />
        </div>
      </div>

      <div className="table-responsive cm_card p-0">
        {loader ? (
          <Loader />
        ) : (
          <table className="table table-bordered user-table table-hover align-items-center">
            <thead>
              <tr>
                <th>Actions</th>
                <th>S.No</th>
                <th>Image</th>
                <th>
                  <span className="t_min_w">
                    Asker Name{" "}
                    <i
                      onClick={() => (
                        setSortFeild("name"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-alpha-down${
                        sortFeild == "name" && sortType == "-1" ? "-alt" : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">Email Id</span>
                </th>
                <th>
                  <span className="t_min_w">Phone No.</span>
                </th>
                <th>
                  <span className="t_min_w">
                    DOB{" "}
                    <i
                      onClick={() => (
                        setSortFeild("dob"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "dob" && sortType == "-1" ? "-alt" : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Country{" "}
                    <i
                      onClick={() => (
                        setSortFeild("country"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-alpha-down${
                        sortFeild == "country" && sortType == "-1" ? "-alt" : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    DOJ{" "}
                    <i
                      onClick={() => (
                        setSortFeild("created"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "created" && sortType == "-1" ? "-alt" : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Topic Followed{" "}
                    <i
                      onClick={() => (
                        setSortFeild("topicLength"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "topicLength" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Solver Followed{" "}
                    <i
                      onClick={() => (
                        setSortFeild("followingCount"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "followingCount" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Active Ask{" "}
                    <i
                      onClick={() => (
                        setSortFeild("totalActiveAsk"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "totalActiveAsk" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Total Ask Solved{" "}
                    <i
                      onClick={() => (
                        setSortFeild("askSolvedCount"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "askSolvedCount" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Not Solved Asks{" "}
                    <i
                      onClick={() => (
                        setSortFeild("myNotSolvedAsks"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "myNotSolvedAsks" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
                <th>
                  <span className="t_min_w">Reported Status </span>
                </th>
                <th>
                  <span className="t_min_w">
                    Number of Reports{" "}
                    <i
                      onClick={() => (
                        setSortFeild("reportedUser"),
                        setSortType(sortType == 1 ? "-1" : "1")
                      )}
                      className={`fas fa-sort-numeric-down${
                        sortFeild == "reportedUser" && sortType == "-1"
                          ? "-alt"
                          : ""
                      }`}
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {getUserListArr?.length ? (
                getUserListArr
                  ?.filter((itm) => itm.status !== 3)
                  .map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="action">
                          {item.status == 2 ? (
                            <span
                              onClick={() => (
                                setStatusModal(true), setConfirmUser(item)
                              )}
                            >
                              <i className="fas fa-unlock text-success"></i>
                            </span>
                          ) : (
                            <span
                              onClick={() => (
                                setStatusModal(true), setConfirmUser(item)
                              )}
                            >
                              <i className="fas fa-ban text-warning"></i>
                            </span>
                          )}
                          <span onClick={() => viewaAsker(item._id)}>
                            <i className="fas fa-eye text-primary"></i>
                          </span>
                          <span
                            onClick={() => (
                              setConfirmModal(true),
                              setConfirmUser(item),
                              setIsDeleteModal(true)
                            )}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </div>
                      </td>
                      <td>{(page - 1) * limit + i + 1}</td>
                      <td>
                        <img
                          className="userimg"
                          src={checkUrlType(item.profileImage)}
                          onClick={() => viewaSolver(item._id)}
                        />
                      </td>
                      <td>
                        <span className="text-truncate">
                          {item.name ? item.name : "-"}{" "}
                          {item.lastName && item.lastName}
                        </span>
                      </td>
                      <td>{item.email ? item.email : "-"}</td>
                      <td>
                        <span className="text-truncate">
                          {item.mobile.trim(item.mobile) ? item.mobile : "-"}
                        </span>
                      </td>

                      <td>
                        {item.dob ? moment(item.dob).format("MM-DD-YYYY") : "-"}{" "}
                      </td>
                      <td>{item.country ? item.country : "-"}</td>

                      <td>
                        {item.created &&
                          moment(item.created).format("MM-DD-YYYY")}
                      </td>
                      <td>{item.topicLength}</td>
                      <td>{item.followingCount}</td>
                      {/* <td>{item.totalAsk ? item.totalAsk : '0'}</td> */}
                      <td>{item.totalActiveAsk ? item.totalActiveAsk : "0"}</td>

                      <td>{item.askSolvedCount ? item.askSolvedCount : 0}</td>
                      <td> {item.unSolvedAsks ? item.unSolvedAsks : 0} </td>
                      <td>{item?.reportedUser?.length ? "Yes" : "No"}</td>
                      <td>{item?.reportedUser?.length || 0}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="11">
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

      {getUserListArr?.length ? (
        <div className="text-center">
          <Pagination
            activePage={Number(page)}
            itemsCountPerPage={limit}
            totalItemsCount={Number(askerCount)}
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

export default AskerManagement;
