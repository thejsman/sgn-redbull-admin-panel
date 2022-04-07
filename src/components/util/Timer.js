import React, { PureComponent } from "react";
import { Resend } from "../../assets/svg";

export class Timer extends React.PureComponent {
    constructor() {
        super();
        this.state = { time: {}, seconds: 60, minutes: 1 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    // UNSAFE_componentWillReceiveProps(props) {

    //     this.setState({ seconds: props.seconds },(state)=>{
    //         alert(JSON.stringify(this.state.seconds))
    //         this.timer=0
    //         this.startTimer();
    //     })
    // }

    componentDidMount() {
        this.startTimer()
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {

        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    resetTimer() {
        clearInterval(this.timer);
        this.setState({ seconds: 120 }, () => {
            this.startTimer();
        })
        this.timer = 0
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    onResendClick = (e) => {
        e.preventDefault();
        this.resetTimer();
        this.props.resendEmailPhone();
    }

    render() {
        console.log('trtrtrrttrrttrtrtrtrtrt', this.props.btnName
        );
        return (
            <>
                <button className="btn btn-outline-primary-light w-100" disabled={this.state.seconds > 0 ? true : false} onClick={this.onResendClick}>
                    {this.state.seconds > 0 ? <> {` ${this.props.btnName} in ${this.state.time.m} : ${this.state.time.s} `} </> : <> <Resend /> {this.props.btnName} </>}</button>
            </>
        );
    }
}
