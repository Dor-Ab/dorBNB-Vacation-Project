import "./Menu.css";
import logo from "../../../Assets/Images/logo-no-background.png"
import { Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/authState";

function Menu(): JSX.Element {

    const [placeholder, setPlaceholder] = useState<string>("🔍")
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [userToken, setUserToken] = useState<string | null>(null)

    useEffect(() => {
        const token = authStore.getState().token
        setUserToken(token)

        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token
            setUserToken(token)
        })

        return () => {
            unsubscribe()
        }
    }, [])

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
            {userToken &&
                <>
                    <Row className="searchRow">
                        <input type="text" placeholder={placeholder} onFocus={changePlaceholder} onBlur={changePlaceholder} />
                    </Row>
                    <Row className="navs">
                        <NavLink to='/followed-vacations'>Followed Vacations</NavLink>
                        <NavLink to="/future-vacations">Future Vacations</NavLink>
                    </Row>
                </>
            }
        </div>
    );
}

export default Menu;
