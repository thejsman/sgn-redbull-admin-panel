import React, { useState } from "react";
import { Ticker } from './Ticker'
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'


export const CreditDebitStats = React.memo((props) => {
    console.log("Credit  Debit Stats prop", props)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
        },
    };

    const labels = props.creditData.chartDetail.labels;


    const data = {
        labels,
        datasets: [
            {
                label: 'Credit',
                data: props.creditData.chartDetail.data,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: 'Debit',
                data: props.debitData.chartDetail.data,
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
                    <div className="col-sm-12 dash_sm_card ">
                        <Ticker title="Total Principal Amount" prefix="₹ " start={props.creditData.principalAmount[0]} end={props.creditData.principalAmount[1]} />
                    </div>
                </div>
                <div className="row">

                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Total Credit Amount" prefix="₹ " start={props.creditData.totalAmount[0]} end={props.creditData.totalAmount[1]} />
                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Credit Amount" prefix="₹ " start={props.creditData.monthAmount[0]} end={props.creditData.monthAmount[1]} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Total Debit Amount" prefix="₹ " start={props.debitData.totalAmount[0]} end={props.debitData.totalAmount[1]} />
                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Debit Amount" prefix="₹ " start={props.debitData.monthAmount[0]} end={props.debitData.monthAmount[1]} />
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mt-3">
                <div className="card ">
                    <div className="card-header btn-primary">Transactions List in Last 8 Days</div>
                    <div className="card-body card_color">
                        <p className="card-text"><Line data={data} options={options} /></p>
                    </div>
                </div>

            </div>
        </>
    );
});
