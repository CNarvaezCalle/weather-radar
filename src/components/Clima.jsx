import { useState, useEffect } from "react"
import axios from 'axios';


    const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
    const API_key = `a3888691b1409d370827f0cfc2b82562`

const Clima = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [responseData, setResponseData] = useState({})

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
            setResponseData(response.data)
        })

    }, []) 
 
    return(
        <h2>{responseData.name}</h2>
    )
}

export default Clima