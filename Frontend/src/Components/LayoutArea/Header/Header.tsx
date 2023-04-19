import { useEffect, useState } from "react";
import "./Header.css";
import { authStore } from "../../../Redux/authState";

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
            {isMorning() && <h2>Good Morning{name}</h2>}
            {isAfterNoon() && <h2>Have A Good Afternoon{name}</h2>}
            {isEvening() && <h2>Have A Lovely Evening{name}</h2>}
            {isNight() && <h2>Don't Forget To Get Some Sleep{name}💤</h2>}
        </div>
    );
}

export default Header;

