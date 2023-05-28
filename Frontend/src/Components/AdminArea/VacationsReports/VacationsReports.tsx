import { useEffect, useState } from "react";
import "./VacationsReports.css";
import followerService from "../../../Services/followersService";
import notify from "../../../Services/notifyService";
import FollowerModel from "../../../Models/followerModel";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";

function VacationsReports(): JSX.Element {

    useVerifyAdmin()

    const [followers, setFollowers] = useState<FollowerModel[]>()

    useEffect(() => {
        followerService.getFollowers()
            .then(f => setFollowers(f))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="VacationsReports">
            <h2>Vacation Reports are:</h2>
        </div>
    );
}

export default VacationsReports;
