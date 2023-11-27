import { useEffect, useState } from "react";
import "./ClockFc.css";
import noti from "../../../Services/NotificationService";

function ClockFc(): JSX.Element {
    const [time, setTime] = useState<string>(getTime());

    useEffect(() => {
        const myInterval = setInterval(() => { setTime(getTime()) }, 1000);

        return (() => { clearInterval(myInterval) });
    }, [])


    function showTime(): void {
        noti.success(time)
    }
    function getTime() {
        return new Date().toLocaleTimeString();
    }

    return (

        <div className="ClockFc">
            <p>{time}&nbsp;
                <button onClick={showTime}>Time? 🕑</button>
            </p>
        </div>
    );
}

export default ClockFc;
