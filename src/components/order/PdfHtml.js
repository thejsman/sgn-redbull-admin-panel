import React, { useEffect, useState } from "react";
import { getAppUserByCondition } from "../../services/ApiUsers";
import moment from "moment";
const PdfHtml = (props) => {
  const [userList, setUserList] = useState([]);
  let users = [];
  useEffect(() => {
    if (props.order.giftWith && props.order.giftWith.length > 0) {
      users = [
        props.order.userId,
        ...props.order.giftWith.map(({ userId }) => userId),
      ];
    } else {
      users = [props.order.userId];
    }

    console.log(props.order);
    const promises = users.map((id) =>
      getAppUserByCondition("userId=" + id).then((res) => res.data)
    );
    Promise.all(promises).then((data) => {
      setUserList(data);
    });
  }, []);
  const styles = {
    clearfix: {
      content: "",
      display: "table",
      clear: "both",
    },
    mainContainer: {
      fontSize: "13px",
      fontFamily: "Times New Roman",
    },
    nameContainer: {
      lineHeight: "20px",
    },
    anchor: {
      color: "red",
    },
    header: {
      padding: "10px 0",
      marginBottom: "30px",
      clear: "both",
      fontFamily: "Times New Roman",
    },
    body: {
      height: "187mm",
      position: "relative",
    },
    logo: {
      textAlign: "center",
      marginBottom: "10px",
    },
    logoImg: {
      width: "120px",
    },
    h1: {
      borderTop: "1px solid  #C1CED9",
      borderBottom: "1px solid  #C1CED9",
      color: "#5D6975",
      textAlign: "center",
      margin: "0 0 20px 0",
      fontSize: "24px",
      fontWeight: "600",
      padding: "5px",
    },
    gtBorder: {
      borderBottom: "1px solid #C1CED9",
      borderTop: "1px solid #C1CED9",
      textAlign: "right",
    },
    project: {
      float: "left",
      fontSize: "13px",
    },

    projectSpan: {
      color: "#5D6975",
      width: "68px",
      display: "inline-block",
    },
    marginLeft: {
      marginLeft: "3px",
    },

    company: {
      float: "right",
      textAlign: "right",
      display: "table",
      clear: "both",
      fontSize: "13px",
      marginBottom: "10px",
    },

    projectDiv: {},
    companyDiv: {},

    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "1",
      marginBottom: "20px",
    },

    tableTrTd: {
      background: "#F5F5F5",
    },

    tableThCenter: {
      textAlign: "center",
    },
    tableThLeft: {
      textAlign: "left",
    },
    tableThRight: {
      textAlign: "right",
    },
    tableTh: {
      padding: "5px 20px",
      color: "#5D6975",
      borderBottom: "1px solid #C1CED9",
      fontWeight: "normal",
    },
    notice: {
      color: "#5D6975",
      fontSize: "10px",
      fontStyle: "italic",
    },

    footer: {
      color: "#5D6975",
      width: "100%",
      height: "20px",
      position: "absolute",
      bottom: "0",
      padding: "5px 0",
      textAlign: "center",
    },
  };
  return (
    <div id="orderPdfHTML">
      {userList.length > 0 && (
        <div style={styles.body}>
          <div style={styles.header}>
            <div id="logo" style={styles.logo}>
              <img style={styles.logoImg} src="/invoice-logo.jpg" />
            </div>
            <div style={styles.h1}>INVOICE</div>
            <div style={styles.nameContainer}>
              <div id="company" style={styles.company}>
                <div style={styles.companyDiv}>SAGOON INDIA PVT. LTD.</div>
                <div style={styles.companyDiv}>
                  IS-203, 3rd Floor, UTC Urbtech,
                  <br />
                  Sector 132, Noida-201304
                </div>
                <div style={styles.companyDiv}>+91 9319397629 </div>
                <div style={styles.companyDiv}>
                  <a style={styles.anchor} href="mailto:support@sagoon.com">
                    support@sagoon.com
                  </a>
                </div>
              </div>
              <div id="project" style={styles.project}>
                <div style={styles.projectDiv}>
                  <span style={styles.projectSpan}>Order No:</span>
                  <span style={styles.marginLeft}>{props?.order?.orderId}</span>
                </div>
                <div style={styles.projectDiv}>
                  <span style={styles.projectSpan}>Name:</span>
                  <span style={styles.marginLeft}>
                    {userList[0]?.data?.screenName}
                  </span>
                </div>
                <div style={styles.projectDiv}>
                  <span style={styles.projectSpan}>Mobile:</span>
                  <span style={styles.marginLeft}>
                    +{userList[0]?.data?.pk}{" "}
                  </span>
                </div>
                <div style={styles.projectDiv}>
                  <span style={styles.projectSpan}>Date:</span>
                  <span style={styles.marginLeft}>
                    {moment(props?.order?.transactionDate).format(
                      "MMMM DD, YYYY"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.mainContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableTh}>
                  <th style={styles.tableThLeft}>RECEIVER</th>
                  <th style={styles.tableThLeft}>PRODUCT</th>
                  <th style={styles.tableThCenter}>PRICE</th>
                  <th style={styles.tableThCenter}>QTY</th>
                  <th style={styles.tableThRight}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {userList.length - 1 > 0 &&
                  userList?.map(
                    (item, i) =>
                      i > 0 && (
                        <tr key={i}>
                          <td style={styles.tableThLeft}>
                            {Object.keys(item.data).length > 0
                              ? item.data.screenName
                              : props.order.giftWith[i - 1].screenName}
                          </td>
                          <td style={styles.tableThLeft}>
                            {props?.order?.orderDetails?.name}
                          </td>
                          <td style={styles.tableThCenter}>
                            <b>
                              <small>
                                {props?.order?.currencyCode === "INR" ? (
                                  <img
                                    src="/rupee.png"
                                    style={{ width: "11px" }}
                                  />
                                ) : (
                                  props?.order?.currencySymbol
                                )}
                              </small>
                              {props?.order?.orderDetails?.amount}
                            </b>
                          </td>
                          <td style={styles.tableThCenter}>
                            <b>1</b>
                          </td>
                          <td style={styles.tableThRight}>
                            <b>
                              <small>
                                {props?.order?.currencyCode === "INR" ? (
                                  <img
                                    src="/rupee.png"
                                    style={{ width: "11px" }}
                                  />
                                ) : (
                                  props?.order?.currencySymbol
                                )}
                              </small>
                              {props?.order?.orderDetails?.amount}
                            </b>
                          </td>
                        </tr>
                      )
                  )}
                <tr>
                  <td colSpan="4" style={styles.gtBorder}>
                    <b> GRAND TOTAL </b>
                  </td>
                  <td style={styles.gtBorder}>
                    <b>
                      <small>
                        {props?.order?.currencyCode === "INR" ? (
                          <img src="/rupee.png" style={{ width: "11px" }} />
                        ) : (
                          props?.order?.currencySymbol
                        )}
                      </small>
                      {props?.order?.amount}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="notices" style={styles.footer}>
            <div style={styles.notice}>
              <b>NOTICE: </b> A finance charge of 1.5 % will be made on unpaid
              balances after 30 days.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfHtml;
