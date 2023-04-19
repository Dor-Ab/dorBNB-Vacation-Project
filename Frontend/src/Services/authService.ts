import axios from "axios";
import UserModel from "../Models/userModel";
import appConfig from "../Utils/appConfig";
import CredentialsModel from "../Models/credentialsModel";
import { AuthActionType, authStore } from "../Redux/authState";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post(appConfig.registerUrl, user)
        const token = response.data
        authStore.dispatch({ type: AuthActionType.Register, payload: token })
    }

    public async login(credenetials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credenetials)
        const token = response.data
        authStore.dispatch({ type: AuthActionType.Login, payload: token })
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout })
    }
}

const authService = new AuthService()

export default authService