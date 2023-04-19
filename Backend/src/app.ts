import express from "express"
import catchAll from "./3-Middleware/catch-all"
import routeNotFound from "./3-Middleware/route-not-found"
import appConfig from "./2-Utils/app-config"
import vacationsController from "./6-Controllers/vacations-controller"
import authController from "./6-Controllers/auth-controller"
import followersController from "./6-Controllers/followers-controller"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())

server.use("/api", vacationsController)
server.use("/api", authController)
server.use("/api", followersController)

server.use("*", routeNotFound)
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`))