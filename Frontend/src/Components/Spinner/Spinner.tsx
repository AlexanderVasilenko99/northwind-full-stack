import "./Spinner.css";
import spinner from "../../Assets/Images/spinner.gif"

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={spinner}/>
        </div>
    );
}

export default Spinner;
