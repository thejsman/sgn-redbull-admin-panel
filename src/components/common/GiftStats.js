import React from "react";
import { Ticker } from './Ticker'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'



export const GiftStats = React.memo((props) => {
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
                        <Ticker title="Total Gift Amount" start={props.tolGiftAmount[props.tolGiftAmount.length - 2]} end={props.totalAmount} />


                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Gift Amount" start={props.tolMonthGiftAmount[props.tolMonthGiftAmount.length - 2]} end={props.monthAmount} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 dash_sm_card ">
                        <Ticker title="Total Gift Order" start={props.tolGiftOrder[props.tolGiftOrder.length - 2]} end={props.totalOrder} />


                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly  Gift Order" start={props.tolMonthGiftOrder[props.tolMonthGiftOrder.length - 2]} end={props.monthOrder} />
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


