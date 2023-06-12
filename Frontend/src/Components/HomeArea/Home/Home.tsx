import "./Home.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import VacationCard from "../VacationCard/VacationCard";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import VacationsModel from "../../../Models/vacationModel";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { authStore } from "../../../Redux/authState";
import { RoleModel } from "../../../Models/roleModel";
import { NavLink } from "react-router-dom";
import { vacationsStore } from "../../../Redux/vacationsState";
import Loader from "../../SharedArea/Loader/Loader";

function Home(): JSX.Element {
    useVerifyLoggedIn()

    const [vacations, setVacations] = useState<VacationsModel[]>([])
    const [displayedVacations, setDisplayedVacations] = useState<VacationsModel[]>([])
    const [visibleVacationCount, setVisibleVacationCount] = useState(10)

    useEffect(() => {
        // Getting all vacations 
        vacationService
            .getAllVacations()
            .then(v => {
                // Storing all vacations
                setVacations(v)

                // Displaying only some vacations by number slice - at first 10 vacations
                setDisplayedVacations(v.slice(0, visibleVacationCount))
            })
            .catch(err => notify.error(err))

        const unsubscribe = vacationsStore.subscribe(() => {
            vacationService.getAllVacations()
                .then(v => {
                    setVacations(v)
                    setVisibleVacationCount(10)
                    setDisplayedVacations(v.slice(0, visibleVacationCount))
                })
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function loadMoreVacations() {
        // Getting the next 10 vacations 
        const additionalVacations = vacations.slice(
            visibleVacationCount,
            visibleVacationCount + 10
        )

        // Create new vacations array - with 10 more and send it to display
        const newDisplayedVacations = [...displayedVacations, ...additionalVacations]
        setDisplayedVacations(newDisplayedVacations)

        // Changing the count for the next click
        const newCount = visibleVacationCount + 10
        setVisibleVacationCount(newCount)
    }

    return (
        <div className="Home">
            <Row className="row">
                {authStore.getState().user && authStore.getState().user.role === RoleModel.Admin &&
                    <>
                        <Col xs="2">
                        </Col>

                        <Col xs="6" sm="6">
                            <h2>Our Vacations (admin)</h2>
                        </Col>

                        <Col className="addVacation" xs={"4"} sm="4">
                            <NavLink to={"/add-vacation"}>Add New Vacation</NavLink>
                        </Col>
                    </>}

                {authStore.getState().user && authStore.getState().user.role === RoleModel.User &&
                    <>
                        <Col>
                            <h2>Our Vacations</h2>
                        </Col>
                    </>}
            </Row>
            {
                vacations.length !== 0 ? <>
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
                    )} </>
                    : <Loader />
            }
        </div>
    );
}

export default Home