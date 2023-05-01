import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/credentialsModel";
import notify from "../../../Services/notifyService";
import authService from "../../../Services/authService";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>()
    const navTo = useNavigate()

    async function send(credentials: CredentialsModel): Promise<void> {
        try {
            await authService.login(credentials)
            notify.success("Welcome Back")
            navTo("/vacations")
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Login">
            <form className="myForm" onSubmit={handleSubmit(send)}>
                <h2>Login to dorBNB</h2>
                <label>Email:</label>
                <input type="email" {...register("email")} /><br />
                <label>Password:</label>
                <input type="password" {...register("password")} /><br />
                <button>Login</button>
            </form>
        </div >
    );
}

export default Login;
