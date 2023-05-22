import { useState, useEffect } from "react";
import VacationsModel from "../../../Models/vacationModel";
import { vacationsStore } from "../../../Redux/vacationsState";
import notify from "../../../Services/notifyService";
import vacationService from "../../../Services/vacationService";
import "./CurrentVacations.css";
import { Row, Col } from "react-bootstrap";
import VacationCard from "../../HomeArea/VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { NavLink } from "react-router-dom";

function CurrentVacations(): JSX.Element {

    useVerifyLoggedIn()

    const [currentVacations, setCurrentVacations] = useState<VacationsModel[]>(null)

    useEffect(() => {
        getCurrentVacations()

        const unsubscribe = vacationsStore.subscribe(() => {
            getCurrentVacations()
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function getCurrentVacations() {
        try {
            const now = new Date()
            const vacations = await vacationService.getAllVacations()
            const currentVacations = vacations.filter((vacation) => {
                const startDateParts = vacation.startDate.split('/');
                const endDateParts = vacation.endDate.split('/');
                const startDate = new Date(Number(startDateParts[2]), Number(startDateParts[1]) - 1, Number(startDateParts[0]));
                const endDate = new Date(Number(endDateParts[2]), Number(endDateParts[1]) - 1, Number(endDateParts[0]));
                return startDate <= now && endDate >= now;
            });
            setCurrentVacations(currentVacations)

        }
        catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="CurrentVacations">
            <h2>Current Vacations</h2>
            <Row className="row">
                {currentVacations && currentVacations.length !== 0 ? currentVacations.map(v => <Col key={v.id}> <VacationCard vacation={v} /></Col>) :
                    <>
                        <h5>Wow, so empty</h5>
                        <p>Seems like we dont have any current vacations</p>
                        <p>Stay tuned</p>
                        <NavLink to={"/vacations"}>Browse our vacations</NavLink>
                    </>
                }
            </Row>
        </div>
    );
}

export default CurrentVacations;
