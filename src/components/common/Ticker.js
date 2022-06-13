import React, { useState } from "react";
import CountUp from "react-countup";


export const Ticker = React.memo(({ title, ...rest }) => {
    // const [viewPortEntered, setViewPortEntered] = useState(false);

    return (
        <>
            <div className="card ">
                <div className="card-header btn-primary">{title}</div>
                <div className="card-body card_color">
                    <>
                        <CountUp {...rest} >
                            {({ countUpRef }) => {
                                return (
                                    <p className="card-text" ref={countUpRef}></p>
                                );
                            }}
                        </CountUp>
                    </>
                </div>
            </div>
        </>
    );
});
