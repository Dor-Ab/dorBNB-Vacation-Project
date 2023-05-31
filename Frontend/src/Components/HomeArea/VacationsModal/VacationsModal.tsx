import "./VacationsModal.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import VacationsModel from "../../../Models/vacationModel";
import appConfig from "../../../Utils/appConfig";
import { Col, Row, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HeartFill, Heart } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
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

    const [open, setOpen] = useState<boolean>(false)

    const user = authStore.getState().user

    useEffect(() => {
        followerService.getSpecificVacationByUserIdAndVacationId(user.id, props.vacation.id)
            .then(result => handleLikedVacation(result))
            .catch(err => notify.error(err))
    }, [])

    function handleLikedVacation(result: boolean) {
        if (result) {
            setHeart(<HeartFill />)
            setHeartState(true)
        }
        else {
            setHeart(<Heart />)
            setHeartState(false)
        }
    }

    async function handleButtonFav() {
        const follower = new FollowerModel()
        follower.destination = props.vacation.destination
        follower.firstName = user.firstName
        follower.lastName = user.lastName
        follower.userID = user.id
        follower.vacationID = props.vacation.id

        try {
            if (heartState) {
                await followerService.removeFollower(follower)
                setHeart(<Heart />)
                setHeartState(false)
            }
            else {
                await followerService.addFollower(follower)
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
            <Popup trigger={<button>See More</button>} modal open={open} onOpen={() => setOpen(true)}>
                <h2>{props.vacation.destination}</h2>
                <p>{props.vacation.startDate} - {props.vacation.endDate}</p>
                <p>{props.vacation.description}</p>
                <Row className="modalRow">
                    <Col className="col btnsCol">
                        <button onClick={handleButtonFav}>{heart}</button>
                        <NavLink to={`/vacations/details/${props.vacation.id}`}>Open</NavLink>
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

export default VacationsModal;