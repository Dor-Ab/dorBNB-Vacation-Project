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
import { NavLink, useNavigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import notify from "../../../Services/notifyService";
import { RoleModel } from "../../../Models/roleModel";

function FollowedVacations(): JSX.Element {

    useVerifyLoggedIn()
    const navTo = useNavigate()

    const [followedVacations, setFollowedVacations] = useState<VacationsModel[]>(null)

    useEffect(() => {

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
            if (authStore.getState().user) {
                if (authStore.getState().user.role === RoleModel.User) {

                    const followedVacations: FollowerModel[] = await followerService.getFollowerByUserId(authStore.getState().user.id)
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
                else {
                    navTo("/vacations")
                    notify.error("Admin can't follow vacations")
                }
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
                {followedVacations && followedVacations.length !== 0 ? followedVacations.map(oneVacation => <Col key={oneVacation.id}><VacationCard vacation={oneVacation} /></Col>) :
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
