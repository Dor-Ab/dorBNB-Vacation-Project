import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Redux/authState"
import notify from "../Services/notifyService"
import { RoleModel } from "../Models/roleModel"

function useVerifyAdmin() {

    const navTo = useNavigate()

    useEffect(() => {

        if (authStore.getState().user.role !== RoleModel.Admin) {
            navTo("/vacations")
            notify.error("You are not an admin !")
        }

    }, [])
}

export default useVerifyAdmin