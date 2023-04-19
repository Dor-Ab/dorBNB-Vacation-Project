import { useEffect, useState } from "react";
import "./Footer.css";

function Footer(): JSX.Element {

    const [currentYear, setCurrentYear] = useState(0)

    useEffect(() => {
        const updatedYear = new Date().getFullYear()
        setCurrentYear(updatedYear)
    }, [])

    return (
        <div className="Footer">
            <p>All Rights Reserved To Dor Abutbul {currentYear} &copy;</p>
        </div>
    );
}

export default Footer;
