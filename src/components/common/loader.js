import React from 'react';
import { Spinner } from "react-bootstrap"


export const Loader = () => {
    return (
        <div id="loader-container">
            <div id="ball-1" className="circle"></div>
            <div id="ball-2" className="circle"></div>
            <div id="ball-3" className="circle"></div>
        </div>
    )
}

export const MySpinner = (props) => <Spinner size="sm" animation="border" className="light" />