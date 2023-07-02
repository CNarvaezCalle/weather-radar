import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const apiKey = "a3888691b1409d370827f0cfc2b82562";
  const [dataInfo, setDataInfo] = useState({});
  const [units, setUnits] = useState("metric");
  const [isFarenheit, setIsFarenheit] = useState(false);
  const [buttonText, setButtonText] = useState("Change to F°");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(coords);
  }, [isFarenheit, buttonText]); //termina aqui o solo el geo mas arriba? -- isFarenheit o units??

  function coords(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const moreOrLess = `${position.coords.accuracy} meters?`

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=${units}`
      )
      .then((resp) => {
        console.log(resp.data);
        setDataInfo(resp.data);
      })
      .catch((err) => console.error(err));
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
      <div className="header__container">
        <div>
          <h1 className="header__title">Weather app</h1>
          <button className="header__darkmode">luz</button>
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
          <p className="temp">{Math.round(dataInfo.main?.temp)}</p>
          <p className="wind">{dataInfo.wind?.speed}</p>
          <p className="main">
            {dataInfo.weather &&
              dataInfo.weather[0] &&
              dataInfo.weather[0]?.main}
          </p>
          <p className="pressure">{dataInfo.main?.pressure}</p>
          {/* fallo en firefox */}
          <p className="name">
            {dataInfo.name}, {dataInfo.sys?.country}
          </p>
          <p className="description">
            {dataInfo.weather &&
              dataInfo.weather[0] &&
              dataInfo.weather[0].description}
          </p>
        </div>
        {/* <div className="button"> */}
          <button
            className="unit__button"
            onClick={() => {
              button();
              unit();
            }}
          >
            {buttonText}
          </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Weather;
