import "./Home.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import VacationCard from "../VacationCard/VacationCard";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import VacationsModel from "../../../Models/vacationModel";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";

function Home(): JSX.Element {
    useVerifyLoggedIn()

    const [vacations, setVacations] = useState<VacationsModel[]>([])
    const [displayedVacations, setDisplayedVacations] = useState<VacationsModel[]>([])
    const [visibleVacationCount, setVisibleVacationCount] = useState(5)

    useEffect(() => {
        // Getting all vacations 
        vacationService
            .getAllVacations()
            .then((v) => {
                // Storing all vacations
                setVacations(v)

                // Displaying    only some vacations by number slice - at first 5 vacations
                setDisplayedVacations(v.slice(0, visibleVacationCount))
            })
            .catch(err => notify.error(err))
    }, [])

    function loadMoreVacations() {
        // Getting the next 5 vacations 
        const additionalVacations = vacations.slice(
            visibleVacationCount,
            visibleVacationCount + 5
        )
        // Create new vacations array - with 5 more and send it to display
        const newDisplayedVacations = [...displayedVacations, ...additionalVacations]
        setDisplayedVacations(newDisplayedVacations)

        // Changing the count for the next click
        const newCount = visibleVacationCount + 5
        setVisibleVacationCount(newCount)
    };

    return (
        <div className="Home">
            <h2>Our Vacations</h2>
            <Row className="row">
                {/* Displaying the filterd vacations - not all at first */}
                {displayedVacations.map((vacation) => (
                    <Col key={vacation.id}>
                        <VacationCard vacation={vacation} />
                    </Col>
                ))}
            </Row>

            {/* Showing load more btn only if displayed vacations count (visibleVacationCount)
             is smaller then all vacations array length (vacations.length) */}
            {visibleVacationCount < vacations.length && (
                <Row className="row">
                    <Col className="loadMore">
                        <button onClick={loadMoreVacations}>Load More</button>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default Home;
