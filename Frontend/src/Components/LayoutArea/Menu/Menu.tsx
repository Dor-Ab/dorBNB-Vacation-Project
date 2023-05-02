import "./Menu.css";
import logo from "../../../Assets/Images/logo-no-background.png"
import { Col, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Menu(): JSX.Element {

    const [placeholder, setPlaceholder] = useState<string>("🔍")
    const [isSearch, setIsSearch] = useState<boolean>(false)

    function changePlaceholder() {
        if (isSearch) {
            setPlaceholder("🔎")
            setIsSearch(false)
        }
        else {
            setPlaceholder("Search...")
            setIsSearch(true)
        }
    }

    return (
        <div className="Menu">
            <Row className="logoRow">
                <NavLink to={"vacations"}>
                    <Image fluid src={logo} />
                </NavLink>
            </Row>
            <Row className="searchRow">
                <input type="text" placeholder={placeholder} onFocus={changePlaceholder} onBlur={changePlaceholder} />
            </Row>
        </div>
    );
}

export default Menu;
