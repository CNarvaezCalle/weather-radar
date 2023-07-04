// import { useState, useEffect } from "react";
// import axios from "axios";

// const Search = () => {
//     const [searchInfo, setSearchInfo] = useState({});
//     const [input, setInput] = useState('')
//     const apiKey = "a3888691b1409d370827f0cfc2b82562";


//     function search() {
//         axios
//         .get(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${apiKey}`)
//         .then((resp) => {
//             console.log(resp.data);
//             setSearchInfo(resp.data[0]);

//             // setIsLoading(false);
//         })
//         .catch((err) => console.log(err))
//     }

  
//     function traspaso () {
//         const latitude =  searchInfo.lat
//         const longitude = searchInfo.lon

//         console.log(latitude, longitude)
//     }
//     traspaso()

//     return (
//         <>
//         <div className="box-search">
//             <input 
//             className="search"
//             type="text"
//             placeholder="busqueda"
//             value={input} 
//             onChange={(e) => setInput(e.target.value)}/>
//             <button type="submit" className="botonboton" onClick={search}>Busqueda</button>
//         </div>    
//         </>
//     )
// }

// export default Search 