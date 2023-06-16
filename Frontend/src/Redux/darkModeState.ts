import { createStore } from "redux";

export class DarkModeState {
    public darkMode: boolean = false
}

export enum DarkModeActionType {
    DarkMode,
    LightMode
}

export interface DarkModeAction {
    type: DarkModeActionType
    payload?: any
}

export function darkModeReducer(currentState = new DarkModeState(), action: DarkModeAction): DarkModeState {
    const newState = { ...currentState }

    switch (action.type) {
        case DarkModeActionType.DarkMode:
            newState.darkMode = true
            break
        case DarkModeActionType.LightMode:
            newState.darkMode = false
            break
    }
    return newState
}

export const darkModeStore = createStore(darkModeReducer)