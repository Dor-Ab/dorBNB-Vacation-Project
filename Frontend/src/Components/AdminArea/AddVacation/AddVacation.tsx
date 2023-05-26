import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/notifyService";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationsModel>()
    const navTo = useNavigate()

    async function send(vacation: VacationsModel) {
        try {
            await vacationService.addVacation(vacation)
            navTo("/vacations")
        } catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="AddVacation">
            <form className="myForm" onSubmit={handleSubmit(send)}>
                <h3>New Vacation</h3>

                <label>Destination:</label>
                <input type="text" {...register("destination")} />

                <label>Description:</label>
                <textarea {...register("description")} ></textarea>

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} />

                <label>Price:</label>
                <input type="number" {...register("price")} /><br />

                <label>Image:</label>
                <input type="file" accept="image/*" required {...register("photo")} />

                <button>Add Vacation</button>
            </form>
        </div>
    );
}

export default AddVacation;
