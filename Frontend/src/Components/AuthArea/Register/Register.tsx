import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/userModel";
import authService from "../../../Services/authService";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/notifyService";
import useVerifyLoggedOut from "../../../Utils/useVerifyLoggedOut";

function Register(): JSX.Element {

    useVerifyLoggedOut("register")

    const { register, handleSubmit } = useForm<UserModel>({})
    const navTo = useNavigate()

    async function send(user: UserModel): Promise<void> {
        try {
            await authService.register(user)
            notify.success(`Register Succeeded ! <br> Welcome`)
            navTo("/vacations")
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Register">
            <form className="myForm" onSubmit={handleSubmit(send)}>
                <h2>Register</h2>
                <label>First Name:</label>
                <input type="text" placeholder="First Name" {...register("firstName")} /><br />
                <label>Last Name:</label>
                <input type="text" placeholder="Last Name" {...register("lastName")} /><br />
                <label>Email:</label>
                <input type="email" placeholder="Email@email.com" {...register("email")} /><br />
                <label>Password:</label>
                <input type="password" placeholder="**********" {...register("password")} /><br />
                <button>Register !</button>
            </form>
        </div>
    );
}

export default Register;
