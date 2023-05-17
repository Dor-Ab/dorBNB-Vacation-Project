import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsDetails from "../../HomeArea/VacationsDetails/VacationsDetails";
import FollowedVacations from "../../UserArea/FollowedVacations/FollowedVacations";
import FutureVacations from "../../UserArea/FutureVacations/FutureVacations";
import CurrentVacations from "../../UserArea/CurrentVacations/CurrentVacations";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/vacations" element={<Home />} />
                <Route path="/vacations/details/:vacationId" element={<VacationsDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Navigate to="/vacations" />} />
                <Route path="/followed-vacations" element={<FollowedVacations />} />
                <Route path="/future-vacations" element={<FutureVacations />} />
                <Route path="/current-vacations" element={<CurrentVacations />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
