import React from "react";
import { Ticker } from './Ticker'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'



export const OccasionStats = React.memo((props) => {
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
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-6 mt-3">
                        <div className="row">
                            <div className="col-sm-6 dash_sm_card ">
                                <Ticker title="Total Occasion" start={props.arrTotalOccasionData[1]} end={props.totalOccasion} />


                            </div>
                            <div className="col-sm-6 dash_sm_card">
                                <Ticker title="Month Occasion" start={props.arrMonthOccasion[1]} end={props.monthOccasion} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 dash_sm_card ">
                                <Ticker title="Gift Occasion" start={props.arrGiftOccasion[1]} end={props.giftOccasion} />


                            </div>
                            <div className="col-sm-6 dash_sm_card">
                                <Ticker title="Shared Occasion" start={props.arrSharedOccasion[1]} end={props.sharedOccasion} />
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
                </div>
                <div className="row">
                    {

                        props.occasionPeroccasion.length > 0 && (
                            props.occasionPeroccasion?.map((item, i) => (
                                <div className="col-3  dash_sm_card">
                                    <div className="card ">
                                        <div className="card-header btn-gradient-grey"> {item.occasionName}</div>
                                        <div className="card-body card_color">
                                            <p className="card-text"> {item.count}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        )
                    }

                </div>

            </div>

        </>
    );
});


