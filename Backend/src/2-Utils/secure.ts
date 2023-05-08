import UserModel from "../4-Models/user-model";
import jwt from "jsonwebtoken"
import { Request } from "express";
import { RoleModel } from "../4-Models/role-model";
import crypto from "crypto"

const secretKey = "DorAbJb"

function getNewToken(user: UserModel): string {

    delete user.password

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

const salt = "DorAbFullStackDev"

function hash(text: string): string {
    if (!text) return null
    const hashedText = crypto.createHmac("sha512", salt).update(text).digest("hex")

    return hashedText
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hash
}