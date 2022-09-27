import React from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'



export const OcassionCategoryStats = React.memo((props) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
        },
    };


    const labels = props.occasionsByDates.map(function (i) {
        return i.date;
    });
    const dt = props.occasionsByDates.map(function (i) {
        return i.total;
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'occasion',
                data: dt,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ],
    };

    return (
        <>
            <div className="col-sm-12">
                {<div className="row btn-gradient-grey">
                    <div className="col-sm-6 m-1">
                        {props.occassionName.toUpperCase()}
                    </div>
                </div>}

                {<div className="row">
                    <div className="col-sm-6 mt-3">
                        <div className="row">
                            <div className="col-sm-6 dash_sm_card">
                                <div className="card ">
                                    <div className="card-header btn-primary">Total</div>
                                    <div className="card-body card_color">
                                        <p className="card-text"> {props.total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 dash_sm_card">
                                <div className="card ">
                                    <div className="card-header btn-primary">With Gift</div>
                                    <div className="card-body card_color">
                                        <p className="card-text"> {props.withGift}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-6 dash_sm_card">
                                <div className="card ">
                                    <div className="card-header btn-primary">Current Month</div>
                                    <div className="card-body card_color">
                                        <p className="card-text"> {props.currentMonthOccasions}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 dash_sm_card">
                                <div className="card ">
                                    <div className="card-header btn-primary">Occasion With Gift</div>
                                    <div className="card-body card_color">
                                        <p className="card-text"> {props.currentMonthOccasionsWithGift}</p>
                                    </div>
                                </div>
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
                </div>}


            </div>

        </>
    );
});


