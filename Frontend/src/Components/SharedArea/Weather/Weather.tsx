import { useEffect, useState } from "react";
import "./Weather.css";
import { weatherService } from "../../../Services/weatherService";
import notify from "../../../Services/notifyService";
import UserModel from "../../../Models/userModel";
import { authStore } from "../../../Redux/authState";
import Loader from "../Loader/Loader";

interface WeatherProps {
    city: string
}

function Weather(props: WeatherProps): JSX.Element {

    const [weather, setWeather] = useState(null)
    const [user, setUser] = useState<UserModel | null>()

    useEffect(() => {
        setUser(authStore.getState().user)

        weatherService.getWeather(props.city)
            .then(w => setWeather(w))
            .catch(err => notify.error(err))

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)

            weatherService.getWeather(props.city)
                .then(w => setWeather(w))
                .catch(err => notify.error(err))
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div className="Weather" style={{ backgroundImage: `url(${weather?.current.condition.icon})` }}>
            {user &&
                <>
                    {weather ? <>
                        <span>{props.city}</span>
                        {
                            weather &&
                            <span>{weather.current.temp_c}🌡</span>
                        }
                    </> : <Loader />
                    }
                </>
            }
        </div>
    );
}

export default Weather;
