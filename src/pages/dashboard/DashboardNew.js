import React, {
  useState,
  useEffect,
  getData,
  useCallback,
  useRef,
} from "react";

import { transactionStats, celebrationStats } from "../../services/ApiServices";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/common/loader";

const DashboardNew = () => {
  const [celebrationStatsObj, setCelebrationStatsObj] = useState({});
  const [transactionStatsObj, setTransactionStatsObj] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getCelebrationStats();
    getTransactionStats();
  }, []);
  const getCelebrationStats = () => {
    setLoader(true);
    celebrationStats()
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          setCelebrationStatsObj(data.data);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
        setCelebrationStatsObj({});
      });
  };
  const getTransactionStats = () => {
    setLoader(true);
    transactionStats()
      .then((res) => {
        let { status, data } = resHandle(res);
        if (status === 200) {
          setLoader(false);
          setTransactionStatsObj(data.data);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
        setTransactionStatsObj({});
      });
  };
  return (
    <div className="page_wrapper mt-5">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="row">
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">Total installs</div>
                <div className="card-body card_color">221</div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">Total Web Users</div>
                <div className="card-body card_color">53</div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">
                  Monthly Active Users
                </div>
                <div className="card-body card_color">538</div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">
                  Weekly Active Users
                </div>
                <div className="card-body card_color">141</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">
                  Total Celebrations
                </div>
                <div className="card-body card_color">
                  {celebrationStatsObj?.totalCelebration}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">
                  Total People Participating in Celebrations
                </div>
                <div className="card-body card_color">251</div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">Total Confetti</div>
                <div className="card-body card_color">
                  {" "}
                  {celebrationStatsObj?.confettiCount}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">Total Messages</div>
                <div className="card-body card_color">
                  {" "}
                  {celebrationStatsObj?.messageCount}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">Total Gifts</div>
                <div className="card-body card_color">
                  {" "}
                  {transactionStatsObj?.totalGift}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 dash_sm_card ">
              {" "}
              <div className="card ">
                <div className="card-header btn-primary">
                  Total value of Gifts
                </div>
                <div className="card-body card_color">
                  {" "}
                  {transactionStatsObj?.totalGiftAmount}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default DashboardNew;
