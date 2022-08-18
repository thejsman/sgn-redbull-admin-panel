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

	const labels = props.chartDetail?.labels;

	const data = {
		labels,
		datasets: [
			{
				label: "Total Deal",
				data: props.chartDetail?.totalDeal,
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
			{
				label: "Total Deal Amount",
				data: props.chartDetail?.totalDealAmount,
				fill: true,
				backgroundColor: "#bb7b95",
				borderColor: "#cf427c",
			},
			{
				label: "Total Gift",
				data: props.chartDetail?.totalGift,
				fill: true,
				backgroundColor: "#f19d9d",
				borderColor: "#ed4d4d",
			},
			{
				label: "Total Gift Amount",
				data: props.chartDetail?.totalGiftAmount,
				fill: true,
				backgroundColor: "#b8e2ef",
				borderColor: "#66cfef",
			},
			{
				label: "Total Original Deal Amount",
				data: props.chartDetail?.totalOriginalDealAmount,
				fill: true,
				backgroundColor: "#63b174",
				borderColor: "#0a601d",
			},
			{
				label: "Total Original Gift Amount",
				data: props.chartDetail?.totalOriginalGiftAmount,
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
							title="Monthly Deals Amount"
							start={props?.giftStatsData[0]?.currentMonthDealsAmount}
							end={props?.giftStatsData[1]?.currentMonthDealsAmount}
						/>
					</div>
					<div className="col-sm-6 dash_sm_card">
						<Ticker
							title="Monthly Deals Count"
							start={props?.giftStatsData[0]?.currentMonthDealsCount}
							end={props?.giftStatsData[1]?.currentMonthDealsCount}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 dash_sm_card ">
						<Ticker
							title="Monthly Gifts Amount"
							start={props?.giftStatsData[0]?.currentMonthGiftsAmount}
							end={props?.giftStatsData[1]?.currentMonthGiftsAmount}
						/>
					</div>
					<div className="col-sm-6 dash_sm_card">
						<Ticker
							title="Monthly Gifts Count"
							start={props?.giftStatsData[0]?.currentMonthGiftsCount}
							end={props?.giftStatsData[1]?.currentMonthGiftsCount}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 dash_sm_card ">
						<Ticker
							title="Monthly Original Deals Amt"
							start={props?.giftStatsData[0]?.currentMonthOriginalDealsAmount}
							end={props?.giftStatsData[1]?.currentMonthOriginalDealsAmount}
						/>
					</div>
					<div className="col-sm-6 dash_sm_card">
						<Ticker
							title="Monthly Original Gifts Amt"
							start={props?.giftStatsData[0]?.currentMonthOriginalGiftsAmount}
							end={props?.giftStatsData[1]?.currentMonthOriginalGiftsAmount}
						/>
					</div>
				</div>


			</div>
			<div className="col-sm-6 mt-3">
				<div className="card ">
					<div className="card-header btn-primary">
						Deals & Gifts
					</div>
					<div className="card-body card_color">
						<p className="card-text">
							<Line data={data} options={options} />
						</p>
					</div>
				</div>
			</div>

			<div className="col-sm-12 mt-3">

				<div className="row">
					<div className="col-sm-3 dash_sm_card ">
						<Ticker
							title="Historic Deals Amount"
							start={props?.giftStatsData[0]?.historicDealsAmount}
							end={props?.giftStatsData[1]?.historicDealsAmount}
						/>
					</div>
					<div className="col-sm-3 dash_sm_card">
						<Ticker
							title="Historic Deals Count"
							start={props?.giftStatsData[0]?.historicDealsCount}
							end={props?.giftStatsData[1]?.historicDealsCount}
						/>
					</div>
					<div className="col-sm-3 dash_sm_card">
						<Ticker
							title="Historic Deals Counts"
							start={props?.giftStatsData[0]?.historicDealsCounts}
							end={props?.giftStatsData[1]?.historicDealsCounts}
						/>
					</div>
					<div className="col-sm-3 dash_sm_card">
						<Ticker
							title="Historic Gift Count"
							start={props?.giftStatsData[0]?.historicGiftsCount}
							end={props?.giftStatsData[1]?.historicGiftsCount}
						/>
					</div>
					<div className="col-sm-4 dash_sm_card">
						<Ticker
							title="Historic Original Deals Amount"
							start={props?.giftStatsData[0]?.historicOriginalDealsAmount}
							end={props?.giftStatsData[1]?.historicOriginalDealsAmount}
						/>
					</div>
					<div className="col-sm-4 dash_sm_card">
						<Ticker
							title="Historic Original Gift Amount"
							start={props?.giftStatsData[0]?.historicOriginalGiftsAmount}
							end={props?.giftStatsData[1]?.historicOriginalGiftsAmount}
						/>
					</div>
					<div className="col-sm-4 dash_sm_card">
						<Ticker
							title="Historic Gift Amount"
							start={props?.giftStatsData[0]?.historicGiftsAmount}
							end={props?.giftStatsData[1]?.historicGiftsAmount}
						/>
					</div>
				</div>


			</div>
		</>
	);
});
