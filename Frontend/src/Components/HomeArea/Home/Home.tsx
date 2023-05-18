import "./Home.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import VacationCard from "../VacationCard/VacationCard";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import VacationsModel from "../../../Models/vacationModel";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";

function Home(): JSX.Element {
    useVerifyLoggedIn();

    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [displayedVacations, setDisplayedVacations] = useState<VacationsModel[]>([]);
    const [visibleVacationCount, setVisibleVacationCount] = useState(5);

    useEffect(() => {
        vacationService
            .getAllVacations()
            .then((v) => {
                setVacations(v);
                setDisplayedVacations(v.slice(0, visibleVacationCount));
            })
            .catch((err) => notify.error(err));
    }, [visibleVacationCount]);

    function loadMoreVacations() {
        const additionalVacations = vacations.slice(
            visibleVacationCount,
            visibleVacationCount + 5
        );
        setDisplayedVacations((prevVacations) => [...prevVacations, ...additionalVacations]);
        setVisibleVacationCount((prevCount) => prevCount + 5);
    };

    return (
        <div className="Home">
            <h2>Our Vacations</h2>
            <Row className="row">
                {displayedVacations.map((vacation) => (
                    <Col key={vacation.id}>
                        <VacationCard vacation={vacation} />
                    </Col>
                ))}
            </Row>
            <Row className="row">
                <Col className="loadMore">
                    {visibleVacationCount < vacations.length && (
                        <button onClick={loadMoreVacations}>Load More</button>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Home;
