import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {

    return (
        <div className="PageNotFound">
            <h2>Whoops</h2>
            <div className="msg404">4<div>0</div>4</div>
            <p>Seems like you got to place that does not exist</p>
            <p className="ufo404">( maybe the ufo took it 👽<br /> The truth is out there)</p><br />
            <div className="ufoShip"><span>🛸</span></div>
            <NavLink to={"/"}>👽 👽 ET Go Home 👽 👽</NavLink>
        </div>
    );
}

export default PageNotFound;
