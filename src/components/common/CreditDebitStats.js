import React from "react";
import { Ticker } from './Ticker'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'


export const CreditDebitStats = React.memo((props) => {
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
                        <Ticker title="Total Principal Amount" prefix="₹ " start={props.principalAmount[1]} end={props.creditData.principalAmount} />
                    </div>
                </div>
                <div className="row">

                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Total Credit Amount" prefix="₹ " start={props.tolCreditAmount[1]} end={props.creditData.totalAmount} />
                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Credit Amount" prefix="₹ " start={props.tolMonthCreditAmount[1]} end={props.creditData.monthAmount} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Total Debit Amount" prefix="₹ " start={props.tolDebitAmount[1]} end={props.debitData.totalAmount} />
                    </div>
                    <div className="col-sm-6 dash_sm_card">
                        <Ticker title="Monthly Debit Amount" prefix="₹ " start={props.tolMonthDebitAmount[1]} end={props.debitData.monthAmount} />
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
