import React, { useState, useEffect, getData, useCallback, useRef } from 'react';
import { resHandle } from '../../components/util/utils';
import { Bar } from 'react-chartjs-2';
import { Stats } from '../../components/common/Stats';
import { CreditDebitStats } from '../../components/common/CreditDebitStats';


const Dashboard = () => {
  const [userData, setUserData] = useState({ totalUsers: [0, 10], monthUser: [0, 10], chartDetail: { labels: [], data: [] } });
  const [creditData, setCreditData] = useState({ principalAmount: [0, 0], totalAmount: [0, 0], monthAmount: [0, 0], chartDetail: { labels: [], data: [] } });
  const [debitData, setDebitData] = useState({ totalAmount: [0, 0], monthAmount: [0, 0], chartDetail: { labels: [], data: [] } });
  const isMounted = React.useRef(true);
  const [tolUser, setTolUser] = useState(0);
  const [tolMonthUser, setTolMonthUser] = useState(0);
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [tolCreditAmount, setTolCreditAmount] = useState(0);
  const [tolMonthCreditAmount, setTolMonthCreditAmount] = useState(0);
  const [tolDebitAmount, setTolDebitAmount] = useState(0);
  const [tolMonthDebitAmount, setTolMonthDebitAmount] = useState(0);
  let count = 0;

  useEffect(() => {
    //if (isMounted.current) {
    const ws = new WebSocket('wss://pct2wzxhg8.execute-api.eu-central-1.amazonaws.com/dev');

    ws.onopen = () => {
      console.log("connection open");
      ws.send(JSON.stringify({}));
    };
    ws.onmessage = (event) => {
      console.log('Receive Data', JSON.parse(event.data), event)
      let response = JSON.parse(event.data);
      if (response.userStats) {

        let dates = response.userStats.analysis.map(function (i) {
          return i.date;
        });
        let userCounts = response.userStats.analysis.map(function (i) {
          return i.userCount;
        });
        console.log('11111', tolUser, tolMonthUser);
        let userObj = {
          totalUsers: [tolUser, response.userStats["totalUsers"]],
          monthUser: [tolMonthUser, response.userStats["monthUser"]],
          chartDetail: { labels: dates, data: userCounts }
        }

        console.log('2222', tolUser, tolMonthUser);
        setUserData(userObj);

        setTolUser(response.userStats["totalUsers"])

        setTolMonthUser(response.userStats["monthUser"]);

        console.log('3333', tolUser, tolMonthUser);
      }
      if (response.creditStats) {

        let dates = response.creditStats.analysis.map(function (i) {
          return i.date;
        });
        let amount = response.creditStats.analysis.map(function (i) {
          return i.amount;
        });
        let principalAmt = parseInt(response.creditStats["principalAmount"]) - (response.creditStats["totalAmount"]);

        let creditObj = {
          principalAmount: [principalAmount, principalAmt],
          totalAmount: [tolCreditAmount, response.creditStats["totalAmount"]],
          monthAmount: [tolMonthCreditAmount, response.creditStats["monthAmount"]],
          chartDetail: { labels: dates, data: amount }
        }
        setCreditData(creditObj);
        setPrincipalAmount(principalAmt);
        setTolCreditAmount(response.creditStats["totalAmount"]);
        setTolMonthCreditAmount(response.creditStats["monthAmount"]);
      }

      if (response.debitStats) {

        let dates = response.debitStats.analysis.map(function (i) {
          return i.date;
        });
        let amount = response.debitStats.analysis.map(function (i) {
          return i.amount;
        });
        let debitObj = {
          totalAmount: [tolDebitAmount, response.debitStats["totalAmount"]],
          monthAmount: [tolMonthDebitAmount, response.debitStats["monthAmount"]],
          chartDetail: { labels: dates, data: amount }
        }
        setDebitData(debitObj);
        setTolDebitAmount(response.debitStats["totalAmount"]);
        setTolMonthDebitAmount(response.debitStats["monthAmount"]);
      }
    };
    // return () => {
    //   isMounted.current = false;
    // };
    //}
  }, [tolUser, tolMonthUser, principalAmount, tolMonthCreditAmount, tolCreditAmount, tolDebitAmount, tolMonthDebitAmount]);

  return (
    <div className='page_wrapper'>
      <div className="row">
        <Stats {...userData} ></Stats>
      </div>
      <div className="row">
        <CreditDebitStats creditData={creditData} debitData={debitData} ></CreditDebitStats>
      </div>
    </div>
  )
}

export default Dashboard
