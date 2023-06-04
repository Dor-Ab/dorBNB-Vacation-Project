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
import VacationFollowers from "../../AdminArea/VacationFollowers/VacationFollowers";

function Routing(): JSX.Element {

    function handleMainRoute() {
        const user = authStore.getState().user

        if (user) return <Navigate to="/vacations" />

        else return < Navigate to="/login" />

    }

    return (
        <div className="Routing">
            <Routes>

                {/* Main Routes */}
                {/* Home - All Vacations Displayed */}
                <Route path="/vacations" element={<Home />} />

                {/* Search Box - Live Route Changing - Display Only Searched VSacations */}
                <Route path="/search/:searchValue" element={<Search />} />
                {/* --------------------------------------------------- */}

                {/* Vacations Routes */}
                {/* Single Vacation Details Route */}
                <Route path="/vacations/details/:vacationId" element={<VacationsDetails />} />

                {/* Followed Vacation Route (Only For Users - Not Admin) */}
                <Route path="/followed-vacations" element={<FollowedVacations />} />

                {/* Future Vacations Route */}
                <Route path="/future-vacations" element={<FutureVacations />} />

                {/* Current Vacations Route */}
                <Route path="/current-vacations" element={<CurrentVacations />} />
                {/* ------------------------------------------------------------------------- */}

                {/* Admin Only Vacations Routes - (Not For Regular Users) */}
                {/* Admin Add Vacation Route*/}
                <Route path="/add-vacation" element={<AddVacation />} />

                {/* Admin Edit Vacation Route*/}
                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />

                {/* Admin Vacation Reports Route*/}
                <Route path="/vacations-reports" element={<VacationsReports />} />

                {/* Admin Followers For Vacation Route*/}
                <Route path="/vacation-followers/:vacationId" element={<VacationFollowers />} />
                {/* ----------------------------------------------------------------------- */}

                {/* Auth Route */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                {/* ----------------------------------------------- */}

                {/* Default Route */}
                <Route path="/" element={handleMainRoute()} />

                {/* Catch All Route */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
