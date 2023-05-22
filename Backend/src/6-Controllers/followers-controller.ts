import express, { Request, Response, NextFunction } from "express"
import UserModel from "../4-Models/user-model"
import authLogic from "../5-Logic/auth-logic"
import CredentialsModel from "../4-Models/credentials-model"
import followersLogic from "../5-Logic/followers-logic"
import FollowerModel from "../4-Models/followers-model"
import verifyAdmin from "../3-Middleware/verify-admin"
import verifyLoggedIn from "../3-Middleware/verify-loggedIn"

const router = express.Router()

router.get("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await followersLogic.getFollowers()
        response.json(followers)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/followers/:userId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = +request.params.userId
        const followerInfo = await followersLogic.getFollowerByUserId(userID)
        response.json(followerInfo)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/specific-follower/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        const specificFollower = await followersLogic.isUserFollowingVacation(userId, vacationId)
        response.json(specificFollower)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/followers-by-vacation/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const specificFollower = await followersLogic.getFollowersForVacationByVacationId(vacationId)
        response.json(specificFollower)
    }
    catch (err: any) {
        next(err)
    }
})

router.post("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = await followersLogic.addFollower(new FollowerModel(request.body))
        response.json(follower)
    }
    catch (err: any) {
        next(err)
    }
})

router.delete("/followers/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        await followersLogic.removeFollower(userId, vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)
    }
})

export default router