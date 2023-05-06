import { useParams } from "react-router-dom";
import "./VacationsDetails.css";
import VacationsModel from "../../../Models/vacationModel";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import appConfig from "../../../Utils/appConfig"
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";

function VacationsDetails(): JSX.Element {

    useVerifyLoggedIn()

    const id = +useParams().vacationId
    const [vacation, setVacation] = useState<VacationsModel>()

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="VacationsDetails">
            {vacation && <>
                <h2>{vacation.destination}</h2>
                <p>{vacation.startDate} - {vacation.endDate}</p>
                <p>{vacation.description}</p>
                <img src={appConfig.vacationImagesUrl + vacation.id} />
            </>
            }
        </div>
    );
}

export default VacationsDetails;
