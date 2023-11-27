import { Component } from "react";
import noti from "../../../Services/NotificationService";

interface ClockProps {
    format: string;
}
interface ClockState {
    time: string;
    color: string;
}


class ClockCc extends Component<ClockProps, ClockState> {
    public intervalId: any;

    public constructor(props: ClockProps) {
        super(props);
        this.state = {
            // time: new Date().toLocaleTimeString(),
            time: this.getTime(),
            color: ""
        }

        // this.showTime = this.showTime.bind(this);
    }
    // component lifecycle:

    // 1. component mounted
    public componentDidMount(): void {
        this.intervalId = setInterval(() => {
            // this.setState({ ...this.state, time: new Date().toLocaleTimeString() });
            this.setState((prevState) => ({ ...prevState, time: new Date().toLocaleTimeString() }));

        }, 1000);
    }
    // 2. component will update

    // 3. component will unmount 
    public componentWillUnmount(): void {
        clearInterval(this.intervalId);
    }
    public showTime = () => {
        noti.success(this.state.time)
    }
    public getTime() {
        const options = { hour12: this.props.format === "12h" }
        console.log(options)
        return new Date().toLocaleTimeString('en', options);
    }

    public render(): JSX.Element {

        return <div className="ClockCc">
            <p>
                {this.state.time}&nbsp;
                {/* <button onClick={this.showTime.bind(this)}>Time? 🕑</button> */}
                <button onClick={this.showTime}>Time? 🕑</button>
            </p>
        </div >
    }



}
export default ClockCc;