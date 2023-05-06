import { useEffect, useState } from "react";
import "./Header.css";
import { authStore } from "../../../Redux/authState";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


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

    // const darkBackground = `darkBackground`
    const [darkBackground, setDarkBackground] = useState<string | null>("")

    function isClicked() {
        const currentBackground = "darkBackground"
        setDarkBackground(currentBackground)
    }

    function isBlur() {
        const btn = document.getElementById("clicker")
        btn.click()
        const currentBackground = ""
        setDarkBackground(currentBackground)
    }

    return (
        <div className="Header">
            <Row className="row">
                <Col className="greetingCol" xs={"9"} sm={"9"}>
                    {isMorning() && <h2>Good Morning{name}🌞</h2>}
                    {isAfterNoon() && <h2>Good Afternoon{name}😀</h2>}
                    {isEvening() && <h2>Lovely Evening{name}🌙</h2>}
                    {isNight() && <h2>Good Night{name}🌙💤</h2>}
                </Col>
                <Col className="authBtns" xs={"2"}>
                    <Navbar collapseOnSelect expand="sm" bg="none" variant="light">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="clicker" onFocus={isClicked} onBlur={isBlur} />
                        <Navbar.Collapse id="responsive-navbar-nav" className={`${darkBackground}`}>
                            <Nav className={`mr-auto`} >
                                {/* <Nav.Item> */}
                                <NavLink className={"link"} to={"/login"}>Login</NavLink>
                                {/* </Nav.Item> */}
                                {/* <Nav.Item> */}
                                <NavLink className={"link"} to={"/Register"}>Register</NavLink>
                                {/* </Nav.Item> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>

        </div >
    );
}

export default Header;

