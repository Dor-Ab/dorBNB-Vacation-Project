import express, { Request, Response, NextFunction } from "express";
import vacationsLogic from "../5-Logic/vacations-logic";
import VacationsModel from "../4-Models/vacations-model";
import verifyAdmin from "../3-Middleware/verify-admin";
import path from "path";
import verifyLoggedIn from "../3-Middleware/verify-loggedIn";

const router = express.Router()

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations()
        response.json(vacations)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/vacations/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const vacation = await vacationsLogic.getOneVacation(id)
        response.json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/vacations/images/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const imageName = await vacationsLogic.getVacationImageName(id)
        const absulotePath = path.join(__dirname, "..", "1-Assets", "Images", "Vacations Images", imageName)
        response.sendFile(absulotePath)
    }
    catch (err: any) {
        next(err)
    }
})

router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.photo = request.files?.photo
        
        const vacation = await vacationsLogic.addVacation(new VacationsModel(request.body))
        response.status(201).json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})

router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id
        request.body.photo = request.files?.photo
        const updatedVacation = await vacationsLogic.updateVacation(new VacationsModel(request.body))
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err)
    }
})

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        await vacationsLogic.deleteVacation(id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)
    }
})

export default router