import { Row, Col, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import appConfig from "../../../Utils/appConfig";
import "./AdminModal.css";
import VacationsModel from "../../../Models/vacationModel";
import { useState } from "react";

interface AdminModalProps {
    vacation: VacationsModel
}

function AdminModal(props: AdminModalProps): JSX.Element {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="VacationsModal">
            <Popup trigger={<button>See More</button>} modal open={open} onOpen={() => setOpen(true)}>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <Row className="modalRow">
                    <Col className="col btnsCol">
                        <NavLink to={`/vacations/details/${props.vacation.id}`}>Open</NavLink>
                        <NavLink to={`/edit-vacation/${props.vacation.id}`}>Edit</NavLink>
                    </Col>
                    <Col className="col">
                        <Image src={appConfig.vacationImagesUrl + props.vacation.id} />
                    </Col>
                    <Col className="col btnsCol">
                        <button onClick={() => setOpen(false)}>Exit</button>
                    </Col>
                </Row>
                <p>{props.vacation.price}$</p>
            </Popup>
        </div >
    );
}

export default AdminModal;
