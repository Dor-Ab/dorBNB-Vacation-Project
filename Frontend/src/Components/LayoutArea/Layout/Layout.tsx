import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { darkModeStore } from "../../../Redux/darkModeState";

function Layout(): JSX.Element {

    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const isDark = darkModeStore.getState().darkMode
        if (isDark) setDarkMode(true)
        else setDarkMode(false)

        const unsubscribe = darkModeStore.subscribe(() => {
            const isDark = darkModeStore.getState().darkMode
            if (isDark) setDarkMode(true)
            else setDarkMode(false)
        })

        return () => {
            unsubscribe()
        }
    })

    function darkMain() {
        if (darkMode) return { backgroundColor: "#343434", color: "white" }
    }

    function darkHeaderFooter() {
        if (darkMode) return { backgroundColor: "#202124", color: "white" }
    }

    return (
        <div className="Layout">
            <aside>
                <Menu />
            </aside>

            <header style={darkHeaderFooter()}>
                <Header />
            </header>

            <main style={darkMain()}>
                <Routing />
            </main>

            <footer style={darkHeaderFooter()}>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
