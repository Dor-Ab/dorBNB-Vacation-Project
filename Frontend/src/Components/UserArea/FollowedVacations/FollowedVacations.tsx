import { useEffect, useState } from "react";
import "./FollowedVacations.css";
import VacationsModel from "../../../Models/vacationModel";
import { followersStore } from "../../../Redux/followersState";
import { authStore } from "../../../Redux/authState";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";

function FollowedVacations(): JSX.Element {

    const [followedVacations, setFollowedVacations] = useState<any[]>([])

    useEffect(() => {
        const followers = followerService.getFollowers()
            .then(f => {
                const userFollowing = f.filter(f => f.userID === authStore.getState().user.id)
                setFollowedVacations(userFollowing)
            })
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="FollowedVacations">
            {followedVacations.map(f => <span>hey</span>)}
        </div>
    );
}

export default FollowedVacations;
