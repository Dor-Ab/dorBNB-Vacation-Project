import "./VacationsModal.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import VacationsModel from "../../../Models/vacationModel";

interface VacationsModalProps {
    vacation: VacationsModel
}

function VacationsModal(props: VacationsModalProps): JSX.Element {
    return (
        <div className="VacationsModal">
            <Popup trigger={<button>Modal</button>} modal>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <p>{props.vacation.price}$</p>
                <p>{props.vacation.photoName}</p>
            </Popup>
        </div>
    );
}

export default VacationsModal;
