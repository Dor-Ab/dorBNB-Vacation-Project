import axios from "axios"
import appConfig from "../Utils/appConfig"
import FollowerModel from "../Models/followerModel"
import { FollowersActionType, followersStore } from "../Redux/followersState"

class FollowerService {

    public async getFollowers(): Promise<FollowerModel[]> {

        let followers = followersStore.getState().followers

        if (followers.length === 0) {
            const response = await axios.get<FollowerModel[]>(appConfig.followersUrl)
            followers = response.data
            followersStore.dispatch({ type: FollowersActionType.FetchFollowers, payload: followers })
        }

        return followers
    }

    public async addFollower(follower: FollowerModel) {
        const response = await axios.post(appConfig.followersUrl, follower)
        const addedFollower = response.data
        followersStore.dispatch({ type: FollowersActionType.AddFollower, payload: addedFollower })
    }

    public async removeFollower(follower: FollowerModel): Promise<void> {
        await axios.delete(`${appConfig.followersUrl}${follower.userID}/${follower.vacationID}`)
        followersStore.dispatch({ type: FollowersActionType.DeleteFollower, payload: follower })
    }

    public async getSpecificVacationByUserIdAndVacationId(userId: number, vacationId: number): Promise<boolean> {

        let followers = followersStore.getState().followers
        let followerCheck = followers.find(f => f.userID === userId && f.vacationID === vacationId)
        let follower = followerCheck ? true : false

        if (!follower) {
            const result = await axios.get(`${appConfig.specificFollower}${userId}/${vacationId}`)
            follower = result.data
        }

        return follower
    }

    public async getFollowersForVacation(id: number): Promise<FollowerModel[]> {

        let followers = followersStore.getState().followers
        let vacationFollowers = followers.filter(f => f.vacationID === id)

        if (vacationFollowers.length === 0) {
            const response = await axios.get(appConfig.followerForVacation + id)
            vacationFollowers = response.data
        }

        return vacationFollowers
    }

}

const followerService = new FollowerService()
export default followerService