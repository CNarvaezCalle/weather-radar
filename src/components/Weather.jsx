import { useState, useEffect } from "react"
import axios from 'axios';


const Weather = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
    const API_key = `a3888691b1409d370827f0cfc2b82562`

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })

        // console.log(`${API_endpoint}
        // lat=${latitude}
        // &lon=${longitude}
        // &appid=${API_key}`)

        let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`

        axios
        .get(finalAPIEndPoint)
        .then((response) => {
            console.log(response.data)
        })

    }, []) 17:13
 
    return(
        <h2></h2>
    )
}

export default Weather