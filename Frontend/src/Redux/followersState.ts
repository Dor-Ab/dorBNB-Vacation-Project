import { createStore } from "redux";
import FollowerModel from "../Models/followerModel";

export class FollowersState {
    public followers: FollowerModel[] = []
}

export enum FollowersActionType {
    FetchFollowers,
    AddFollower,
    DeleteFollower
}

export interface FollowersAction {
    type: FollowersActionType
    payload?: any
}

export function followerReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = { ...currentState }

    switch (action.type) {
        case FollowersActionType.FetchFollowers:
            newState.followers = action.payload
            break
        case FollowersActionType.AddFollower:
            newState.followers.push(action.payload)
            break
        case FollowersActionType.DeleteFollower:
            const indexToDel = newState.followers.findIndex(f => f.userID === action.payload.userID && f.vacationID === action.payload.vacationID)
            if (indexToDel >= 0) {
                newState.followers.splice(indexToDel, 1)
            }
            break
    }
    return newState
}

export const followersStore = createStore(followerReducer)