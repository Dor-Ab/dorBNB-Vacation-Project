import "./VacationsModal.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import VacationsModel from "../../../Models/vacationModel";
import appConfig from "../../../Utils/appConfig";
import { Col, Row } from "react-bootstrap";

interface VacationsModalProps {
    vacation: VacationsModel
}

function VacationsModal(props: VacationsModalProps): JSX.Element {
    return (
        <div className="VacationsModal">
            <Popup trigger={<button>See More</button>} modal>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <Row className="modalRow">
                    <img src={appConfig.vacationImagesUrl + props.vacation.id} />
                </Row>
                <p>{props.vacation.price}$</p>
            </Popup>
        </div >
    );
}

export default VacationsModal;
