import { useEffect, useState } from "react";
import { DarkModeActionType, darkModeStore } from "../../../Redux/darkModeState";
import "./DarkMode.css";

function DarkMode(): JSX.Element {

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [btnContent, setBtnContent] = useState<string>("🌙")

    useEffect(() => {
        const isDark = localStorage.getItem("darkMode")
        if (isDark) {
            setDarkMode(true)
            setBtnContent("🌞")
            darkModeStore.dispatch({ type: DarkModeActionType.DarkMode, payload: true })
        }
        else {
            setDarkMode(false)
            setBtnContent("🌙")
            darkModeStore.dispatch({ type: DarkModeActionType.LightMode, payload: false })
        }
    })

    function darkModeBtnHandle() {
        if (darkMode) {
            darkModeStore.dispatch({ type: DarkModeActionType.LightMode, payload: false })
            setBtnContent("🌙")
            localStorage.removeItem("darkMode")
        }
        else {
            darkModeStore.dispatch({ type: DarkModeActionType.DarkMode, payload: true })
            setBtnContent("🌞")
            localStorage.setItem("darkMode", "true")
        }

    }

    return (
        <button className="DarkMode" onClick={darkModeBtnHandle}>{btnContent}</button>
    );
}

export default DarkMode;
