import Joi from "joi"

class FollowerModel {
    public followerID: number
    public firstName: string
    public lastName: string
    public destination: string
    public userID: number
    public vacationID: number

    public constructor(follower: FollowerModel) {
        this.followerID = follower.followerID
        this.firstName = follower.firstName
        this.lastName = follower.lastName
        this.destination = follower.destination
        this.userID = follower.userID
        this.vacationID = follower.vacationID
    }

    public static validationSchema = Joi.object({
        followerID: Joi.number().optional(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        destination: Joi.string().optional(),
        userID: Joi.number().required().integer().positive(),
        vacationID: Joi.number().required().integer().positive()
    })

    public validate(): string {
        const result = FollowerModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default FollowerModel