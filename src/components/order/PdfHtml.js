import React, { useEffect, useState } from "react";
import { getAppUserByCondition } from "../../services/ApiUsers";
import { resHandle } from "../../components/util/utils";
import moment from "moment";
const PdfHtml = (props) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    let users = [
      props.order.userId,
      ...props.order.giftWith.map(({ userId }) => userId),
    ];
    console.log("users", users);
    const promises = users.map((id) =>
      getAppUserByCondition("userId=" + id).then((res) => res.data)
    );

    Promise.all(promises).then((data) => {
      setUserList(data);
    });
  }, []);
  // useEffect(async () => {
  //   await getAppUserByCondition("userId=" + props.order.userId)
  //     .then((res) => {
  //       let { data } = resHandle(res);
  //       setUserObject(data.data);
  //     })
  //     .catch((err) => {});
  // }, []);
  const styles = {
    clearfix: {
      content: "",
      display: "table",
      clear: "both",
    },

    anchor: {
      color: "red",
      textDecoration: "underline",
    },

    bodyClass: {
      position: "relative",
      width: "21cm",
      height: "29.7cm",
      margin: "0 auto",
      color: "#001028",
      background: "#FFFFFF",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      fontFamily: "Arial",
    },

    header: {
      padding: "10px 0",
      marginBottom: "30px",
      content: "",
      clear: "both",
    },

    logo: {
      textAlign: "center",
      marginBottom: "10px",
    },

    logoImg: {
      width: "90px",
    },
    h1: {
      borderTop: "1px solid  #5D6975",
      borderBottom: "1px solid  #5D6975",
      color: "#5D6975",
      textAlign: "center",
      margin: "0 0 20px 0",
    },

    project: {
      float: "left",
    },

    projectSpan: {
      color: "#5D6975",
      width: "52px",
      marginRight: "10px",
      display: "inline-block",
    },
    marginLeft: {
      marginLeft: "20px",
    },

    company: {
      float: "right",
      textAlign: "right",
      content: "",
      display: "table",
      clear: "both",
    },

    projectDiv: {
      whiteSpace: "nowrap",
    },
    companyDiv: {
      whiteSpace: "nowrap",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
      marginBottom: "20px",
    },

    tableTrTd: {
      background: "#F5F5F5",
    },

    tableThTd: {
      textAlign: "center",
    },

    tableTh: {
      padding: "5px 20px",
      color: "#5D6975",
      borderBottom: "1px solid #C1CED9",
      whiteSpace: "nowrap;       ",
      fontWeight: "normal",
    },
    notice: {
      color: "#5D6975",
      fontSize: "1.2em",
    },

    footer: {
      color: "#5D6975",
      width: "100%",
      height: "30px",
      position: "absolute",
      bottom: "0",
      borderTop: "1px solid #C1CED9",
      padding: "8px 0",
      textAlign: "center",
    },
  };
  return (
    <div id="orderPdfHTML">
      {userList.length > 0 && (
        <>
          <header style={styles.header}>
            <div id="logo" style={styles.logo}>
              <img
                style={styles.logoImg}
                src="/static/media/bluelogo.07ca85b2.svg"
              />
            </div>
            <h1 style={styles.h1}>INVOICE</h1>
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
                <span style={styles.projectSpan}>Order No: </span>
                <span style={styles.marginLeft}>{props?.order?.orderId} </span>
              </div>
              <div style={styles.projectDiv}>
                <span style={styles.projectSpan}>Name: </span>{" "}
                <span style={styles.marginLeft}>
                  {userList[0]?.data?.screenName}{" "}
                </span>
              </div>
              <div style={styles.projectDiv}>
                <span style={styles.projectSpan}>Mobile: </span>{" "}
                <span style={styles.marginLeft}>+{userList[0]?.data?.pk} </span>
              </div>
              <div style={styles.projectDiv}>
                <span style={styles.projectSpan}>Date: </span>
                <span style={styles.marginLeft}>
                  {moment(props?.order?.transactionDate).format(
                    "MMMM DD, YYYY"
                  )}
                </span>
              </div>
            </div>
          </header>
          <main>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableTh}>
                  <th style={styles.tableThTd}>Receiver Name</th>
                  <th style={styles.tableThTd}>Product name</th>
                  <th style={styles.tableThTd}>Price</th>
                  <th style={styles.tableThTd}>Quantity</th>
                  <th style={styles.tableThTd}>Total</th>
                </tr>
              </thead>
              <tbody>
                {userList.length - 1 > 0 &&
                  userList?.map(
                    (item, i) =>
                      i > 0 && (
                        <tr>
                          <td>
                            {Object.keys(item.data).length > 0
                              ? item.data.screenName
                              : props.order.giftWith[i - 1].screenName}
                          </td>
                          <td>{props?.order?.orderDetails?.name}</td>
                          <td>
                            {props?.order?.orderDetails?.currencySymbol}{" "}
                            {props?.order?.orderDetails?.amount}
                          </td>
                          <td>1</td>
                          <td>
                            {props?.order?.orderDetails?.currencySymbol}{" "}
                            {props?.order?.orderDetails?.amount}
                          </td>
                        </tr>
                      )
                  )}
                <tr>
                  <td colspan="5"></td>
                </tr>
                <tr>
                  <td colspan="4" class="grand total">
                    GRAND TOTAL
                  </td>
                  <td class="grand total">
                    {props?.order?.orderDetails?.currencySymbol}{" "}
                    {props?.order?.amount}
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div style={styles.notice}>
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          {/* <footer style={styles.footer}>
        Invoice was created on a computer and is valid without the signature and
        seal.
      </footer> */}
        </>
      )}
    </div>
  );
};

export default PdfHtml;
