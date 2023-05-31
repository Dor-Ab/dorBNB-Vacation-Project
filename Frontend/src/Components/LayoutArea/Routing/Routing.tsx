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
import { authStore } from "../../../Redux/authState";
import { ReactNode } from "react";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import VacationsReports from "../../AdminArea/VacationsReports/VacationsReports";
import Search from "../../UserArea/Search/Search";

function Routing(): JSX.Element {

    function handleMainRoute() {
        const user = authStore.getState().user

        if (user) return <Navigate to="/vacations" />

        else return < Navigate to="/login" />

    }

    return (
        <div className="Routing">
            <Routes>
                <Route path="/vacations" element={<Home />} />
                <Route path="/search/:searchValue" element={<Search />} />
                <Route path="/vacations/details/:vacationId" element={<VacationsDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={handleMainRoute()} />
                <Route path="/followed-vacations" element={<FollowedVacations />} />
                <Route path="/future-vacations" element={<FutureVacations />} />
                <Route path="/current-vacations" element={<CurrentVacations />} />
                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />
                <Route path="/vacations-reports" element={<VacationsReports />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
