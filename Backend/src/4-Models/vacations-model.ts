import { UploadedFile } from "express-fileupload"
import Joi from "joi"

class VacationsModel {
    public id: number
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: number
    public photoName: string
    public photo: UploadedFile

    public constructor(vacation: VacationsModel) {
        this.id = vacation.id
        this.destination = vacation.destination
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.photoName = vacation.photoName
        this.photo = vacation.photo
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(3).max(500),
        description: Joi.string().required().min(5).max(10000),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().positive().min(10).max(10000),
        photoName: Joi.string().optional(),
        photo: Joi.object().optional()
    })

    public validate(): string {
        const result = VacationsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationsModel