import "./VacationsModal.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import VacationsModel from "../../../Models/vacationModel";
import appConfig from "../../../Utils/appConfig";
import { Col, Row, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HeartFill, Heart } from "react-bootstrap-icons";
import { useState } from "react";
import notify from "../../../Services/notifyService";
import { authStore } from "../../../Redux/authState";
import followerService from "../../../Services/followersService";
import FollowerModel from "../../../Models/followerModel";

interface VacationsModalProps {
    vacation: VacationsModel
}

function VacationsModal(props: VacationsModalProps): JSX.Element {

    const [heartState, setHeartState] = useState<boolean>(false)
    const [heart, setHeart] = useState(<Heart />)

    const userId = authStore.getState().user.id

    async function handleButtonFav() {
        const follower = new FollowerModel()
        follower.userID = userId
        follower.vacationID = props.vacation.id

        try {
            if (heartState) {
                await followerService.addFollower(follower)
                setHeart(<Heart />)
                setHeartState(false)
            }
            else {
                setHeart(<HeartFill />)
                setHeartState(true)
            }
        }
        catch (err) {
            notify.error(err)
        }

    }

    return (
        <div className="VacationsModal">
            <Popup trigger={<button>See More</button>} modal>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <Row className="modalRow">
                    <Col className="col btnsCol">
                        <NavLink to={`/vacations/details/${props.vacation.id}`}>Open</NavLink>
                        <button onClick={handleButtonFav}>{heart}</button>
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

export default VacationsModal;
