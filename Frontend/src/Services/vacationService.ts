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

    public async addVacation(vacation: VacationsModel): Promise<void> {
        const formData = new FormData()

        formData.append("destination", vacation.destination)
        formData.append("description", vacation.description)
        formData.append("startDate", vacation.startDate)
        formData.append("endDate", vacation.endDate)
        formData.append("price", vacation.price.toString())
        formData.append("photo", vacation.photo[0])

        const response = await axios.post<VacationsModel>(appConfig.vacationsUrl, formData)
        const addedVacation = response.data

        const dateStart = new Date(vacation.startDate);
        const formattedDateStart = dateStart.toLocaleDateString('en-GB');
        addedVacation.startDate = formattedDateStart

        const dateEnd = new Date(vacation.endDate);
        const formattedDateEnd = dateEnd.toLocaleDateString('en-GB');
        addedVacation.endDate = formattedDateEnd


        vacationsStore.dispatch({ type: VacationsActionType.AddVacations, payload: addedVacation })
    }

    public async deleteVacation(vacation: VacationsModel): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacation.id)
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacation })
    }

    public async updateVacation(vacation: VacationsModel): Promise<void> {
        const formData = new FormData()
        formData.append("destination", vacation.destination)
        formData.append("description", vacation.description)
        formData.append("startDate", vacation.startDate)
        formData.append("endDate", vacation.endDate)
        formData.append("price", vacation.price.toString())
        formData.append("photoName", vacation.photoName)
        formData.append("photo", vacation.photo[0])

        const response = await axios.put<VacationsModel>(appConfig.vacationsUrl + vacation.id, formData)
        const updatedVacation = response.data

        const dateStart = new Date(vacation.startDate)
        const formattedDateStart = dateStart.toLocaleDateString('en-GB');
        updatedVacation.startDate = formattedDateStart

        const dateEnd = new Date(vacation.endDate);
        const formattedDateEnd = dateEnd.toLocaleDateString('en-GB');
        updatedVacation.endDate = formattedDateEnd

        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation })
    }

}

const vacationService = new VacationsService()
export default vacationService