import { OkPacket } from "mysql"
import dal from "../2-Utils/dal"
import FollowerModel from "../4-Models/followers-model"
import { ErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/error-model"

async function getFollowers(): Promise<FollowerModel[]> {
    const sql = `
    SELECT
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacations.vacationDestination AS 'destination', 
        users.userID ,
        vacations.vacationID 
    FROM followers
        JOIN users ON followers.userID = users.userID 
        JOIN vacations ON followers.vacationID = vacations.vacationID;
    `

    const followers = await dal.execute(sql)

    return followers
}

async function getOneFollowerInfo(id: number): Promise<FollowerModel> {
    const sql = `
    SELECT
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacations.vacationDestination AS 'destination', 
        users.userID ,
        vacations.vacationID 
    FROM followers
        JOIN users ON followers.userID = users.userID 
        JOIN vacations ON followers.vacationID = vacations.vacationID
    WHERE followers.userID = ${id}
    `

    const followerInfo = await dal.execute(sql)

    return followerInfo
}

async function addFollower(follower: FollowerModel) {
    const errors = follower.validate()
    if (errors) throw new ValidationErrorModel(errors)

    const checkIfExist = `
    SELECT * FROM followers
    WHERE userID = ${follower.userID} AND vacationID = ${follower.vacationID}
    `

    const response = await dal.execute(checkIfExist)

    if (response[0]) throw new ValidationErrorModel("Already exist")

    const sql = `
    INSERT INTO followers(userID, vacationID) VALUES ('${follower.userID}','${follower.vacationID}')
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ErrorModel("Something went wrong", 400)

    return follower
}

async function removeFollower(follower: FollowerModel): Promise<void> {
    const errors = follower.validate()
    if (errors) throw new ValidationErrorModel(errors)

    const sql = `
    DELETE FROM followers
    WHERE userID = ${follower.userID}
    AND vacationID = ${follower.vacationID}
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(follower.userID)
}

export default {
    getFollowers,
    getOneFollowerInfo,
    addFollower,
    removeFollower
}