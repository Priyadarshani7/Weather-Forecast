import React, {  useState } from 'react'
import Axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
//  import weatherimage from './weatherimage.png';
// import humidity from './humidity.png';
// import wind from './wind.png';

function Home() {

const [data,setdata]=useState({
  celcius : 'Degree',
  name:'City',
  humidity:'',
  wind:'',
  image:'/Images/weatherimage.png'
})

const [namee,setname]=useState('');
const[error,seterror]=useState('');



const handleclick=()=>{
  if(namee !== ""){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${namee}&appid=b8042ef6be4c4e5dbf335daa1a6ed545&units=metric`;
    Axios.get(apiurl).then(res=>{
    let imagepath ='';
    if(res.data.weather[0].main==="Clouds"){
      imagepath='/Images/cloud.png'
    }else if(res.data.weather[0].main==="Clear"){
      imagepath='/Images/clear.png'
    }else if(res.data.weather[0].main==="Rain"){
    imagepath='/Images/rain.png'
  }else if(res.data.weather[0].main==="Drizzle"){
    imagepath='/Images/drizzle.png'
    }else if(res.data.weather[0].main==="Mist"){
    imagepath='/Images/mist.png'
    }else {
    imagepath='/Images/weatherimage.png'
    }
      console.log(res.data);
    setdata({...data,celcius:res.data.main.temp,
    name:res.data.name,
    humidity:res.data.main.humidity,
    wind:res.data.wind.speed,image:imagepath})
    })
    .catch(err =>{
      if(err.response.status==404){
        seterror("Invalid City name ")
      }else{
        seterror('');
      }
      console.log(err)});
  }
}
  return (
    <div className='container'>
        <h1 className='heading'>Weather Forecast</h1>
      <div className='box'>
        <div className='search'>
       <input type='text' placeholder='Enter The City' onChange={e=>setname(e.target.value)}/>
       <button onClick={handleclick}>< BiSearchAlt size={40} /></button>
        </div>
        <div className='error'>
<p>{error}</p>
        </div>
        <div className='weatherinfo'>
            <img id='weatherimage' src={data.image}/>
            <h1 className='degree'>{data.celcius}°C</h1>
            <h2 className='city'>{data.name}</h2>
            <div className='extrainformation'>
 <div className='col'>
    <img src='/Images/humidity.png'/>
    <div id='humidity'>
<p>{data.humidity}%</p>
<p>Humidity</p>
</div>
 </div>

 <div className='col'>
 <img src='/Images/wind.png'/>
 <div id='wind'>
 <p>{data.wind} km/h</p>
<p>Wind</p>
</div>
 </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
