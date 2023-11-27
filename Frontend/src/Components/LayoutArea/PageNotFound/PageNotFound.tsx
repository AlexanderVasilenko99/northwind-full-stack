import "./PageNotFound.css";
import errImg from "../../../Assets/Images/404img.gif"
import errImg2 from "../../../Assets/Images/pageNotFound.jpg"
import UseTitle from "../../../Utils/UseTitle";

function PageNotFound(): JSX.Element {
    UseTitle("NorthWind | 404");
    return (
        <div className="PageNotFound">
            <img src={errImg2} alt="" />
        </div>
    );
}

export default PageNotFound;