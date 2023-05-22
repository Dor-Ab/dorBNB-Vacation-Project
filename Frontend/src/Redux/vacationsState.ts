import { createStore } from "redux";
import VacationsModel from "../Models/vacationModel";

export class VacationsState {
    public vacations: VacationsModel[] = []
}

export enum VacationsActionType {
    FetchVacations,
    AddVacations
}

export interface VacationsAction {
    type: VacationsActionType
    payload?: any
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState }

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload
            break
        case VacationsActionType.AddVacations:
            newState.vacations.push(action.payload)
            break
    }

    return newState
}

export const vacationsStore = createStore(vacationsReducer)