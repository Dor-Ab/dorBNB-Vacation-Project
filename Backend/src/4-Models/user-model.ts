import Joi from "joi";
import { RoleModel } from "./role-model";

class UserModel {
    public id: number
    public firstName: string
    public lastName: string
    public email: string
    public password: string
    public role: RoleModel

    public constructor(user: UserModel) {
        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.role = user.role
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(3).max(30),
        lastName: Joi.string().required().min(3).max(30),
        email: Joi.string().required().min(7).max(50),
        password: Joi.string().required().min(8).max(50),
        role: Joi.forbidden()
    })

    public validate(): string {
        const result = UserModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default UserModel