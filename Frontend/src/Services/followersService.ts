import axios from "axios"
import appConfig from "../Utils/appConfig"
import FollowerModel from "../Models/followerModel"

class FollowerService {

    public async addFollower(follower: FollowerModel) {
        const result = await axios.post(appConfig.followersUrl, follower)
        const data = result.data
    }

    public async removeFollower(follower: FollowerModel): Promise<void> {
        axios.delete(`${appConfig.followersUrl}${follower.userID}/${follower.vacationID}`)
    }

    public async getSpecificVacationByUserIdAndVacationId(userId: number, vacationId: number): Promise<boolean> {
        const result = await axios.get(`${appConfig.specificFollower}${userId}/${vacationId}`)
        const data = result.data
        return data
    }

}

const followerService = new FollowerService()
export default followerService