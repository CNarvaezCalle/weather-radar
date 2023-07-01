import './App.css'
import Clima from './components/Clima'
import Weather from './components/Weather'



function App() {

  // function success(position){
  //   const lati = position.coords;
  // }
  
  // navigator.geolocation.getCurrentPosition(success)

//function coordinadas(posicion) {
  //const crd = posicion.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${posicion.coords.latitude}`);
//   console.log(`Longitude: ${posicion.longitude}`);
//   console.log(`More or less ${posicion.coords.accuracy} meters.`);
// }


// navigator.geolocation.getCurrentPosition(coordinadas);

   return (
    <>
    {/* <h1>{navigator.geolocation.getCurrentPosition(coordinadas)}</h1> */}
    <Weather />   
    </>
  )
}

export default App
