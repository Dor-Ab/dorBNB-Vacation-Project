import axios from "axios";
import appConfig from "../Utils/appConfig";

class WeatherService {

    public async getWeather(city: string) {
        const response = await axios.get(appConfig.weatherUrl + city)
        const data = response.data
        return data
    }
}

export const weatherService = new WeatherService()