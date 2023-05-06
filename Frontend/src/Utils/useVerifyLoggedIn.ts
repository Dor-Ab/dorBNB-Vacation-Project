import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/authState";
import notify from "../Services/notifyService";


function useVerifyLoggedIn() {

    const navTo = useNavigate()

    useEffect(() => {

        if (!authStore.getState().token) {
            navTo("/login")
            notify.error("You are not logged in !")
        }

    }, [])

}

export default useVerifyLoggedIn