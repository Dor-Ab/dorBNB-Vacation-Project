import "./Loader.css";
import LoaderGif from "../../../Assets/Loader/Infinity-1s-200px.gif"

function Loader(): JSX.Element {
    return (
        <div className="Loader">
            <img src={LoaderGif} />
        </div>
    );
}

export default Loader;
