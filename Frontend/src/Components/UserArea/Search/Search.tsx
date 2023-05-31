import { useParams } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import vacationService from "../../../Services/vacationService";
import VacationsModel from "../../../Models/vacationModel";
import notify from "../../../Services/notifyService";
import VacationCard from "../../HomeArea/VacationCard/VacationCard";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { vacationsStore } from "../../../Redux/vacationsState";


function Search(): JSX.Element {

    useVerifyLoggedIn()

    const [searchVacations, setSearchVacations] = useState<VacationsModel[]>([])

    const searchValue = useParams().searchValue

    useEffect(() => {
        vacationService.getAllVacations()
            .then(v => {
                const filterd = v.filter(v => v.destination.includes(searchValue) || v.destination.toLowerCase().includes(searchValue))
                setSearchVacations(filterd)
            })
            .catch(err => notify.error(err))

        const unsubscribe = vacationsStore.subscribe(() => {
            vacationService.getAllVacations()
                .then(v => {
                    const filterd = v.filter(v => v.destination.includes(searchValue) || v.destination.toLowerCase().includes(searchValue))
                    setSearchVacations(filterd)
                })
                .catch(err => notify.error(err))
        })

        return () => {
            unsubscribe()
        }
    }, [searchValue])

    return (
        <div className="Search">
            <h2>Search</h2>
            <Row className="row">
                {searchVacations && searchVacations.length !== 0 ? searchVacations.map(v =>
                    <Col key={v.id}>
                        <VacationCard vacation={v} />
                    </Col>) :
                    <>
                        <h5>Wow, so empty</h5>
                        <p>Seems like we dont have your desired vacation</p>
                        <p>Stay tuned</p>
                        <NavLink to={"/vacations"}>Browse our vacations</NavLink>
                    </>}
            </Row>
        </div >
    );
}

export default Search;
