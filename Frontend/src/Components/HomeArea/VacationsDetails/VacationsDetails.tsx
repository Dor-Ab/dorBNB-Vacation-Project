import { useParams } from "react-router-dom";
import "./VacationsDetails.css";
import VacationsModel from "../../../Models/vacationModel";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import appConfig from "../../../Utils/appConfig"
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { Heart, HeartFill } from "react-bootstrap-icons";
import FollowerModel from "../../../Models/followerModel";
import { authStore } from "../../../Redux/authState";
import followerService from "../../../Services/followersService";
import { Col, Row } from "react-bootstrap";
import UserModel from "../../../Models/userModel";
import { RoleModel } from "../../../Models/roleModel";

function VacationsDetails(): JSX.Element {

    useVerifyLoggedIn()

    const vacationId = +useParams().vacationId
    const [vacation, setVacation] = useState<VacationsModel>()

    const [heartState, setHeartState] = useState<boolean>(false)
    const [heart, setHeart] = useState(<Heart />)

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        const currentUser = authStore.getState().user
        setUser(currentUser)
        vacationService.getOneVacation(vacationId)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))
        if (user) {
            if (user.role === RoleModel.User) isUserFollowing(user)
        }
    }, [user])

    async function isUserFollowing(user: UserModel) {
        try {
            const isFollowing = await followerService.getSpecificVacationByUserIdAndVacationId(user.id, vacationId)
            handleLikedVacation(isFollowing)
        } catch (err) {
            notify.error(err)
        }
    }

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
        follower.destination = vacation.destination
        follower.firstName = user.firstName
        follower.lastName = user.lastName
        follower.userID = user.id
        follower.vacationID = vacation.id

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
        <div className="VacationsDetails">
            {vacation && <>
                <Row className="row">
                    <Col className="col">
                        {/* If user is admin - follow button won't show */}
                        {user && user.role === RoleModel.User &&
                            <button onClick={handleButtonFav}>{heart}</button>

                        }
                    </Col>
                    <Col className="col">
                        <h2>{vacation.destination}</h2>
                    </Col>
                    <Col></Col>
                </Row>
                <p>{vacation.startDate} - {vacation.endDate}</p>
                <p>{vacation.description}</p>
                <img src={appConfig.vacationImagesUrl + vacation.id} />
            </>
            }
        </div>
    );
}

export default VacationsDetails;
