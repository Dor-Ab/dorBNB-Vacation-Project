import { Row, Col, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import appConfig from "../../../Utils/appConfig";
import "./AdminModal.css";
import VacationsModel from "../../../Models/vacationModel";

interface AdminModalProps {
    vacation: VacationsModel
}

function AdminModal(props: AdminModalProps): JSX.Element {

    return (
        <div className="VacationsModal">
            <Popup trigger={<button>See More</button>} modal>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <Row className="modalRow">
                    <Col className="col btnsCol">
                        <NavLink to={`/vacations/details/${props.vacation.id}`}>Open</NavLink>
                    </Col>
                    <Col className="col">
                        <Image src={appConfig.vacationImagesUrl + props.vacation.id} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <p>{props.vacation.price}$</p>
            </Popup>
        </div >
    );
}

export default AdminModal;
