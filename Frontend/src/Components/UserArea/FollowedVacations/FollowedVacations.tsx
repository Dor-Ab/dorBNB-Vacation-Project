import { useEffect, useState } from "react";
import "./FollowedVacations.css";
import VacationsModel from "../../../Models/vacationModel";
import { followersStore } from "../../../Redux/followersState";
import { authStore } from "../../../Redux/authState";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";
import FollowerModel from "../../../Models/followerModel";
import VacationCard from "../../HomeArea/VacationCard/VacationCard";
import vacationService from "../../../Services/vacationService";

function FollowedVacations(): JSX.Element {

    const [followedVacations, setFollowedVacations] = useState<FollowerModel[]>([])
    const [vacations, setVacation] = useState<VacationsModel[]>([])

    useEffect(() => {

    }, [])

    async function handleFollowedVacations() {
        const followed = await followerService.getFollowerByUserId(authStore.getState().user.id)
    }

    return (
        <div className="FollowedVacations">

        </div>
    );
}

export default FollowedVacations;
