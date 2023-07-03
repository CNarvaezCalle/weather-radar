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
  const [input, setInput] = useState(' ');
  const [searchInfo, setSearchInfo] = useState({});

  // const unitsValue = isFarenheit ? "imperial" : "metric";
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(coords);
  }, []); //termina aqui o solo el geo mas arriba? -- isFarenheit o units??


  

  function coords(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const moreOrLess = `${position.coords.accuracy} meters?`

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=metric`)
    .then((resp) => {
      console.log(resp.data);
      setDataInfo(resp.data);
     
      setIsLoading(false);
    })
    .catch((err) => console.log(err))
  }

  // SEARCH BAR //



  function search() {
   
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${apiKey}`)
    .then((resp) => {
      console.log(resp.data);
      setSearchInfo(resp.data[0]);
     
      setIsLoading(false);
    })
    .catch((err) => console.log(err))
  
  }
  
    // const unitsValue = isFarenheit ? "imperial" : "metric";
    // setIsLoading(true);


  // const darkMode = () => {
  //   if(click){
  //     setClick(!click)
  //     document.body.style.background = 'radial-gradient(#53388F, #2F2958)'
  //   } else{
  //     setClick(!click)
  //     document.body.style.background = 'radial-gradient(#D5F3FF, #51B4E8)'
  //   }
  // }

  // const unit = () => {
  //   if (isFarenheit) {
  //     setIsFarenheit(!isFarenheit);
  //     setUnits("metric");
  //   } else {
  //     setIsFarenheit(!isFarenheit);
  //     setUnits("imperial");
  //   }
  // };

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
    value = img[6]
  }  

  

  return (
    <div className={`${ isDark ? "container__darkmode" : "container"}`}>
      {isLoading && <Loader />}
      <div className="header__container">
        <div>
          <h1 className="header__title">Weather app</h1>
          <button className="header__darkmode" onClick={darkmode}>{isDark ? <i className='bx bxs-sun' style={{color:'white'}}></i> : <i className='bx bxs-moon' style={{color:'white'}}></i> } </button>
        </div>
        <div className="botones">
          {/*/////////////////////////////////*/}
        <input
          className="header__search"
          type="text"
          placeholder="Search your city"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          // onkeyPress={handleKeyPress}
      
        />
        <button type="submit" className="botones" onClick={search}>Search</button>
        </div>
      </div>
      {/* CAMBIAR TODO A INGLES DESPUÉS */}
      <div className="data__container">
        <div className={`${ isDark ? "data__darkmode" : "data"}`}>
          <div className="temp__container">
          <p className="temp">{isFarenheit ? Math.floor((Math.round(dataInfo.main?.temp)*1.8)+32) + "°f" : Math.round(dataInfo.main?.temp)+ "°c"}</p>
            <img className="imagen" src={value}  alt="" />
          {/* <img className="imagen" src={process.env.PUBLIC_URL + pic} alt="" />   */}
          </div>
          <p className="wind">Wind: {Object.keys(searchInfo).length > 0 ? searchInfo.wind?.speed :dataInfo.wind?.speed} </p>
          <p className="main">
            {dataInfo.weather &&
              dataInfo.weather[0] &&
              dataInfo.weather[0]?.main}
          </p>
          <p className="pressure">Pressure: {dataInfo.main?.pressure}</p>
          {/* fallo en firefox */}
          <div className="detail__container">
            <span className="name">
            {Object.keys(searchInfo).length > 0 ? searchInfo.name : dataInfo.name}, {dataInfo.sys?.country}
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
          className={`${ isDark ? "unit__button__darkmode" : "unit__button"}`}
          onClick={() => {
            {/*unit();*/}
            changeUnit();
            button();
          }}
        >
          {buttonText}
        </button>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Weather;
