import Joi from "joi"

class CredentialsModel {
    public email: string
    public password: string

    public constructor(credetials: CredentialsModel) {
        this.email = credetials.email
        this.password = credetials.password
    }

    public static validationSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default CredentialsModel