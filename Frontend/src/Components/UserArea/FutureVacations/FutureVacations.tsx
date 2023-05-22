import { useEffect, useState } from "react";
import "./FutureVacations.css";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import notify from "../../../Services/notifyService";
import VacationCard from "../../HomeArea/VacationCard/VacationCard";
import { Col, Row } from "react-bootstrap";
import { vacationsStore } from "../../../Redux/vacationsState";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { NavLink } from "react-router-dom";

function FutureVacations(): JSX.Element {

    useVerifyLoggedIn()

    const [futureVacations, setFutureVacations] = useState<VacationsModel[]>(null)

    useEffect(() => {
        getFutureVacations()

        const unsubscribe = vacationsStore.subscribe(() => {
            getFutureVacations()
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function getFutureVacations() {
        try {
            const now = new Date()
            const vacations = await vacationService.getAllVacations()
            const sortedVacations = vacations.filter(v => {
                const startDateParts = v.startDate.split('/')
                const startDate = new Date(Number(startDateParts[2]), Number(startDateParts[1]) - 1, Number(startDateParts[0]));
                return startDate > now
            })
            setFutureVacations(sortedVacations)
        }
        catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="FutureVacations">
            <h2>Future Vacations</h2>
            <Row className="row">
                {futureVacations && futureVacations.length !== 0 ? futureVacations.map(v => <Col key={v.id}> <VacationCard vacation={v} /></Col>) :
                    <>
                        <h5>Wow, so empty</h5>
                        <p>Seems like we dont have any future vacations</p>
                        <p>Stay tuned</p>
                        <NavLink to={"/vacations"}>Browse our vacations</NavLink>
                    </>
                }
            </Row>

        </div>
    );
}

export default FutureVacations;
