import "./Menu.css";
import logo from "../../../Assets/Images/logo-no-background.png"
import { Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/authState";
import UserModel from "../../../Models/userModel";
import { RoleModel } from "../../../Models/roleModel";

function Menu(): JSX.Element {

    const [placeholder, setPlaceholder] = useState<string>("🔍")
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [user, setUser] = useState<UserModel>(null)

    useEffect(() => {
        const user = authStore.getState().user
        setUser(user)

        const unsubscribe = authStore.subscribe(() => {
            const user = authStore.getState().user
            setUser(user)
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
            {user &&
                <>
                    <Row className="searchRow">
                        <input type="text" placeholder={placeholder} onFocus={changePlaceholder} onBlur={changePlaceholder} />
                    </Row>
                    <Row className="navs">
                        {user.role === RoleModel.User &&
                            <NavLink to='/followed-vacations'>Followed Vacations</NavLink>
                        }
                        <NavLink to="/future-vacations">Future Vacations</NavLink>
                        <NavLink to="/current-vacations">Current Vacations</NavLink>
                    </Row>
                </>
            }
        </div>
    );
}

export default Menu;
