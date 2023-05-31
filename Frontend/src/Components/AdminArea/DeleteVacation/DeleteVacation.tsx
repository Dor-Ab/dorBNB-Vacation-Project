import Popup from "reactjs-popup";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import "./DeleteVacation.css";
import notify from "../../../Services/notifyService";
import { useState } from "react";
import { set } from "react-hook-form";

interface DeleteVacationProps {
    vacation: VacationsModel
}

function DeleteVacation(props: DeleteVacationProps): JSX.Element {

    const [open, setOpen] = useState<boolean>(false)

    async function deleteVacation() {
        try {
            await vacationService.deleteVacation(props.vacation)
            notify.success(`${props.vacation.destination} deleted`)
        } catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="DeleteVacation">
            <Popup className="popup" trigger={<button>❌</button>} modal open={open} onOpen={() => setOpen(true)}>
                <h2>WAIT</h2>
                <p>Are you sure you want do delete {props.vacation.destination} vacation?</p>
                <button className="deleteBtn" onClick={deleteVacation}>Yeh, i'm sure</button>
                <button className="closeBtn" onClick={() => setOpen(false)}>God no! take me back</button>
            </Popup>
        </div>
    );
}

export default DeleteVacation;
