import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import "./EditVacation.css";
import vacationService from "../../../Services/vacationService";
import { SyntheticEvent, useEffect, useState } from "react";
import notify from "../../../Services/notifyService";
import { Row, Col } from "react-bootstrap";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationsModel>()
    const params = useParams()
    const navTo = useNavigate()

    const [userImage, setUserImage] = useState<File>()
    const [userImageUrl, setUserImageUrl] = useState<string>()

    const [emulatedVacationHead, setEmulatedVacationHead] = useState<string>("Destination")
    const [emulatedVacationText, setEmulatedVacationText] = useState<string>("Description")
    const [emulatedVacationStart, setEmulatedVacationStart] = useState<string>("00/00/0000")
    const [emulatedVacationEnd, setEmulatedVacationEnd] = useState<string>("00/00/0000")
    const [emulatedVacationPrice, setEmulatedVacationPrice] = useState<string>("0000")

    const [isUserTyping, setIsUserTyping] = useState<boolean>(false)

    useEffect(() => {
        const vacationId = +params.vacationId
        vacationService.getOneVacation(vacationId)
            .then(vacation => {
                const startDate = formatDate(vacation.startDate)
                const endDate = formatDate(vacation.endDate)
                setValue("id", vacation.id)
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", startDate)
                setValue("endDate", endDate)
                setValue("price", vacation.price)
                setValue("photoName", vacation.photoName)
            })
            .catch(err => {
                notify.error(err)
            })
        if (userImage) setUserImageUrl(URL.createObjectURL(userImage))
    }, [userImage])

    function formatDate(date: string): string {
        const parts = date.split("/")
        const formattedDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`
        return formattedDate
    }

    async function send(vacation: VacationsModel) {
        try {
            await vacationService.updateVacation(vacation)
            navTo("/vacations")
            notify.success(`${vacation.destination} updated`)
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
        <div className="EditVacation">
            <Row className=".row">
                <Col className=".col">
                    <form className="myForm" onSubmit={handleSubmit(send)}>
                        <h3>New Vacation</h3>

                        <label>Destination:</label>
                        <input type="text" onClick={(e) => {
                            setIsUserTyping(true)
                            setEmulatedVacationHead(e.currentTarget.value)
                        }}
                            onInput={(e) => setEmulatedVacationHead(e.currentTarget.value)}
                            {...register("destination")} />

                        <label>Description:</label>
                        <textarea {...register("description")}
                            onClick={(e) => setEmulatedVacationText(e.currentTarget.value)}
                            onInput={(e) => setEmulatedVacationText(e.currentTarget.value)}></textarea>

                        <label>Start Date:</label>
                        <input type="date" {...register("startDate")}
                            onClick={(e) => setEmulatedVacationStart(e.currentTarget.value)}
                            onInput={(e) => setEmulatedVacationStart(e.currentTarget.value)} />

                        <label>End Date:</label>
                        <input type="date" {...register("endDate")}
                            onClick={(e) => setEmulatedVacationEnd(e.currentTarget.value)}
                            onInput={(e) => setEmulatedVacationEnd(e.currentTarget.value)} />

                        <label>Price:</label>
                        <input type="number" {...register("price")}
                            onClick={(e) => setEmulatedVacationPrice(e.currentTarget.value)}
                            onInput={(e) => setEmulatedVacationPrice(e.currentTarget.value)} />


                        <div className="photoContainer">
                            <label className="addVacationImageLabel" htmlFor="addVacationImage">Add Image</label>
                            <button type="button" className="deleteUserImage" onClick={deleteEmultedVacation}><span>❌</span></button>
                        </div>
                        <input type="file" id="addVacationImage" onInputCapture={(e) => handleImageChange(e)} accept="image/*" required {...register("photo")} />

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

export default EditVacation;
