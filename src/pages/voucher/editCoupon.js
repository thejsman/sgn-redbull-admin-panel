import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
	couponDetailByCouponId,
	updateVoucher,
} from "../../services/ApiVoucher";
import Breadcrumb from "../../components/common/Breadcrumb";
import { resHandle } from "../../components/util/utils";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Loader } from "../../components/common/loader";
import moment from "moment";

const EditCoupon = () => {
	const history = useHistory();
	const { id } = useParams();

	const [couponVoucherId, setCouponVoucherId] = useState([]);
	const [productName, setProductName] = useState("");
	const [pk, setPK] = useState("");
	const [itemId, setItemId] = useState("");
	const [variantId, setVariantId] = useState("");
	const [couponName, setCouponName] = useState("");
	const [couponPin, setCouponPin] = useState("");
	const [validTill, setValidTill] = useState("");
	const [validTillErr, setValidTillErr] = useState("");
	const [status, setStatus] = useState("free");
	const [statusErr, setStatusErr] = useState("");
	const [value, setValue] = useState("");
	const [valueErr, setValueErr] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [loader, setLoader] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const breadcrumb = [
		{ link: "/voucher", linkText: "Voucher Management" },
		{ link: "/coupons/" + productName, linkText: "Coupon List" },
		{ link: "", linkText: "Edit Coupon" },
	];

	const numberRegEx = /^[0-9\b]+$/;
	const albhaRegEx = /^[a-zA-z]+$/;

	const handleValidate = () => {
		let validate = true;

		if (!value) {
			setValueErr("Value is required");
			validate = false;
		} else if (!numberRegEx.test(value)) {
			setValueErr("only numbers are allowed");
			validate = false;
		} else {
			setValueErr("");
		}

		if (!validTill.replace(/\s+/g, "")) {
			setValidTillErr("Till Date is required");
			validate = false;
		} else {
			setValidTillErr("");
		}
		return validate;
	};

	const handleGetCouponDetailById = (id) => {
		let params = {
			couponVoucherId: id,
		};
		couponDetailByCouponId(params).then((res) => {
			let { status, data } = resHandle(res);
			console.log(status, data, "datadatadatadatadata");
			if (status === 200) {
				setCouponVoucherId(data.data.Items[0].couponVoucherId);
				setProductName(data.data.Items[0].productName);
				setItemId(data.data.Items[0].itemId);
				setVariantId(data.data.Items[0].variantId);
				setCouponName(data.data.Items[0].coupon);
				setCouponPin(data.data.Items[0].couponPin);
				setValidTill(
					moment.unix(data.data.Items[0].validTill).format("DD/MM/YYYY")
				);
				setStatus(data.data.Items[0].status);
				setValue(data.data.Items[0].value);
				setPK(data.data.Items[0].pk);
				setLoader(false);
			} else {
				setLoader(false);
			}
		});
	};
	const handleUpdateCoupon = (e) => {
		e.preventDefault();
		if (handleValidate()) {
			setIsSubmit(true);
			let createObj = {
				pk: pk,
				couponVoucherId: couponVoucherId,
				validTill: parseInt(moment(validTill).format("X")),
				status,
				value: parseInt(value),
			};
			console.log("createObj---", createObj);
			updateVoucher(createObj).then((res) => {
				let { status, data } = resHandle(res);
				setIsSubmit(false);
				if (status === 200) {
					toast.success(data.message);
					history.push("/coupons/" + productName);
				} else {
					toast.success(data.message);
				}
			});
		}
	};
	useEffect(() => {
		setLoader(true);
		handleGetCouponDetailById(id);
	}, []);

	// All function End

	return (
		<div className="page_wrapper">
			<Breadcrumb breadcrumb={breadcrumb} />
			<div className="twocol sb page_header">
				<h2>Edit Coupon</h2>
			</div>
			{loader ? (
				<Loader />
			) : (
				<form className="form-controller chosen">
					<div className="form-group row">
						<div className="col">
							<label>Product Name</label>
							<input
								type="text"
								readOnly="readonly"
								className="form-control"
								value={productName}
								name="productName"
							/>
						</div>
						<div className="col">
							<label>Item Id</label>
							<input
								type="number"
								readOnly="readonly"
								className="form-control"
								value={itemId}
								name="itemId"
							/>
						</div>
						<div className="col">
							<label>Variant Id</label>
							<input
								type="number"
								readOnly="readonly"
								className="form-control"
								keyboardType="phone-pad"
								value={variantId}
								name="variantId"
							/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col">
							<label>Coupon</label>
							<input
								readOnly="readonly"
								type="text"
								className="form-control"
								keyboardType="phone-pad"
								value={couponName}
								name="couponName"
							/>
						</div>
						<div className="col">
							<label>Pin</label>
							<input
								readOnly="readonly"
								type="text"
								className="form-control"
								keyboardType="phone-pad"
								value={couponPin}
								name="couponName"
							/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col">
							<label>Valid Till Date</label>
							<input
								type="text"
								readOnly="readonly"
								className="form-control"
								value={validTill}
								name="validTill"
								onChange={(e) => (
									setValidTill(e.target.value), setValidTillErr("")
								)}
							/>
							{validTillErr && (
								<div className="inlineerror">{validTillErr} </div>
							)}
						</div>
						<div className="col">
							<label>Value</label>
							<input
								type="number"
								readOnly="readonly"
								className="form-control"
								value={value}
								name="value"
								onChange={(e) => (setValue(e.target.value), setValueErr(""))}
							/>
							{valueErr && <div className="inlineerror">{valueErr} </div>}
						</div>
					</div>
					<div className="form-group row">
						<div className="col">
							<label>Status</label>
							<select
								className="form-control"
								name="status"
								value={status}
								onChange={(e) => (setStatus(e.target.value), setStatusErr(""))}
							>
								<option value="free">FREE</option>
								<option value="pending">PENDING</option>
								<option value="assigned">ASSIGNED</option>
							</select>
						</div>

						<div className="col"></div>
					</div>

					<div className="button300">
						<button
							type="button"
							className="btn btn-primary rounded-pill"
							onClick={handleUpdateCoupon}
							disabled={isSubmit ? "disabled" : ""}
						>
							{isSubmit ? (
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							) : (
								""
							)}
							{isSubmit ? " Submitting.." : "Update"}
						</button>
					</div>
				</form>
			)}
			<ToastContainer />
		</div>
	);
};

export default EditCoupon;
