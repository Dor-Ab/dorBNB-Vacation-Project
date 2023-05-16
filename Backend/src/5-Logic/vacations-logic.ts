import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import VacationsModel from "../4-Models/vacations-model";
import fsPromise from "fs/promises"

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

    const sql = `
    INSERT INTO vacations(vacationDestination,vacationDescription,vacationStartDate,vacationEndDate,vacationPrice,vacationPhotoName) 
    VALUES(?,?,?,?,?,?)
    `
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.photoName])

    vacation.id = info.insertId

    return vacation
}

async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const errors = vacation.validate()
    if (errors) throw new ValidationErrorModel(errors)

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
    const sql = `
    DELETE FROM vacations 
    WHERE vacationID = ?
    `

    const info: OkPacket = await dal.execute(sql, [id])

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)
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