import "./Menu.css";
import logo from "../../../Assets/Images/logo-no-background.png"
import { Image, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { authStore } from "../../../Redux/authState";
import UserModel from "../../../Models/userModel";
import { RoleModel } from "../../../Models/roleModel";

function Menu(): JSX.Element {

    const [placeholder, setPlaceholder] = useState<string>("🔍")
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [user, setUser] = useState<UserModel>()

    const navTo = useNavigate()

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

    function changePlaceholder(e: SyntheticEvent) {
        if (isSearch) {
            (e.target as HTMLInputElement).value = ""
            setPlaceholder("🔎")
            setIsSearch(false)
        }
        else {
            setPlaceholder("Search...")
            setIsSearch(true)
        }
    }

    function handleSearch(e: SyntheticEvent) {
        if ((e.target as HTMLInputElement).value) {
            navTo("/search/" + (e.target as HTMLInputElement).value)
        }
        else {
            navTo("/vacations")
        }
    }

    return (
        <div className="Menu">
            <Row className="logoRow">
                {
                    user &&
                    <>
                        <NavLink to={"vacations"}>
                            <Image fluid src={logo} />
                        </NavLink>
                    </>
                }
                {!user &&
                    <Image fluid src={logo} />
                }
            </Row>
            {user &&
                <>
                    <Row className="searchRow">
                        <input type="text" placeholder={placeholder} onFocus={e => changePlaceholder(e)} onBlur={e => changePlaceholder(e)} onInput={e => handleSearch(e)} />
                    </Row>
                    <Row className="navs">
                        {user.role === RoleModel.User &&
                            <NavLink to='/followed-vacations'>Followed Vacations</NavLink>
                        }
                        {user.role === RoleModel.Admin &&
                            <NavLink to="/vacations-reports">Vacations Reports</NavLink>
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
