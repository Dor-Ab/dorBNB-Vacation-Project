import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import "./VacationCard.css";
import VacationsModal from "../VacationsModal/VacationsModal";

interface VacationCardProps {
    vacation: VacationsModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <h2>{props.vacation.destination}</h2>
            <div className="vacationDescription">{props.vacation.description}</div>
            <VacationsModal vacation={props.vacation} />
        </div>
    );
}

export default VacationCard;
