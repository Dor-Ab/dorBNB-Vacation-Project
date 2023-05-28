import Popup from "reactjs-popup";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import "./DeleteVacation.css";
import { useState } from "react";
import notify from "../../../Services/notifyService";

interface DeleteVacationProps {
    vacation: VacationsModel
}

function DeleteVacation(props: DeleteVacationProps): JSX.Element {

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
            <Popup className="popup" trigger={<button>❌</button>} modal>
                <h2>WAIT</h2>
                <p>Are you sure you want do delete {props.vacation.destination} vacation?</p>
                <button className="closeBtn" onFocus={deleteVacation}>Yeh, i'm sure</button>
            </Popup>
        </div>
    );
}

export default DeleteVacation;
