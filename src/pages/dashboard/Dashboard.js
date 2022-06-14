import React, { useState, useEffect, getData, useCallback, useRef } from 'react';
import { resHandle } from '../../components/util/utils';
import { Bar } from 'react-chartjs-2';
import { Stats } from '../../components/common/Stats';
import { CreditDebitStats } from '../../components/common/CreditDebitStats';
import siteSetting from "../../config/env/Index";
const URL = siteSetting.api.WebSocketUrl;


const Dashboard = () => {
  const [userData, setUserData] = useState({ totalUsers: [0, 10], monthUser: [0, 10], chartDetail: { labels: [], data: [] } });
  const [creditData, setCreditData] = useState({ principalAmount: [0, 0], totalAmount: [0, 0], monthAmount: [0, 0], chartDetail: { labels: [], data: [] } });
  const [debitData, setDebitData] = useState({ totalAmount: [0, 0], monthAmount: [0, 0], chartDetail: { labels: [], data: [] } });
  const isMounted = React.useRef(true);
  const [arrUser, setArrUser] = useState([0]);
  const [arrMonthUser, setArrMonthUser] = useState([0]);
  const [principalAmount, setPrincipalAmount] = useState([0]);
  const [tolCreditAmount, setTolCreditAmount] = useState([0]);
  const [tolMonthCreditAmount, setTolMonthCreditAmount] = useState([0]);


  const [tolDebitAmount, setTolDebitAmount] = useState([0]);
  const [tolMonthDebitAmount, setTolMonthDebitAmount] = useState([0]);


  const clientRef = useRef(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const URL = siteSetting.api.WebSocketUrl;

  useEffect(() => {

    if (waitingToReconnect) {
      return;
    }

    // Only set up the websocket once
    if (!clientRef.current) {
      const client = new WebSocket(URL);
      clientRef.current = client;

      window.client = client;

      client.onerror = (e) => console.error(e);

      client.onopen = () => {
        setIsOpen(true);
        console.log('ws opened');
        client.send('ping');
      };

      client.onclose = () => {
        //debugger;
        console.log('ws closed by server');
        if (clientRef.current) {
          // Connection failed
          console.log('ws closed by server');
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          console.log('ws closed by app component unmount');
          return;
        }

        if (waitingToReconnect) {
          return;
        };

        // Parse event code and log
        setIsOpen(false);
        console.log('ws closed');

        // Setting this will trigger a re-run of the effect,
        // cleaning up the current websocket, but not setting
        // up a new one right away
        setWaitingToReconnect(true);

        // This will trigger another re-run, and because it is false,
        // the socket will be set up again
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };


      client.onmessage = message => {
        console.log('received message', message);
        addMessage(message.data);
      };


      // return () => {

      //   console.log('Cleanup');
      //   // Dereference, so it will set up next time
      //   clientRef.current = null;

      //   client.close();
      // }
    }

  }, [waitingToReconnect]);



  function addMessage(message) {
    let response = JSON.parse(message);
    if (response.userStats) {
      console.log('Receive Data', (response.userStats))
      let dates = response.userStats.analysis.map(function (i) {
        return i.date;
      });
      let userCounts = response.userStats.analysis.map(function (i) {
        return i.userCount;
      });
      let arr = arrUser;
      arr.push(response.userStats["totalUsers"]);
      setArrUser([...arr]);

      let arrMonth = arrMonthUser;
      arrMonth.push(response.userStats["monthUser"]);
      setArrMonthUser([...arrMonth]);

      let userObj = {
        totalUsers: response.userStats["totalUsers"],
        monthUser: response.userStats["monthUser"],
        chartDetail: { labels: dates, data: userCounts }
      }

      setUserData(userObj);

    }
    if (response.creditStats) {

      let dates = response.creditStats.analysis.map(function (i) {
        return i.date;
      });
      let amount = response.creditStats.analysis.map(function (i) {
        return i.amount;
      });
      let principalAmt = parseInt(response.creditStats["principalAmount"]) - (response.creditStats["totalAmount"]);

      let arrPriAmt = principalAmount;
      arrPriAmt.push(principalAmt);
      setPrincipalAmount([...arrPriAmt]);

      let arrtotAmt = tolCreditAmount;
      arrtotAmt.push(response.creditStats["totalAmount"]);
      setTolCreditAmount([...arrtotAmt]);

      let arrtotMonthAmt = tolMonthCreditAmount;
      arrtotMonthAmt.push(response.creditStats["monthAmount"]);
      setTolMonthCreditAmount([...arrtotMonthAmt]);


      let creditObj = {
        principalAmount: principalAmt,
        totalAmount: response.creditStats["totalAmount"],
        monthAmount: response.creditStats["monthAmount"],
        chartDetail: { labels: dates, data: amount }
      }
      setCreditData(creditObj);

    }

    if (response.debitStats) {

      let dates = response.debitStats.analysis.map(function (i) {
        return i.date;
      });
      let amount = response.debitStats.analysis.map(function (i) {
        return i.amount;
      });



      let arrtotDebAmt = tolDebitAmount;
      arrtotDebAmt.push(response.debitStats["totalAmount"]);
      setTolDebitAmount([...arrtotDebAmt]);

      let arrtotMonthDebAmt = tolMonthDebitAmount;
      arrtotMonthDebAmt.push(response.debitStats["monthAmount"]);
      setTolMonthDebitAmount([...arrtotMonthDebAmt]);


      let debitObj = {
        totalAmount: response.debitStats["totalAmount"],
        monthAmount: response.debitStats["monthAmount"],
        chartDetail: { labels: dates, data: amount }
      }
      setDebitData(debitObj);
    }

  };






  return (

    <div className='page_wrapper'>

      <div className="row">

        <Stats {...userData} arrUser={arrUser} arrMonthUser={arrMonthUser} ></Stats>

      </div>
      <div className="row">
        <CreditDebitStats creditData={creditData}
          principalAmount={principalAmount}
          tolCreditAmount={tolCreditAmount}
          tolMonthCreditAmount={tolMonthCreditAmount}
          tolDebitAmount={tolDebitAmount}
          tolMonthDebitAmount={tolMonthDebitAmount}
          debitData={debitData} ></CreditDebitStats>
      </div>
    </div>
  )
}

export default Dashboard
