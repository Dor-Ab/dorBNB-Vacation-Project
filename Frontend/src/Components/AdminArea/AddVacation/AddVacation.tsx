import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationsModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/vacationService";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/notifyService";
import { SyntheticEvent, useEffect, useState, useId } from "react";
import { Col, Row } from "react-bootstrap";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";

function AddVacation(): JSX.Element {

    useVerifyAdmin()
    const imageId = useId()

    const { register, handleSubmit } = useForm<VacationsModel>()
    const [userImage, setUserImage] = useState<File>()
    const [userImageUrl, setUserImageUrl] = useState<string>()

    const [emulatedVacationHead, setEmulatedVacationHead] = useState<string>("Destination")
    const [emulatedVacationText, setEmulatedVacationText] = useState<string>("Description")
    const [emulatedVacationStart, setEmulatedVacationStart] = useState<string>("00/00/0000")
    const [emulatedVacationEnd, setEmulatedVacationEnd] = useState<string>("00/00/0000")
    const [emulatedVacationPrice, setEmulatedVacationPrice] = useState<string>("0000")

    const [isUserTyping, setIsUserTyping] = useState<boolean>(false)

    const navTo = useNavigate()

    useEffect(() => {
        if (userImage) setUserImageUrl(URL.createObjectURL(userImage))
    }, [userImage])

    async function send(vacation: VacationsModel) {
        try {
            await vacationService.addVacation(vacation)
            navTo("/vacations")
            notify.success(`${vacation.destination} added`)
        } catch (err) {
            notify.error(err)
        }
    }

    function handleImageChange(e: SyntheticEvent) {
        setUserImage((e.target as HTMLInputElement).files[0])
    }

    function deleteEmultedVacation() {
        setUserImageUrl("")
        setEmulatedVacationPrice("0000")
        setEmulatedVacationEnd("00/00/0000")
        setEmulatedVacationStart("00/00/0000")
        setEmulatedVacationText("Description")
        setEmulatedVacationHead("Destination")
    }


    return (
        <div className="AddVacation">
            <Row className=".row">
                <Col className=".col">
                    <form className="myForm" onSubmit={handleSubmit(send)}>
                        <h3>New Vacation</h3>

                        <label>Destination:</label>
                        <input type="text" autoComplete="off"
                            onClick={() => setIsUserTyping(true)}
                            onInput={(e) => setEmulatedVacationHead(e.currentTarget.value)}
                            {...register("destination")} />

                        <label>Description:</label>
                        <textarea
                            onInput={(e) => setEmulatedVacationText(e.currentTarget.value)}
                            onClick={(e) => setEmulatedVacationText(e.currentTarget.value)}
                            {...register("description")} ></textarea>

                        <label>Start Date:</label>
                        <input type="date"
                            onInput={(e) => setEmulatedVacationStart(e.currentTarget.value)}
                            onClick={(e) => setEmulatedVacationStart(e.currentTarget.value)}
                            {...register("startDate")} />

                        <label>End Date:</label>
                        <input type="date"
                            onInput={(e) => setEmulatedVacationEnd(e.currentTarget.value)}
                            onClick={(e) => setEmulatedVacationEnd(e.currentTarget.value)}
                            {...register("endDate")} />

                        <label>Price:</label>
                        <input type="number" autoComplete="off"
                            onInput={(e) => setEmulatedVacationPrice(e.currentTarget.value)}
                            onClick={(e) => setEmulatedVacationPrice(e.currentTarget.value)}
                            {...register("price")} />


                        <div className="photoContainer">
                            <label className="addVacationImageLabel" htmlFor={imageId}>Add Image</label>
                            <button type="reset" className="deleteUserImage"
                                onClick={deleteEmultedVacation}>
                                <span>❌</span>
                            </button>
                        </div>
                        <input type="file" id={imageId} onInputCapture={(e) => handleImageChange(e)} accept="image/*" {...register("photo")} />

                        <button>Add Vacation</button>
                    </form >
                </Col>
                {isUserTyping &&
                    <Col className="col">
                        <h3>Your Vacation</h3>
                        <div className="emulatedVacationCard" style={{ backgroundImage: `url(${userImageUrl})` }}>
                            <Row className="row">
                                <h3 className="vacationHead">{emulatedVacationHead}</h3>
                                <p className="vacationDescription">{emulatedVacationText}</p>
                            </Row>
                            <Row className="row">
                                <p>{emulatedVacationStart} <br /> - <br />{emulatedVacationEnd}</p><br />
                                <p>{emulatedVacationPrice}$</p>
                            </Row>
                        </div>
                    </Col>
                }
            </Row>
        </div >
    );
}

export default AddVacation;
