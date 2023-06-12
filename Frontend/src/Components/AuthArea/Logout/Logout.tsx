import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/authService";
import notify from "../../../Services/notifyService";
import "./Logout.css";
import { authStore } from "../../../Redux/authState";

function Logout(): JSX.Element {

    const navTo = useNavigate()

    useEffect(() => {
        if (authStore.getState().user) {
            authService.logout()
            notify.error("Hope To See You Soon")
            navTo("/login")
        }
        else {
            notify.error("You must login to logout")
            navTo("/login")
        }
    }, [])

    return null
}

export default Logout;

