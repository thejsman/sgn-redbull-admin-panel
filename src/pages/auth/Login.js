import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Logo, Eye, EyeClose } from '../../assets/svg/index';
import LogoImg from '../../assets/img/logo.svg';
import AuthBg from '../../assets/img/auth-bg.png';
import { handleLogin } from '../../services/ApiServices'
import { resHandle } from '../../components/util/utils'

const Login = () => {
    const history = useHistory();
    const [loader, setLoader] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [adminLogin, setAdminLogin] = useState(true);



    const handleValidate = () => {
        let validate = true;
        const validateEmails = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
        if (email == '') {
            setEmailErr('Email is required');
            validate = false
        }
        else if (!validateEmails.test(email)) {
            setEmailErr('Please enter a valid email');
            validate = false
        }
        if (password == '') {
            setPasswordErr('Password is required');
            validate = false
        }
        return validate;
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (handleValidate()) {
            let params = {
                deviceId: 'admin',
                deviceTypeID: 4,
                deviceToken: 'admin',
                email,
                password,
                adminLogin
            }
            // handleLogin(params).then(res => {
            //     let { status, data } = resHandle(res);
            //     console.log("statusstatusstatusstatus", res.data);
            //     if (status) {
            //         localStorage.setItem("accessToken", data.accessToken);
            //         // history.push("/")
            //         window.location.href = "/";
            //     }
            //     else {

            //         // setEmailErr(data.responseMessage)
            //         setPasswordErr(data.responseMessage)
            //     }
            // })
            localStorage.setItem("accessToken", "data.accessToken");
                    window.location.href = "/";


        }

    }


    return (
        <div className="d-flex justify-content-between align-items-center auth_wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 card p-5">
                        <div className="form-group text-center">
                            {/* <Logo /> */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className={`form-control `}
                                    type="text"
                                    value={email}
                                    onChange={e => (setEmail(e.target.value), setEmailErr(''))}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {emailErr ? <div className="error-alert"> {emailErr} </div> : ''}
                            <div className="form-group">
                                <label>Password</label>
                                <div className="eyeveiwer">
                                    <input
                                        className={`form-control `}
                                        type={showPassword === true ? "text" : "password"}
                                        value={password}
                                        onChange={e => (setPassword(e.target.value), setPasswordErr(''))}
                                        placeholder="Enter your password" />
                                    <span
                                        className="cursor-pointer rt-icon"
                                        onClick={() => setShowPassword(!showPassword)} >

                                        {showPassword === true ? (
                                            <Eye />
                                        ) : (
                                            <EyeClose />
                                        )}
                                    </span>
                                </div>

                                {passwordErr ? <div className="error-alert"> {passwordErr} </div> : ''}
                                {/* <div className="text-right">
                                    <small>
                                        <Link to="/forgot-password">Forgot password?</Link>
                                    </small>
                                </div> */}
                            </div>

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary rounded-pill pl-5 pr-5">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;