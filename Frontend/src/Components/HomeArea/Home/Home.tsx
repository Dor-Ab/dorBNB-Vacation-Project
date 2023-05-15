import "./Home.css";
import VacationCard from "../VacationCard/VacationCard";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import VacationsModel from "../../../Models/vacationModel";
import { Col, Row } from "react-bootstrap";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";

function Home(): JSX.Element {
    useVerifyLoggedIn()

    const [vacations, setVacations] = useState<VacationsModel[]>([])

    useEffect(() => {
        vacationService.getAllVacations()
            .then(v => {
                v.sort((a, b) => {
                    const datePartsA = a.startDate.split('/').map(Number);
                    const datePartsB = b.startDate.split('/').map(Number);
                    const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
                    const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
                    return dateA.getTime() - dateB.getTime();
                });
                setVacations(v)
            })
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="Home">
            <h2>Current Vacations</h2>
            <Row className="row">
                {vacations.map(vacation => <Col key={vacation.id}><VacationCard vacation={vacation} /></Col>)}
            </Row>
        </div>
    );
}

export default Home;
