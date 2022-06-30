import React from "react";
import { Ticker } from './Ticker'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'



export const Stats = React.memo((props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
        },
    };

    const labels = props.chartDetail.labels;

    const data = {
        labels,
        datasets: [
            {
                label: 'user',
                data: props.chartDetail.data,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ],
    };

    return (
        <>
            <div className="col-sm-6 mt-3">
                <div className="row">
                    <div className="col-sm-6 dash_sm_card ">
                        <Ticker title="Total User" start={props.arrUser[1]} end={props.totalUsers} />


                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly User" start={props.arrMonthUser[1]} end={props.monthUser} />
                    </div>
                </div>

            </div>
            <div className="col-sm-6 mt-3">
                <div className="card ">
                    <div className="card-header btn-primary">Registered User's in Last 8 Days</div>
                    <div className="card-body card_color">
                        <p className="card-text"><Line data={data} options={options} /></p>
                    </div>
                </div>

            </div>
        </>
    );
});


