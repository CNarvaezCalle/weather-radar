import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const Weather = () => {
  const apiKey = "a3888691b1409d370827f0cfc2b82562";
  const [dataInfo, setDataInfo] = useState({});
  const [units, setUnits] = useState("metric");
  const [isFarenheit, setIsFarenheit] = useState(false);
  const [buttonText, setButtonText] = useState("Change to F°");
  const [isLoading, setIsLoading] = useState(true);
  const [click, setClick] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(coords);
  }, [isFarenheit, buttonText, click]); //termina aqui o solo el geo mas arriba? -- isFarenheit o units??

  function coords(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const moreOrLess = `${position.coords.accuracy} meters?`


    setIsLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=${units}`
      )
      .then((resp) => {
        console.log(resp.data);
        setDataInfo(resp.data);
        
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  

  // const img = () => {
  //   let pic = ''
  //   if(dataInfo.weather[0].id >= 200 && dataInfo.weather[0].id <= 232 ){
  //     pic = '/1.svg';
  //   } else {
  //     pic = '/2.svg'
  //   }
  // }

  // img();

  // dataInfo.weather && dataInfo.weather[0] && dataInfo.weather[0]?.icon

  const darkMode = () => {
    if(click){
      setClick(!click)
      document.body.style.background = 'radial-gradient(#53388F, #2F2958)'
    } else{
      setClick(!click)
      document.body.style.background = 'radial-gradient(#D5F3FF, #51B4E8)'
    }
  }

  const unit = () => {
    if (isFarenheit) {
      setIsFarenheit(!isFarenheit);
      setUnits("metric");
    } else {
      setIsFarenheit(!isFarenheit);
      setUnits("imperial");
    }
  };

  const button = () => {
    if (buttonText === "Change to F°") {
      setButtonText("Change to C°");
    } else {
      setButtonText("Change to F°");
    }
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <div className="header__container">
        <div>
          <h1 className="header__title">Weather app</h1>
          <button className="header__darkmode" onClick={darkMode}>luz</button>
        </div>
        <input
          className="header__search"
          type="search"
          placeholder="Search your city"
        />
      </div>
      {/* CAMBIAR TODO A INGLES DESPUÉS */}
      <div className="data__container">
        <div className="data">
          <div className="temp__container">
          <p className="temp">{Math.round(dataInfo.main?.temp)} {isFarenheit ? "°F" : "°C"}</p>
          {/* <img className="imagen" src={process.env.PUBLIC_URL + pic} alt="" />   */}
          </div>
          <p className="wind">Wind: {dataInfo.wind?.speed}</p>
          <p className="main">
            {dataInfo.weather &&
              dataInfo.weather[0] &&
              dataInfo.weather[0]?.main}
          </p>
          <p className="pressure">Pressure: {dataInfo.main?.pressure}</p>
          {/* fallo en firefox */}
          <div className="detail__container">
            <span className="name">
              {dataInfo.name}, {dataInfo.sys?.country}
            </span>
            <span className="description">
              {dataInfo.weather &&
                dataInfo.weather[0] &&
                dataInfo.weather[0].description}
            </span>
          </div>
        </div>
        {/* <div className="button"> */}
        <button
          className="unit__button"
          onClick={() => {
            button();
            unit();
          }}
        >
          {buttonText}{isLoading && <Loader />}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Weather;
