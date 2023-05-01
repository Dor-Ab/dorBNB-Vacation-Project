import { useEffect, useState } from "react";
import "./Header.css";
import { authStore } from "../../../Redux/authState";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {

    const [name, setName] = useState<string>("")

    useEffect(() => {
        const name = authStore.getState().user?.firstName
        if (name) setName(", " + name)
        const unsubscribe = authStore.subscribe(() => {
            const name = authStore.getState().user?.firstName
            if (name) setName(", " + name)
            else setName("")
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // hey
    function isMorning(): boolean {
        const now = new Date()
        return now.getHours() > 5 && now.getHours() <= 12
    }

    function isAfterNoon(): boolean {
        const now = new Date()
        return now.getHours() > 12 && now.getHours() <= 18
    }

    function isEvening(): boolean {
        const now = new Date()
        return now.getHours() > 18 && now.getHours() <= 20;
    }

    function isNight(): boolean {
        const now = new Date()
        return now.getHours() > 20 || now.getHours() <= 5
    }

    return (
        <div className="Header">
            <Row>
                <Col xs={'11'} sm={'8'} md={'7'} lg={'6'} xl={'5'} xxl={'4'}>
                    {isMorning() && <h2>Good Morning{name}🌞</h2>}
                    {isAfterNoon() && <h2>Good Afternoon{name}😀</h2>}
                    {isEvening() && <h2>Lovely Evening{name}🌙</h2>}
                    {isNight() && <h2>Don't Forget To Get Some Sleep{name}🌙💤</h2>}
                </Col>
                <Col>
                </Col>
                <Col xs={'1'} className="authBtns">
                    <NavLink className={"link"} to={"/login"}>Login</NavLink>
                    <NavLink className={"link"} to={"/Register"}>Register</NavLink>
                </Col>
            </Row>

        </div>
    );
}

export default Header;

