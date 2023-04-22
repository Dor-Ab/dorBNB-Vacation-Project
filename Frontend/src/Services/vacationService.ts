import axios from "axios";
import VacationsModel from "../Models/vacationModel";
import appConfig from "../Utils/appConfig";
import { VacationsActionType, vacationsStore } from "../Redux/vacationsState";

class VacationsService {
    public async getAllVacations(): Promise<VacationsModel[]> {

        let vacations = vacationsStore.getState().vacations

        if (vacations.length === 0) {
            const response = await axios.get<VacationsModel[]>(appConfig.vacationsUrl)
            vacations = response.data
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations })
        }
        return vacations
    }

    public async getOneVacation(id: number): Promise<VacationsModel> {

        let vacations = vacationsStore.getState().vacations
        let vacation = vacations.find(vacation => vacation.id === id)

        if (!vacation) {
            const response = await axios.get<VacationsModel>(appConfig.vacationsUrl + id)
            vacation = response.data
        }
        return vacation
    }
}

const vacationService = new VacationsService()
export default vacationService