import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import VacationsModel from "../4-Models/vacations-model";
import fs from "fs"
import { v4 as uuid } from "uuid";


async function getAllVacations(): Promise<VacationsModel[]> {
    const sql = `
    SELECT 
        vacationID AS id,
        vacationDestination AS destination,
        vacationDescription AS description,
        DATE_FORMAT(vacationStartDate,'%d/%m/%Y') AS startDate,
        DATE_FORMAT(vacationEndDate,'%d/%m/%Y') AS endDate,
        vacationPrice AS price,
        vacationPhotoName AS photoName 
    FROM vacations  
        ORDER BY vacations.vacationStartDate ASC;
    `
    const vacations = await dal.execute(sql)
    return vacations
}

async function getOneVacation(id: number): Promise<VacationsModel> {
    const sql = `
    SELECT
        vacationID AS id,
        vacationDestination AS destination,
        vacationDescription AS description,
        DATE_FORMAT(vacationStartDate,'%d/%m/%Y') AS startDate,
        DATE_FORMAT(vacationEndDate,'%d/%m/%Y') AS endDate,
        vacationPrice AS price,
        vacationPhotoName AS photoName
    FROM vacations
    WHERE vacationID = ?
    `
    const vacations = await dal.execute(sql, [id])

    const vacation = vacations[0]
    if (!vacation) throw new ResourceNotFoundErrorModel(id)
    return vacation
}

async function addVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const errors = vacation.validate()
    if (errors) throw new ValidationErrorModel(errors)
    if (!vacation.photo) throw new ValidationErrorModel("Image is required")

    const now = new Date()
    if (new Date(vacation.startDate) < now) throw new ValidationErrorModel("Past dates can't be used")
    if (vacation.startDate > vacation.endDate) throw new ValidationErrorModel("Start date can't be bigger then end date")

    const extension = vacation.photo.name.substring(vacation.photo.name.lastIndexOf("."))
    vacation.photoName = uuid() + extension
    await vacation.photo.mv("./src/1-Assets/Images/Vacations Images/" + vacation.photoName)
    delete vacation.photo

    const sql = `
    INSERT INTO vacations(vacationDestination,vacationDescription,
        vacationStartDate,vacationEndDate,vacationPrice,vacationPhotoName) 
    VALUES(?,?,?,?,?,?)
    `
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.photoName])

    vacation.id = info.insertId

    return vacation
}

async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const errors = vacation.validate()
    if (errors) throw new ValidationErrorModel(errors)


    if (vacation.startDate > vacation.endDate) throw new ValidationErrorModel("Start date can't be bigger then end date")


    if (vacation.photo) {
        if (fs.existsSync("./src/1-Assets/Images/Vacations Images/" + vacation.photoName)) {
            fs.unlinkSync("./src/1-Assets/Images/Vacations Images/" + vacation.photoName)
        }
        const extension = vacation.photo.name.substring(vacation.photo.name.lastIndexOf("."))
        vacation.photoName = uuid() + extension
        await vacation.photo.mv("./src/1-Assets/Images/Vacations Images/" + vacation.photoName)
        delete vacation.photo
    }

    const sql = `
    UPDATE vacations SET
        vacationDestination = ?,
        vacationDescription = ?,
        vacationStartDate = ?,
        vacationEndDate = ?,
        vacationPrice = ?,
        vacationPhotoName = ?
    WHERE vacationID = ?;
    `

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.photoName, vacation.id])

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.id)

    return vacation
}

async function deleteVacation(id: number): Promise<void> {

    const vacation = await getOneVacation(id)

    const sql = `
    DELETE FROM vacations 
    WHERE vacationID = ?
    `

    const info: OkPacket = await dal.execute(sql, [id])

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)
    fs.unlinkSync("./src/1-Assets/Images/Vacations Images/" + vacation.photoName)
}

async function getVacationImageName(id: number): Promise<string> {

    const sql = `
    SELECT vacationPhotoName FROM vacations
    WHERE vacationID = ?;
    `

    const info = await dal.execute(sql, [id])

    if (info.length === 0) throw new ResourceNotFoundErrorModel(id)

    const imageName = info[0].vacationPhotoName

    return imageName
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationImageName
}