import axios from "axios"
import appConfig from "../Utils/appConfig"
import FollowerModel from "../Models/followerModel"

class FollowerService {

    public async addFollower(follower: FollowerModel) {
        const result = axios.post(appConfig.followersUrl, follower)
        const data = (await result).data
    }

    // public async removeFollower(follower: FollowerModel): Promise<void> {
    //     const result = axios.delete

    // }

}

const followerService = new FollowerService()
export default followerService