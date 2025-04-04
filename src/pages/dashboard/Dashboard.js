import React, {
  useState,
  useEffect,
  getData,
  useCallback,
  useRef,
} from "react";
import { resHandle } from "../../components/util/utils";
import { Bar } from "react-chartjs-2";
import { Stats } from "../../components/common/Stats";
import { CreditDebitStats } from "../../components/common/CreditDebitStats";
import { GiftStats } from "../../components/common/GiftStats";
import { DealStats } from "../../components/common/DealStats";
import { OccasionStats } from "../../components/common/ocassionStats";
import { OcassionCategoryStats } from "../../components/common/ocassionCategoryStats";
import siteSetting from "../../config/env/Index";
import {
  userAnalytics,
  userCleverTapLiveCount,
} from "../../services/ApiServices";
import { DauMauCountDataStats } from "../../components/common/DauMauCountDataStats";
import moment from "moment";

const URL = siteSetting.api.WebSocketUrl;

const Dashboard = () => {
  const [userData, setUserData] = useState({
    totalUsers: [0, 10],
    monthUser: [0, 10],
    chartDetail: { labels: [], data: [] },
  });
  const [creditData, setCreditData] = useState({
    principalAmount: [0, 0],
    totalAmount: [0, 0],
    monthAmount: [0, 0],
    chartDetail: { labels: [], data: [] },
  });
  const [debitData, setDebitData] = useState({
    totalAmount: [0, 0],
    monthAmount: [0, 0],
    chartDetail: { labels: [], data: [] },
  });
  const [giftData, setGiftData] = useState({
    totalAmount: [0, 0],
    monthAmount: [0, 0],
    totalOrder: [0, 0],
    monthOrder: [0, 0],
    chartDetail: { labels: [], data: [], numOfOrder: [] },
  });
  const [dealsData, setDealsData] = useState({
    totalAmount: [0, 0],
    monthAmount: [0, 0],
    totalOrder: [0, 0],
    monthOrder: [0, 0],
    chartDetail: { labels: [], data: [], numOfOrder: [] },
  });
  const [occassionData, setOccassionData] = useState({
    totalOccasion: 0,
    monthOccasion: 0,
    giftOccasion: 0,
    sharedOccasion: 0,
    occasionPeroccasion: [],
    chartDetail: { labels: [], data: [] },
  });
  const isMounted = React.useRef(true);
  const [arrUser, setArrUser] = useState([0]);
  const [arrMonthUser, setArrMonthUser] = useState([0]);
  const [principalAmount, setPrincipalAmount] = useState([0]);
  const [tolCreditAmount, setTolCreditAmount] = useState([0]);
  const [tolMonthCreditAmount, setTolMonthCreditAmount] = useState([0]);
  const [liveUserCount, setLiveUserCount] = useState([
    { currentUsers: 0, totalUsers: 0 },
    { currentUsers: 0, totalUsers: 0 },
  ]);
  const [cleverTapLiveUserCount, setCleverTapLiveUserCount] = useState([
    { dailyUsers: 0, weeklyUsers: 0, monthlyUsers: 0 },
    { dailyUsers: 0, weeklyUsers: 0, monthlyUsers: 0 },
  ]);

  const [dauMauCountDataStats, setDauMauCountDataStats] = useState([
    {
      lastMonthCount: 0,
      lastWeekCount: 0,
      thisMonthCount: 0,
      thisWeekCount: 0,
      todayCount: 0,
      yesterdayCount: 0,
    },
    {
      lastMonthCount: 0,
      lastWeekCount: 0,
      thisMonthCount: 0,
      thisWeekCount: 0,
      todayCount: 0,
      yesterdayCount: 0,
    },
  ]);

  const [giftStatsData, setGiftStatsData] = useState([
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
  ]);

  const [transactionsByCurrencyINR, setTransactionsByCurrencyINR] = useState([
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
  ]);

  const [transactionsByCurrencyNPR, setTransactionsByCurrencyNPR] = useState([
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
    {
      currentMonthDealsAmount: 0,
      currentMonthDealsCount: 0,
      currentMonthGiftsAmount: 0,
      currentMonthGiftsCount: 0,
      currentMonthOriginalDealsAmount: 0,
      currentMonthOriginalGiftsAmount: 0,
      historicDealsAmount: 0,
      historicDealsCount: 0,
      historicDealsCounts: 0,
      historicGiftsAmount: 0,
      historicGiftsCount: 0,
      historicOriginalDealsAmount: 0,
      historicOriginalGiftsAmount: 0,
    },
  ]);

  const [giftDataCurrencyINR, setGiftDataCurrencyINR] = useState({
    chartDetail: {
      labels: [],
      totalDeal: [],
      totalDealAmount: [],
      totalGift: [],
      totalGiftAmount: [],
      totalOriginalDealAmount: [],
      totalOriginalGiftAmount: [],
    },
  });
  const [giftDataCurrencyNPR, setGiftDataCurrencyNPR] = useState({
    chartDetail: {
      labels: [],
      totalDeal: [],
      totalDealAmount: [],
      totalGift: [],
      totalGiftAmount: [],
      totalOriginalDealAmount: [],
      totalOriginalGiftAmount: [],
    },
  });

  const [tolDebitAmount, setTolDebitAmount] = useState([0]);
  const [tolMonthDebitAmount, setTolMonthDebitAmount] = useState([0]);

  const [tolDealAmount, setTolDealAmount] = useState([0]);
  const [tolMonthDealAmount, setTolMonthDealAmount] = useState([0]);
  const [tolDealOrder, setTolDealOrder] = useState([0]);
  const [tolMonthDealOrder, setTolMonthDealOrder] = useState([0]);

  const [totOccasion, setTotOccasion] = useState([0]);
  const [monthOccasion, setMonthOccasion] = useState([0]);
  const [giftOccasion, setGiftOccasion] = useState([0]);
  const [sharedOccasion, setSharedOccasion] = useState([0]);
  const [occasionPeroccasion, setOccasionPeroccasion] = useState([0]);
  const [occasionCatgeory, setOccasionCatgeory] = useState({});

  const clientRef = useRef(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const URL = siteSetting.api.WebSocketUrl;

  useEffect(() => {
    getLiveUserCount();
    getCleverTapUserLiveCount();
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      //updateTime();
      console.log("call api", new Date());
      getLiveUserCount();
    }, 30000);

    console.log(`initializing interval11`);
    const interval2 = setInterval(() => {
      //updateTime();
      console.log("call api 2", new Date());
      getCleverTapUserLiveCount();
    }, 300000);

    // return () => {
    //   console.log(`clearing interval`);
    //   clearInterval(interval);
    // };

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
        console.log("ws opened");
        client.send("ping");
      };

      client.onclose = () => {
        console.log("ws closed by server");
        if (clientRef.current) {
          // Connection failed
          console.log("ws closed by server");
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          console.log("ws closed by app component unmount");
          return;
        }

        if (waitingToReconnect) {
          return;
        }

        // Parse event code and log
        setIsOpen(false);
        console.log("ws closed");

        // Setting this will trigger a re-run of the effect,
        // cleaning up the current websocket, but not setting
        // up a new one right away
        setWaitingToReconnect(true);

        // This will trigger another re-run, and because it is false,
        // the socket will be set up again
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (message) => {
        console.log("received message", message, JSON.parse(message.data));
        addMessage(message.data);
      };

      return () => {
        console.log("Cleanup");
        // Dereference, so it will set up next time
        clientRef.current = null;

        client.close();
      };
    }
  }, []);

  function addMessage(message) {
    let response = JSON.parse(message);
    if (response.userStats) {
      console.log("Receive Data", response.userStats);
      let dates = response.userStats.analysis.map(function (i) {
        return moment(i.date).format("DD-MM-YY");
      });
      dates = dates.reverse();
      let userCounts = response.userStats.analysis.map(function (i) {
        return i.userCount;
      });
      userCounts = userCounts.reverse();
      let arr = [arrUser.pop()];
      arr.push(response.userStats["totalUsers"]);
      setArrUser([...arr]);

      let arrMonth = [arrMonthUser.pop()];
      arrMonth.push(response.userStats["monthUser"]);
      setArrMonthUser([...arrMonth]);

      let userObj = {
        totalUsers: response.userStats["totalUsers"],
        monthUser: response.userStats["monthUser"],
        chartDetail: { labels: dates, data: userCounts },
      };

      setUserData(userObj);
    }
    if (response.creditStats) {
      let dates = response.creditStats.analysis.map(function (i) {
        return moment(i.date).format("DD-MM-YY");
      });
      dates = dates.reverse();
      let amount = response.creditStats.analysis.map(function (i) {
        return i.amount;
      });
      amount = amount.reverse();
      let principalAmt =
        parseInt(response.creditStats["principalAmount"]) -
        response.creditStats["totalAmount"];

      let arrPriAmt = [principalAmount.pop()];
      arrPriAmt.push(principalAmt);
      setPrincipalAmount([...arrPriAmt]);

      let arrtotAmt = [tolCreditAmount.pop()];
      arrtotAmt.push(response.creditStats["totalAmount"]);
      setTolCreditAmount([...arrtotAmt]);

      let arrtotMonthAmt = [tolMonthCreditAmount.pop()];
      arrtotMonthAmt.push(response.creditStats["monthAmount"]);
      setTolMonthCreditAmount([...arrtotMonthAmt]);

      let creditObj = {
        principalAmount: principalAmt,
        totalAmount: response.creditStats["totalAmount"],
        monthAmount: response.creditStats["monthAmount"],
        chartDetail: { labels: dates, data: amount },
      };
      setCreditData(creditObj);
    }

    if (response.debitStats) {
      let dates = response.debitStats.analysis.map(function (i) {
        return moment(i.date).format("DD-MM-YY");
      });
      dates = dates.reverse();
      let amount = response.debitStats.analysis.map(function (i) {
        return i.amount;
      });
      amount = amount.reverse();

      let arrtotDebAmt = [tolDebitAmount.pop()];
      arrtotDebAmt.push(response.debitStats["totalAmount"]);
      setTolDebitAmount([...arrtotDebAmt]);

      let arrtotMonthDebAmt = [tolMonthDebitAmount.pop()];
      arrtotMonthDebAmt.push(response.debitStats["monthAmount"]);
      setTolMonthDebitAmount([...arrtotMonthDebAmt]);

      let debitObj = {
        totalAmount: response.debitStats["totalAmount"],
        monthAmount: response.debitStats["monthAmount"],
        chartDetail: { labels: dates, data: amount },
      };
      setDebitData(debitObj);
    }

    if (response.giftStats) {
      if (Array.isArray(response.giftStats.dealsAndGiftsByDates)) {
        let dates = response.giftStats.dealsAndGiftsByDates.map(function (i) {
          return moment(i.date).format("DD-MM-YY");
        });
        dates = dates.reverse();

        let totalDeal = response.giftStats.dealsAndGiftsByDates.map(function (
          i
        ) {
          return i.totalDeal;
        });
        totalDeal = totalDeal.reverse();

        let totalDealAmount = response.giftStats.dealsAndGiftsByDates.map(
          function (i) {
            return i.totalDealAmount;
          }
        );
        totalDealAmount = totalDealAmount.reverse();

        let totalGift = response.giftStats.dealsAndGiftsByDates.map(function (
          i
        ) {
          return i.totalGift;
        });
        totalGift = totalGift.reverse();

        let totalGiftAmount = response.giftStats.dealsAndGiftsByDates.map(
          function (i) {
            return i.totalGiftAmount;
          }
        );
        totalGiftAmount = totalGiftAmount.reverse();

        let totalOriginalDealAmount =
          response.giftStats.dealsAndGiftsByDates.map(function (i) {
            return i.totalOriginalDealAmount;
          });
        totalOriginalDealAmount = totalOriginalDealAmount.reverse();

        let totalOriginalGiftAmount =
          response.giftStats.dealsAndGiftsByDates.map(function (i) {
            return i.totalOriginalGiftAmount;
          });
        totalOriginalGiftAmount = totalOriginalGiftAmount.reverse();
        let giftObj = {
          chartDetail: {
            labels: dates,
            totalDeal: totalDeal,
            totalDealAmount: totalDealAmount,
            totalGift: totalGift,
            totalGiftAmount: totalGiftAmount,
            totalOriginalDealAmount: totalOriginalDealAmount,
            totalOriginalGiftAmount: totalOriginalGiftAmount,
          },
        };
        setGiftData(giftObj);
      }

      let arrGiftStatsData = [giftStatsData.pop()];
      let obj = {
        currentMonthDealsAmount: response.giftStats["currentMonthDealsAmount"],
        currentMonthDealsCount: response.giftStats["currentMonthDealsCount"],
        currentMonthGiftsAmount: response.giftStats["currentMonthGiftsAmount"],
        currentMonthGiftsCount: response.giftStats["currentMonthGiftsCount"],
        currentMonthOriginalDealsAmount:
          response.giftStats["currentMonthOriginalDealsAmount"],
        currentMonthOriginalGiftsAmount:
          response.giftStats["currentMonthOriginalGiftsAmount"],
        historicDealsAmount: response.giftStats["historicDealsAmount"],
        historicDealsCount: response.giftStats["historicDealsCount"],
        historicDealsCounts: response.giftStats["historicDealsCounts"],
        historicGiftsAmount: response.giftStats["historicGiftsAmount"],
        historicGiftsCount: response.giftStats["historicGiftsCount"],
        historicOriginalDealsAmount:
          response.giftStats["historicOriginalDealsAmount"],
        historicOriginalGiftsAmount:
          response.giftStats["historicOriginalGiftsAmount"],
      };
      arrGiftStatsData.push(obj);
      setGiftStatsData([...arrGiftStatsData]);

      if (response.giftStats.transactionsByCurrency) {
        if (response.giftStats.transactionsByCurrency.INR) {
          let INRdates =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return moment(i.date).format("DD-MM-YY");
              }
            );
          INRdates = INRdates.reverse();

          let INRtotalDeal =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalDeal;
              }
            );
          INRtotalDeal = INRtotalDeal.reverse();

          let INRtotalDealAmount =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalDealAmount;
              }
            );
          INRtotalDealAmount = INRtotalDealAmount.reverse();

          let INRtotalGift =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalGift;
              }
            );
          INRtotalGift = INRtotalGift.reverse();

          let INRtotalGiftAmount =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalGiftAmount;
              }
            );
          INRtotalGiftAmount = INRtotalGiftAmount.reverse();

          let INRtotalOriginalDealAmount =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalOriginalDealAmount;
              }
            );
          INRtotalOriginalDealAmount = INRtotalOriginalDealAmount.reverse();

          let INRtotalOriginalGiftAmount =
            response.giftStats.transactionsByCurrency.INR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalOriginalGiftAmount;
              }
            );
          INRtotalOriginalGiftAmount = INRtotalOriginalGiftAmount.reverse();

          let giftObjINR = {
            chartDetail: {
              labels: INRdates,
              totalDeal: INRtotalDeal,
              totalDealAmount: INRtotalDealAmount,
              totalGift: INRtotalGift,
              totalGiftAmount: INRtotalGiftAmount,
              totalOriginalDealAmount: INRtotalOriginalDealAmount,
              totalOriginalGiftAmount: INRtotalOriginalGiftAmount,
            },
          };
          setGiftDataCurrencyINR(giftObjINR);
          let arrInr = [transactionsByCurrencyINR.pop()];
          let INRObj = {
            currentMonthDealsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthDealsAmount"
              ],
            currentMonthDealsCount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthDealsCount"
              ],
            currentMonthGiftsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthGiftsAmount"
              ],
            currentMonthGiftsCount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthGiftsCount"
              ],
            currentMonthOriginalDealsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthOriginalDealsAmount"
              ],
            currentMonthOriginalGiftsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "currentMonthOriginalGiftsAmount"
              ],
            historicDealsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "historicDealsAmount"
              ],
            historicDealsCount:
              response.giftStats.transactionsByCurrency.INR[
                "historicDealsCount"
              ],
            historicDealsCounts:
              response.giftStats.transactionsByCurrency.INR[
                "historicDealsCounts"
              ],
            historicGiftsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "historicGiftsAmount"
              ],
            historicGiftsCount:
              response.giftStats.transactionsByCurrency.INR[
                "historicGiftsCount"
              ],
            historicOriginalDealsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "historicOriginalDealsAmount"
              ],
            historicOriginalGiftsAmount:
              response.giftStats.transactionsByCurrency.INR[
                "historicOriginalGiftsAmount"
              ],
          };
          arrInr.push(INRObj);
          setTransactionsByCurrencyINR([...arrInr]);
        }

        if (response.giftStats.transactionsByCurrency.NPR) {
          let NPRdates =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return moment(i.date).format("DD-MM-YY");
              }
            );
          NPRdates = NPRdates.reverse();

          let NPRtotalDeal =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalDeal;
              }
            );
          NPRtotalDeal = NPRtotalDeal.reverse();

          let NPRtotalDealAmount =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalDealAmount;
              }
            );
          NPRtotalDealAmount = NPRtotalDealAmount.reverse();

          let NPRtotalGift =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalGift;
              }
            );
          NPRtotalGift = NPRtotalGift.reverse();

          let NPRtotalGiftAmount =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalGiftAmount;
              }
            );
          NPRtotalGiftAmount = NPRtotalGiftAmount.reverse();

          let NPRtotalOriginalDealAmount =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalOriginalDealAmount;
              }
            );
          NPRtotalOriginalDealAmount = NPRtotalOriginalDealAmount.reverse();

          let NPRtotalOriginalGiftAmount =
            response.giftStats.transactionsByCurrency.NPR.dealsAndGiftsByDates.map(
              function (i) {
                return i.totalOriginalGiftAmount;
              }
            );
          NPRtotalOriginalGiftAmount = NPRtotalOriginalGiftAmount.reverse();

          let giftObjNPR = {
            chartDetail: {
              labels: NPRdates,
              totalDeal: NPRtotalDeal,
              totalDealAmount: NPRtotalDealAmount,
              totalGift: NPRtotalGift,
              totalGiftAmount: NPRtotalGiftAmount,
              totalOriginalDealAmount: NPRtotalOriginalDealAmount,
              totalOriginalGiftAmount: NPRtotalOriginalGiftAmount,
            },
          };
          setGiftDataCurrencyNPR(giftObjNPR);

          let arrNPR = [transactionsByCurrencyNPR.pop()];
          let NPRObj = {
            currentMonthDealsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthDealsAmount"
              ],
            currentMonthDealsCount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthDealsCount"
              ],
            currentMonthGiftsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthGiftsAmount"
              ],
            currentMonthGiftsCount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthGiftsCount"
              ],
            currentMonthOriginalDealsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthOriginalDealsAmount"
              ],
            currentMonthOriginalGiftsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "currentMonthOriginalGiftsAmount"
              ],
            historicDealsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicDealsAmount"
              ],
            historicDealsCount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicDealsCount"
              ],
            historicDealsCounts:
              response.giftStats.transactionsByCurrency.NPR[
                "historicDealsCounts"
              ],
            historicGiftsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicGiftsAmount"
              ],
            historicGiftsCount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicGiftsCount"
              ],
            historicOriginalDealsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicOriginalDealsAmount"
              ],
            historicOriginalGiftsAmount:
              response.giftStats.transactionsByCurrency.NPR[
                "historicOriginalGiftsAmount"
              ],
          };
          arrNPR.push(NPRObj);
          setTransactionsByCurrencyNPR([...arrNPR]);
        }
      }
    }

    if (response.dealStats) {
      let dates = response.dealStats.analysis.map(function (i) {
        return moment(i.date).format("DD-MM-YY");
      });
      dates = dates.reverse();
      let amount = response.dealStats.analysis.map(function (i) {
        return i.amount;
      });
      amount = amount.reverse();
      let numOfOrder = response.dealStats.analysis.map(function (i) {
        return i.numOfOrder;
      });
      numOfOrder = numOfOrder.reverse();

      let arrtotDealAmt = [tolDealAmount.pop()];
      arrtotDealAmt.push(response.dealStats["totalAmount"]);
      setTolDealAmount([...arrtotDealAmt]);

      let arrtotMonthDealAmt = [tolMonthDealAmount.pop()];
      arrtotMonthDealAmt.push(response.dealStats["monthAmount"]);
      setTolMonthDealAmount([...arrtotMonthDealAmt]);

      let arrtotDealOrder = [tolDealOrder.pop()];
      arrtotDealOrder.push(response.dealStats["totalOrder"]);
      setTolDealAmount([...arrtotDealOrder]);

      let arrtotMonthDealOrder = [tolMonthDealAmount.pop()];
      arrtotMonthDealOrder.push(response.dealStats["monthOrder"]);
      setTolMonthDealAmount([...arrtotMonthDealOrder]);

      let dealObj = {
        totalAmount: response.dealStats["totalAmount"],
        monthAmount: response.dealStats["monthAmount"],
        totalOrder: response.dealStats["totalOrder"],
        monthOrder: response.dealStats["monthOrder"],
        chartDetail: { labels: dates, data: amount, numOfOrder: numOfOrder },
      };
      setDealsData(dealObj);
    }
    let dates = [];
    let occasionCount = [];
    // if (response.occasionStats) {
    //   if (Object.keys(response.occasionStats.occasionsByDates).length > 0) {
    //     dates = response.occasionStats.occasionsByDates.map(function (i) {
    //       return moment(i.date).format('DD-MM-YY');
    //     });
    //     dates = dates.reverse();
    //     occasionCount = response.occasionStats.occasionsByDates.map(function (i) {
    //       return i.total;
    //     });
    //     occasionCount = occasionCount.reverse();

    //   }

    //   let arrtotalOccasion = [totOccasion.pop()];
    //   arrtotalOccasion.push(response.occasionStats["totalOccasions"]);
    //   setTotOccasion([...arrtotalOccasion]);

    //   let arrMonthOccasion = [monthOccasion.pop()];
    //   arrMonthOccasion.push(response.occasionStats["currentMonthOccasions"]);
    //   setMonthOccasion([...arrMonthOccasion]);

    //   let arrGiftOccasion = [giftOccasion.pop()];
    //   arrGiftOccasion.push(response.occasionStats["totalOccasionsWithGift"]);
    //   setGiftOccasion([...arrGiftOccasion]);

    //   let arrSharedOccasion = [sharedOccasion.pop()];
    //   arrSharedOccasion.push(response.occasionStats["currentMonthOccasionsWithGift"]);
    //   setSharedOccasion([...arrSharedOccasion]);

    //   let occasionObj = {
    //     totalOccasion: response.occasionStats["totalOccasions"],
    //     monthOccasion: response.occasionStats["currentMonthOccasions"],
    //     giftOccasion: response.occasionStats["totalOccasionsWithGift"],
    //     sharedOccasion: response.occasionStats["currentMonthOccasionsWithGift"],
    //     chartDetail: { labels: dates, data: occasionCount },

    //   }
    //   setOccassionData(occasionObj);
    //   setOccasionCatgeory(response.occasionStats["occasionByCategory"])
    // }

    if (response.DauMauCountDataStats) {
      let arrDauMauCountStatsData = [dauMauCountDataStats.pop()];
      let obj = {
        lastMonthCount: response.DauMauCountDataStats["lastMonthCount"],
        lastWeekCount: response.DauMauCountDataStats["lastWeekCount"],
        thisMonthCount: response.DauMauCountDataStats["thisMonthCount"],
        thisWeekCount: response.DauMauCountDataStats["thisWeekCount"],
        todayCount: response.DauMauCountDataStats["todayCount"],
        yesterdayCount: response.DauMauCountDataStats["yesterdayCount"],
      };
      arrDauMauCountStatsData.push(obj);
      setDauMauCountDataStats([...arrDauMauCountStatsData]);
    }
  }

  const getLiveUserCount = () => {
    userAnalytics()
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          let obj = liveUserCount[liveUserCount.length - 1];
          let dt = [obj];
          dt.push({
            currentUsers: parseInt(data.currentUsers),
            totalUsers: parseInt(data.totalUsers),
          });
          setLiveUserCount(dt);
        } else {
          console.log("error", status, data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getCleverTapUserLiveCount = () => {
    let date = new Date().toJSON().slice(0, 10).toString();
    userCleverTapLiveCount(date)
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          if (Object.keys(data).length > 0) {
            let obj = cleverTapLiveUserCount[cleverTapLiveUserCount.length - 1];
            let dt = [obj];
            dt.push({
              dailyUsers: parseInt(data.dailyUsers),
              weeklyUsers: parseInt(data.weeklyUsers),
              monthlyUsers: parseInt(data.monthlyUsers),
            });
            setCleverTapLiveUserCount(dt);
          } else {
            getCleverTapUserLiveCount();
          }
        } else {
          console.log("error", status, data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="page_wrapper">
      <div className="row">
        <Stats
          {...userData}
          arrUser={arrUser}
          arrMonthUser={arrMonthUser}
          cleverTapLiveUserCount={cleverTapLiveUserCount}
          liveUser={liveUserCount}
        ></Stats>
      </div>
      <div className="row">
        <DauMauCountDataStats {...dauMauCountDataStats}></DauMauCountDataStats>
      </div>
      <div className="row">
        <CreditDebitStats
          creditData={creditData}
          principalAmount={principalAmount}
          tolCreditAmount={tolCreditAmount}
          tolMonthCreditAmount={tolMonthCreditAmount}
          tolDebitAmount={tolDebitAmount}
          tolMonthDebitAmount={tolMonthDebitAmount}
          debitData={debitData}
        ></CreditDebitStats>
      </div>

      {/* <div className="row">
        <div className="col-12 bg-info p-1 mb-1 pl-3 lead text-white">
          Deals & Gifts
        </div>
      </div>
      <div className="row">
        <GiftStats {...giftData} giftStatsData={giftStatsData}></GiftStats>
      </div> */}

      <div className="row">
        <div className="col-12 bg-info p-1 mb-1 pl-3 lead text-white">
          Transactions By Currency (INR)
        </div>
      </div>
      <div className="row">
        <GiftStats
          {...giftDataCurrencyINR}
          giftStatsData={transactionsByCurrencyINR}
        ></GiftStats>
      </div>

      <div className="row">
        <div className="col-12 bg-info p-1 mb-1 pl-3 lead text-white">
          Transactions By Currency (NPR)
        </div>
      </div>
      <div className="row">
        <GiftStats
          {...giftDataCurrencyNPR}
          giftStatsData={transactionsByCurrencyNPR}
        ></GiftStats>
      </div>

      <div className="row">
        <DealStats
          {...dealsData}
          tolDealAmount={tolDealAmount}
          tolMonthDealAmount={tolMonthDealAmount}
          tolDealOrder={tolDealOrder}
          tolMonthDealOrder={tolMonthDealOrder}
        ></DealStats>
      </div>

      {/* <div className="row">

        <OccasionStats {...occassionData} arrTotalOccasionData={totOccasion} arrMonthOccasion={monthOccasion}
          arrGiftOccasion={giftOccasion} arrSharedOccasion={sharedOccasion} ></OccasionStats>

      </div> */}

      {/* {Object.keys(occasionCatgeory).length > 0 && (
        Object.keys(occasionCatgeory)?.map((item, i) => (

          <div className='row'>
            <OcassionCategoryStats occassionName={item} {...occasionCatgeory[item]} ></OcassionCategoryStats>

          </div>
        )))} */}
    </div>
  );
};

export default Dashboard;
