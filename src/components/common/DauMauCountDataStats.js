import React from "react";
import { Ticker } from "./Ticker";
import "chart.js/auto";

export const DauMauCountDataStats = React.memo((props) => {
  console.log("ppppppppppppppp", props);
  return (
    <>
      <div className="col-sm-12 mt-3">
        <div className="row">
          <div className="col-12 bg-info p-1 mb-1 pl-3 lead text-white">
            DAU & MAU Users
          </div>
          <div className="col-sm-4 dash_sm_card ">
            <Ticker
              title="Last Month Count"
              prefix=""
              start={props[0]?.lastMonthCount}
              end={props[1]?.lastMonthCount}
            />
          </div>
          <div className="col-sm-4 dash_sm_card">
            <Ticker
              title="Last Week Count"
              prefix=""
              start={props[0]?.lastWeekCount}
              end={props[1]?.lastWeekCount}
            />
          </div>
          <div className="col-sm-4 dash_sm_card">
            <Ticker
              title="Current Month Count"
              prefix=""
              start={props[0]?.thisMonthCount}
              end={props[1]?.thisMonthCount}
            />
          </div>
          <div className="col-sm-4 dash_sm_card">
            <Ticker
              title="Current Week Count"
              prefix=""
              start={props[0]?.thisWeekCount}
              end={props[1]?.thisWeekCount}
            />
          </div>
          <div className="col-sm-4 dash_sm_card">
            <Ticker
              title="Today Count"
              prefix=""
              start={props[0]?.todayCount}
              end={props[1]?.todayCount}
            />
          </div>
          <div className="col-sm-4 dash_sm_card">
            <Ticker
              title="Yesterday Count"
              prefix=""
              start={props[0]?.yesterdayCount}
              end={props[1]?.yesterdayCount}
            />
          </div>
        </div>
      </div>
    </>
  );
});
