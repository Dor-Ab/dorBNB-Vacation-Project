import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Redux/authState"
import notify from "../Services/notifyService"

function useVerifyLoggedOut(actionType: string) {

    const navTo = useNavigate()

    useEffect(() => {

        if (authStore.getState().token) {
            navTo("/vacations")
            notify.error(`Can't access ${actionType} while logged in !`)
        }

    }, [])

}

export default useVerifyLoggedOut