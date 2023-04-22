import { useParams } from "react-router-dom";
import "./VacationsDetails.css";
import VacationsModel from "../../../Models/vacationModel";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";

function VacationsDetails(): JSX.Element {

    const id = +useParams().vacationId
    const [vacation, setVacation] = useState<VacationsModel>()

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="VacationsDetails">
            
        </div>
    );
}

export default VacationsDetails;
