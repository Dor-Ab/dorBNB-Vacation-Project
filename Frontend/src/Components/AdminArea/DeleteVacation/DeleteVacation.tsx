import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import "./DeleteVacation.css";

interface DeleteVacationProps {
    vacation: VacationsModel
}

function DeleteVacation(props: DeleteVacationProps): JSX.Element {

    async function deleteVacation() {
        // console.log(props.vacation)
        await vacationService.deleteVacation(props.vacation)
    }

    return (
        <button onClick={deleteVacation} className="DeleteVacation">
            ❌
        </button>
    );
}

export default DeleteVacation;
