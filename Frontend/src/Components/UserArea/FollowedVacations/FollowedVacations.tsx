import { useEffect, useState } from "react";
import "./FollowedVacations.css";
import VacationsModel from "../../../Models/vacationModel";
import { authStore } from "../../../Redux/authState";
import followerService from "../../../Services/followersService";
import FollowerModel from "../../../Models/followerModel";
import vacationService from "../../../Services/vacationService";
import VacationCard from "../../HomeArea/VacationCard/VacationCard";
import { Col, Row } from "react-bootstrap";
import { followersStore } from "../../../Redux/followersState";
import { NavLink } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import notify from "../../../Services/notifyService";
import UserModel from "../../../Models/userModel";

function FollowedVacations(): JSX.Element {

    useVerifyLoggedIn()

    const [followedVacations, setFollowedVacations] = useState<VacationsModel[]>(null)
    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(authStore.getState().user)
        handleFollowedVacations()

        const unsubscribe = followersStore.subscribe(() => {
            handleFollowedVacations()
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function handleFollowedVacations() {
        try {
            if (user) {
                const followedVacations: FollowerModel[] = await followerService.getFollowerByUserId(user.id)
                const vacations: VacationsModel[] = []
                for (let vacation of followedVacations) {
                    const userFollowedVacation: VacationsModel = await vacationService.getOneVacation(vacation.vacationID)
                    vacations.push(userFollowedVacation)
                }
                if (vacations.length === 0) {
                    setFollowedVacations(null)
                }
                else setFollowedVacations(vacations)
            }
        }
        catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="FollowedVacations">
            <h2>Followed Vacations</h2>
            <Row className="row">
                {followedVacations ? followedVacations.map(oneVacation => <Col key={oneVacation.id}><VacationCard vacation={oneVacation} /></Col>) :
                    <>
                        <h5>Wow, so empty</h5>
                        <p>Seems like you dont have any followed vacations</p>
                        <NavLink to={"/vacations"}>Browse our vacations</NavLink>
                    </>
                }

            </Row>
        </div>
    );
}

export default FollowedVacations;
