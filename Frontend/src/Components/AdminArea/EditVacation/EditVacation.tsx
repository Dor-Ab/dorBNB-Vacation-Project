import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import "./EditVacation.css";
import vacationService from "../../../Services/vacationService";
import { useEffect } from "react";
import notify from "../../../Services/notifyService";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationsModel>()
    const params = useParams()
    const navTo = useNavigate()

    useEffect(() => {
        const vacationId = +params.vacationId
        vacationService.getOneVacation(vacationId)
            .then(vacation => {
                const startDate = formatDate(vacation.startDate)
                const endDate = formatDate(vacation.endDate)
                setValue("id", vacation.id)
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", startDate)
                setValue("endDate", endDate)
                setValue("price", vacation.price)
                setValue("photoName", vacation.photoName)
            })
            .catch(err => {
                notify.error(err)
            })
    }, [])

    function formatDate(date: string): string {
        const parts = date.split("/")
        const formattedDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`
        return formattedDate
    }

    async function send(vacation: VacationsModel) {
        try {
            await vacationService.updateVacation(vacation)
            navTo("/vacations")
            notify.success("updateeeeD")
        } catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="EditVacation">
            <form className="myForm" onSubmit={handleSubmit(send)}>
                <h3>Edit Vacation</h3>

                <label>Destination:</label>
                <input type="text" {...register("destination")} />

                <label>Description:</label>
                <textarea {...register("description")} ></textarea>

                <label>Start Date:</label>
                <input type="date" {...register("startDate")} />

                <label>End Date:</label>
                <input type="date" {...register("endDate")} />

                <label>Price:</label>
                <input type="number" {...register("price")} />

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("photo")} /><br />

                <button>Edit Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
