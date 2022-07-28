import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";


const UnAuthorized = () => {
    const history = useHistory();
    // all handler start
    return (
        <div className="page_wrapper">
            <div className="twocol sb page_header mt-5">
                <h2>Sorry, You Are Not Allowed to Access This Page</h2>

            </div>
        </div>

    );
};

export default UnAuthorized;
