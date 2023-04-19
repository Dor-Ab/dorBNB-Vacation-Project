import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/authService";
import notify from "../../../Services/notifyService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navTo = useNavigate()

    useEffect(() => {
        authService.logout()
        notify.error("Hope To See You Soon")
        navTo("/login")
    }, [])

    return null
}

export default Logout;

