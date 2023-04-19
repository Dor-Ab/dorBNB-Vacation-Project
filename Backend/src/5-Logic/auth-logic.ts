import { OkPacket } from "mysql";
import dal from "../2-Utils/dal";
import { ErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-Models/error-model";
import { RoleModel } from "../4-Models/role-model";
import UserModel from "../4-Models/user-model";
import secure from "../2-Utils/secure";
import CredentialsModel from "../4-Models/credentials-model";

async function register(user: UserModel): Promise<string> {
    const errors = user.validate()
    if (errors) throw new ValidationErrorModel(errors)

    const checkEmailQuery = `
    SELECT 
        userID AS id,
        userFirstName AS firstName,
        userLastName AS lastName,
        userEmail AS email,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE userEmail = '${user.email}'
    `

    const checkEmail = await dal.execute(checkEmailQuery)

    if (checkEmail[0]) throw new ValidationErrorModel("Email already in use.")

    user.role = RoleModel.User

    const sql = `
    INSERT INTO users(userFirstName,userLastName,userEmail,userPassword,userRole)
    VALUES('${user.firstName}','${user.lastName}','${user.email}','${user.password}','${user.role}')
    `
    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ErrorModel("Something didn't work,please try again.", 400)

    const token = secure.getNewToken(user)

    return token
}

async function login(credentials: CredentialsModel): Promise<string> {
    const errors = credentials.validate()
    if (errors) throw new ValidationErrorModel(errors)

    const userCheckQuery = `
    SELECT 
        userID AS id,
        userFirstName AS firstName,
        userLastName AS lastName,
        userEmail AS email,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE userEmail = '${credentials.email}'
    AND userPassword = '${credentials.password}'
    `

    const userCheck = await dal.execute(userCheckQuery)

    const user = userCheck[0]
    if (!user) throw new UnauthorizedErrorModel("Incorrect email or password.")

    const token = secure.getNewToken(user)

    return token
}

export default {
    register,
    login
}