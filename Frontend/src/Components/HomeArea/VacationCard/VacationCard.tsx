import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import "./VacationCard.css";
import VacationsModal from "../VacationsModal/VacationsModal";
import appConfig from "../../../Utils/appConfig";
import { Row } from "react-bootstrap";

interface VacationCardProps {
    vacation: VacationsModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard" style={{ backgroundImage: `url(${appConfig.vacationImagesUrl}${props.vacation.id})` }}>
            <Row className="row">
                <h3 className="vacationHead">{props.vacation.destination}</h3>
                <p className="vacationDescription">{props.vacation.description}</p>
            </Row>

            <Row className="modalBtnContainer">
                <VacationsModal vacation={props.vacation} />
            </Row>
        </div>
    );
}

export default VacationCard;
