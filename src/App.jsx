import './App.css'
import Weather from './components/Weather'
import Loader from './components/Loader'
import Realweather from './components/Reweather'




function App() {


   return (
    <>
    <div className='main__container'>
      {/* <Header /> */}
      {/* <Weather />  */}
      <Realweather />  
    </div>
    </>
  )
}

export default App
