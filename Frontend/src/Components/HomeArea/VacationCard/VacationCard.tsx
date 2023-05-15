import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import "./VacationCard.css";
import VacationsModal from "../VacationsModal/VacationsModal";
import appConfig from "../../../Utils/appConfig";
import { Row } from "react-bootstrap";
import { PersonHeart } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";

interface VacationCardProps {
    vacation: VacationsModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [followersCount, setFollowersCount] = useState<number>(0)

    useEffect(() => {
        followerService.getFollowersForVacation(props.vacation.id)
            .then(f => {
                const count = f.length
                setFollowersCount(count)
            })
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="VacationCard" style={{ backgroundImage: `url(${appConfig.vacationImagesUrl}${props.vacation.id})` }}>
            <div className="followersCount">
                <span className="count">{followersCount}</span>
                <span className="icon">{<PersonHeart />}</span>
            </div>
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
