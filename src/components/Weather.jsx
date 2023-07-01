import { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = () => {

    const apiKey = 'a3888691b1409d370827f0cfc2b82562'
    const [ dataInfo, setDataInfo ] = useState({})
    const [ units, setUnits ] = useState('metric')
    const [ isFarenheit, setIsFarenheit ] = useState(false)
    const [ buttonText, setButtonText ] = useState("Farenheit")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(coords);
    }, [isFarenheit, buttonText])//termina aqui o solo el geo mas arriba? -- isFarenheit o units??

        function coords(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // const moreOrLess = `${position.coords.accuracy} meters?`

            
            
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=${units}`)
            .then(resp => {
                console.log(resp.data)
                setDataInfo(resp.data)
            })
            .catch(err => console.error(err))
        }
        
        const unit = () => {
            if (isFarenheit) {
                setIsFarenheit(!isFarenheit)
                setUnits('metric')
            } else {
                setIsFarenheit(!isFarenheit)
                setUnits('imperial')
            }
        }

        const button = () => {
            if (buttonText('Farenheit')) {
                setButtonText('Celcius')
            } else {
                setButtonText('Farenheit')
            }
        }

    return(
        <div className="container">
            <section>//sensacion termica, humedad, presion, temperatura, temp max, temp min // nombre, pais // nubloso, main(clouds)? // velocidad viento</section>
            {/* CAMBIAR TODO A INGLES DESPUÉS */}
            <section>
                <span>Ciudad: {dataInfo.name} </span><span> {dataInfo.sys?.country}</span>
            </section>
            <section>
                <p>Temperatura: {dataInfo.main?.temp}</p>
                <p>Senación Térmica: {dataInfo.main?.feels_like}</p>
                <p>Temp. max: {dataInfo.main?.temp_max}</p>
                <p>Temp. min: {dataInfo.main?.temp_min}</p>
                <p>Humedad: {dataInfo.main?.humidity}</p>
                <p>Presión: {dataInfo.main?.pressure}</p>
            </section>
            <section>
                {/* fallo en firefox */}
                <p>Descripción: {dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0].description}</p>
                <p>Nubes: {dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.main}</p>
            </section>
            <section>
                <p>Viento: {dataInfo.wind?.speed}</p>
            </section>
            <button onClick={() => {button(); unit()}}>{buttonText}</button>
        </div>
    )
}

export default Weather
