import React from "react";
import { Ticker } from './Ticker'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'



export const DealStats = React.memo((props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
        },
    };

    const labels = props.chartDetail.labels;


    const data = {
        labels,
        datasets: [
            {
                label: 'Amount',
                data: props.chartDetail.data,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: 'No Of Order',
                data: props.chartDetail.numOfOrder,
                fill: true,
                backgroundColor: "#9e9ce7",
                borderColor: "#4644d1"
            },
        ],
    };


    return (
        <>
            <div className="col-sm-6 mt-3">
                <div className="row">
                    <div className="col-sm-6 dash_sm_card ">
                        <Ticker title="Total Deal Amount" start={props.tolDealAmount[props.tolDealAmount.length - 2]} end={props.totalAmount} />


                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Deal Amount" start={props.tolMonthDealAmount[props.tolMonthDealAmount.length - 2]} end={props.monthAmount} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 dash_sm_card ">
                        <Ticker title="Total Deal Order" start={props.tolDealOrder[props.tolDealOrder.length - 2]} end={props.totalOrder} />


                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly  Deal Order" start={props.tolMonthDealOrder[props.tolMonthDealOrder.length - 2]} end={props.monthOrder} />
                    </div>
                </div>

            </div>
            <div className="col-sm-6 mt-3">
                <div className="card ">
                    <div className="card-header btn-primary">Transaction List of Last 8 Days</div>
                    <div className="card-body card_color">
                        <p className="card-text"><Line data={data} options={options} /></p>
                    </div>
                </div>

            </div>
        </>
    );
});


