import { useEffect, useState } from "react";
import "./Footer.css";
import { Row } from "react-bootstrap";

function Footer(): JSX.Element {

    const [currentYear, setCurrentYear] = useState(0)

    useEffect(() => {
        const updatedYear = new Date().getFullYear()
        setCurrentYear(updatedYear)
    }, [])

    return (
        <div className="Footer">
            <Row className="row">
                <p>All Rights Reserved To Dor Abutbul {currentYear} &copy;</p>
            </Row>
        </div>
    );
}

export default Footer;
