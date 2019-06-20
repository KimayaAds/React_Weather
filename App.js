import React from 'react';
import Titles from "./Components/Titles"; 
import Form from "./Components/Form";
import Weather from "./Components/Weather";

const API_KEY ="fc42c20868585597694dd44fd896a384";
class  App extends React.Component{
state ={
temperature:undefined,
city: undefined,
country : undefined,
humidity: undefined,
description: undefined,
error:undefined
}
getWeather = async(e) => {
e.preventDefault();

 const city = e.target.elements.city.value;
const country = e.target.elements.country.value;
const api_call = await fetch(
  `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
);
//const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?q=q=London,uk&appid=${API_KEY}&units=metric`);
const data = await api_call.json();
console.log(data);
if (city && country){

this.setState({
  temperature:data.main.temp,
  city : data.name,
  country:data.sys.country,
  humidity:data.main.humidity,
  description:data.weather[0].description,
  error:""
});

}
else {
  this.setState({
  temperature:undefined,
city: undefined,
country : undefined,
humidity: undefined,
description: undefined,
error:undefined
});
}
}
  render (){
    return(
      <div>
      < Titles />
      <Form getWeather={this.getWeather}/>
      <Weather 
      temperature={this.state.temperature}
      city={this.state.city}
      country={this.state.country}
      humidity={this.state.humidity}
      description={this.state.description}
      error={this.state.error}
/>
   </div>
    )
  }
}

export default App;