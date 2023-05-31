import { useParams } from "react-router-dom";
import "./VacationFollowers.css";
import { useEffect, useState } from "react";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";
import FollowerModel from "../../../Models/followerModel";
import FollowerCard from "../FollowerCard/FollowerCard";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function VacationFollowers(): JSX.Element {

    const [followers, setFollowers] = useState<FollowerModel[]>()
    const [vacation, setVacation] = useState<VacationsModel>()
    const vacationId = +useParams().vacationId

    useEffect(() => {
        followerService.getFollowersForVacation(vacationId)
            .then(followers => {
                setFollowers(followers)
                console.log(followers)
            })
            .catch(err => notify.error(err))
        vacationService.getOneVacation(vacationId)
            .then(v => setVacation(v))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="VacationFollowers">
            {vacation &&
                <h2>Followers of {vacation.destination}</h2>
            }
            <Row className="row">
                {followers && followers.length !== 0 ? followers.map(f => <Col key={f.followerID}>
                    <FollowerCard follower={f} />
                </Col>
                ) : <Col>
                    <h5>Wow, so empty</h5>
                    <p>Seems like no one followed this vacation</p>
                    <NavLink to={"/vacations"}>Go Home</NavLink>
                </Col>
                }
            </Row>
        </div>
    );
}

export default VacationFollowers;
