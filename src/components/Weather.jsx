import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";



const Weather = () => {
  const apiKey = "a3888691b1409d370827f0cfc2b82562";
  const [dataInfo, setDataInfo] = useState({});
  // const [units, setUnits] = useState("metric");
  const [isFarenheit, setIsFarenheit] = useState(false);
  const [buttonText, setButtonText] = useState("Change to F°");
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const img = ["/1.svg" ,"/2.svg" ,"/3.svg" ,"/4.svg" ,"/5.svg" ,"/6.svg" ,"/7.svg" ,"/8.svg" ,"/9.svg"];
  const [input, setInput] = useState('');




  // Obteniendo las coordenadas del usuario y llamando a la API

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&lang=es&units=metric`
        )
        .then((resp) => {
          console.log(resp.data);
          setDataInfo(resp.data);
  
          setIsLoading(false);
        })
        .catch((err) => console.log(err))
    });
  }, []);

  // Busqueda de API mediante nombre de ciudad, se reciben datos incompletos por lo que se usa la longitud y latitud de esa busqueda para usarse dentro de la API principal

  const search = () => {
    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${apiKey}`)
      .then((resp) => {
        if (resp.data[0] === undefined) {
          alert("No se encuentra la ciudad, por favor intenta otro nombre");
        } else {
          console.log(resp.data);
          setIsLoading(true);
          
        }
  
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${resp.data[0].lat}&lon=${resp.data[0].lon}&appid=${apiKey}&lang=es&units=metric`);
      })
      .then((resp) => {
        console.log(resp.data);
        setDataInfo(resp.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };


// Funciones de modo oscuro y cambio de farenheit a centigrados



  const darkmode = () => {
    setIsDark(!isDark)
  }

  const changeUnit = () => {
    setIsFarenheit(!isFarenheit)
  }

  const button = () => {
    if (buttonText === "Change to F°") {
      setButtonText("Change to C°");
    } else {
      setButtonText("Change to F°");
    }
  };


// Guardado de la imagen a usarse en una variable dependiendo del codigo usado en la API principal debido a que se usan imágenes diferentes a las de la API   

  let value;

  if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 200 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 299) {
    value = img[8]
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 300 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 399) { 
    value = img[5]
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 500 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 504 || (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 520 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 531) { 
    value = img[4]
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 600 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 699 || (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) == 511) { 
    value = img[6]
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 701 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 799) { 
    value = img[7]
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) == 800) { 
    value = img[0]  
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) == 801) { 
    value = img[1]  
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) == 802) { 
    value = img[2]    
  } else if ((dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) >= 803 && (dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.id) <= 899) { 
    value = img[3]
  } else {
    value = img[2]
  }  

  
  
  return (
    <div className={`${ isDark ? "container__darkmode" : "container"}`}>
      {isLoading && <Loader />}
      <div className="header__container">
        <div className="header__container--title">
          <h1 className="header__title">Weather app</h1>
          <button className="header__darkmode" onClick={darkmode}>{isDark ? <i className='bx bxs-sun bx-sm' style={{color:'white'}}></i> : <i className='bx bxs-moon bx-sm' style={{color:'white'}}></i> } </button>
        </div>
        <div className="search__container">
          <button type="submit" className="searcher__button" onClick={search}><i className='bx bx-search-alt bx-sm' style={{color:'white'}}></i></button>
        <input
          className={`${ isDark ? "header__search--darkmode" : "header__search"}`}
          type="text"
          placeholder="Search your city"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        </div>
      </div>
      <div className="data__container">
        <div className={`${ isDark ? "data__darkmode" : "data"}`}>
          <div className="temp__container">
          <p className="temp">{isFarenheit ? Math.floor((Math.round(dataInfo.main?.temp)*1.8)+32) + "°f" : Math.round(dataInfo.main?.temp)+ "°c"}</p>
            <img className="imagen" src={value}  alt="" />
          </div>
          <p className="wind">Wind: {dataInfo.wind?.speed} </p>
          {/* <p className="wind">Wind: {Object.keys(searchInfo).length > 0 ? searchInfo.wind?.speed :dataInfo.wind?.speed} </p> */}
          <p className="main">
            {dataInfo.weather &&
              dataInfo.weather[0] &&
              dataInfo.weather[0]?.main}
          </p>
          <p className="pressure">Pressure: {dataInfo.main?.pressure}</p>
          {/* fallo en firefox */}
          <div className="detail__container">
            <span className="name">
              {dataInfo.name} {dataInfo.sys?.country} 
            {/* {Object.keys(searchInfo).length > 0 ? searchInfo.name : dataInfo.name}, {dataInfo.sys?.country} */}
            </span>
            <span className="description">
              {dataInfo.weather &&
                dataInfo.weather[0] &&
                dataInfo.weather[0].description}
            </span>
          </div>
        </div>
        <button
          className={`${ isDark ? "unit__button__darkmode" : "unit__button"}`}
          onClick={() => {
            {/*unit();*/}
            changeUnit();
            button();
          }}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Weather;

