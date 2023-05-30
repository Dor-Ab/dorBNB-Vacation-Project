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

    user.password = secure.hash(user.password)
    const checkEmailQuery = `
    SELECT 
        userID AS id,
        userFirstName AS firstName,
        userLastName AS lastName,
        userEmail AS email,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE userEmail = ?
    `

    const checkEmail = await dal.execute(checkEmailQuery, [user.email])

    if (checkEmail[0]) throw new ValidationErrorModel("Email already in use.")

    user.role = RoleModel.User

    const sql = `
    INSERT INTO users(userFirstName,userLastName,userEmail,userPassword,userRole)
    VALUES(?,?,?,?,?)
    `
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.role])

    if (info.affectedRows === 0) throw new ErrorModel("Something didn't work,please try again.", 400)

    user.id = info.insertId

    const token = secure.getNewToken(user)

    return token
}

async function login(credentials: CredentialsModel): Promise<string> {
    const errors = credentials.validate()
    if (errors) throw new ValidationErrorModel(errors)

    credentials.password = secure.hash(credentials.password)

    const userCheckQuery = `
    SELECT 
        userID AS id,
        userFirstName AS firstName,
        userLastName AS lastName,
        userEmail AS email,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE userEmail = ?
    AND userPassword = ?
    `

    const userCheck = await dal.execute(userCheckQuery, [credentials.email, credentials.password])

    const user = userCheck[0]
    if (!user) throw new UnauthorizedErrorModel("Incorrect email or password.")

    const token = secure.getNewToken(user)

    return token
}

export default {
    register,
    login
}