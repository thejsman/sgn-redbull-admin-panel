import React from "react";
import { Ticker } from "./Ticker";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const GiftStats = React.memo((props) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				display: true,
			},
		},
	};

	const labels = props.chartDetail.labels;

	const data = {
		labels,
		datasets: [
			{
				label: "Amount",
				data: props.chartDetail.data,
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
			{
				label: "No Of Order",
				data: props.chartDetail.numOfOrder,
				fill: true,
				backgroundColor: "#9e9ce7",
				borderColor: "#4644d1",
			},
		],
	};

	return (
		<>
			<div className="col-sm-6 mt-3">
				<div className="row">
					<div className="col-sm-6 dash_sm_card ">
						<Ticker
							title="Total Gift Orders Amount"
							start={props.tolGiftAmount[1]}
							end={props.totalAmount}
						/>
					</div>
					<div className="col-sm-6 dash_sm_card">
						<Ticker
							title="Monthly Gift Orders Amount"
							start={props.tolMonthGiftAmount[1]}
							end={props.monthAmount}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 dash_sm_card ">
						<Ticker
							title="Total Gift Orders"
							start={props.tolGiftOrder[1]}
							end={props.totalOrder}
						/>
					</div>
					<div className="col-sm-6 dash_sm_card">
						<Ticker
							title="Monthly Gift Orders"
							start={props.tolMonthGiftOrder[1]}
							end={props.monthOrder}
						/>
					</div>
				</div>
			</div>
			<div className="col-sm-6 mt-3">
				<div className="card ">
					<div className="card-header btn-primary">
						Transaction List of Last 8 Days
					</div>
					<div className="card-body card_color">
						<p className="card-text">
							<Line data={data} options={options} />
						</p>
					</div>
				</div>
			</div>
		</>
	);
});
