import UserModel from "../4-Models/user-model";
import jwt from "jsonwebtoken"
import { Request } from "express";
import { RoleModel } from "../4-Models/role-model";

const secretKey = "DorAbJb"

function getNewToken(user: UserModel): string {
    const container = { user }
    const token = jwt.sign(container, secretKey)
    return token
}

function verifyToken(requset: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = requset.headers.authorization
            if (!header) {
                resolve(false)
                return
            }

            const token = header.substring(7)
            if (!token) {
                resolve(false)
                return
            }

            jwt.verify(token, secretKey, err => {
                if (err) {
                    resolve(false)
                    return
                }

                resolve(true)
            })
        }
        catch (err: any) {
            reject(err)
        }
    })
}

async function verifyAdmin(request: Request): Promise<boolean> {
    const isLoggedIn = await verifyToken(request)
    if (!isLoggedIn) return false
    const header = request.headers.authorization
    const token = header.substring(7)
    const container: any = jwt.decode(token)
    const user: UserModel = container.user
    return user.role === RoleModel.Admin
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
}