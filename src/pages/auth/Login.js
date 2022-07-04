import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Logo, Eye, EyeClose } from '../../assets/svg/index';
import LogoImg from '../../assets/img/logo.svg';
import AuthBg from '../../assets/img/auth-bg.png';
import { handleLogin } from '../../services/ApiServices'
import { resHandle } from '../../components/util/utils'
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap"

const Login = () => {
    const history = useHistory();
    const [loader, setLoader] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [adminLogin, setAdminLogin] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);


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
    useEffect(() => {
        localStorage.clear();

    })


    const handleSubmit = e => {
        e.preventDefault();

        if (handleValidate()) {
            let params = {
                email,
                password,
            }
            setIsSubmit(true);
            console.log('process.env.REACT_APP_CHECK_LOGIN_CREDENTIAL_WITH_DB', process.env.REACT_APP_CHECK_LOGIN_CREDENTIAL_WITH_DB)
            if (process.env.REACT_APP_CHECK_LOGIN_CREDENTIAL_WITH_DB == 1) {
                handleLogin(params).then(res => {
                    setIsSubmit(false);
                    let { status, data } = resHandle(res);
                    console.log("statusstatusstatusstatus", res.data);
                    if (status == 200) {
                        console.log('headers', res.data.token);
                        localStorage.setItem("accessToken", res.data.detail.token);
                        //history.push("/")
                        window.location.href = "/";
                    }
                    else {
                        setPasswordErr(res.data.message)
                    }
                }).catch((error) => {
                    setIsSubmit(false);
                    if (error.response.status == 400) {
                        setPasswordErr(error.response.data.message)
                    } else {
                        toast.error("Sorry, a technical error occurred! Please try again later")
                    }

                });
            } else {
                if (email == process.env.REACT_APP_SUPERADMIN_USERNAME && password == process.env.REACT_APP_SUPERADMIN_PWD) {
                    setIsSubmit(false);
                    localStorage.setItem("accessToken", "tokenSagoonSuperaadmin37285723582sjhhjkfahf76786");
                    //history.push("/")
                    window.location.href = "/";
                } else {
                    setIsSubmit(false);
                    setPasswordErr('Invalid Credentials');
                }
            }

            //localStorage.setItem("accessToken", "data.accessToken");
            //  window.location.href = "/";


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
                        <form>
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

                            <div className='button300'>
                                <button
                                    type='button'
                                    className='btn btn-primary rounded-pill'
                                    onClick={handleSubmit}
                                    disabled={isSubmit ? 'disabled' : ''}

                                >
                                    {isSubmit ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    )
                                        : ('')
                                    }
                                    {isSubmit ? ' Submitting..' : 'Sign in'}


                                </button>
                                {/* <button type="submit" className="btn btn-primary rounded-pill pl-5 pr-5">Sign in</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;