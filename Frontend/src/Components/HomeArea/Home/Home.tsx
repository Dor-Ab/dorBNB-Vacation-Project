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
            .then(v => setVacations(v))
            .catch(err => notify.error(err))
    }, [])

    return (
        <div className="Home">
            <h2>Home</h2>
            <Row className="row">
                {vacations.map(vacation => <Col key={vacation.id}><VacationCard vacation={vacation} /></Col>)}
            </Row>
        </div>
    );
}

export default Home;
