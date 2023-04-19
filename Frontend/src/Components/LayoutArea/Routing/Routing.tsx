import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default Routing;
