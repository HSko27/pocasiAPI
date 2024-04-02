import { useEffect, useState } from "react";

interface CurrentWeather {
  interval: number;
  is_day: boolean;
  rain: boolean;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: Date;
  wind_speed_10m: number;
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        latitude: "50.088",
        longitude: "14.4208",
        current: "temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m",
        forecast_days: "1",
      };

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}&forecast_days=${params.forecast_days}`;

      try {
        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (data.current) {
          const { temperature_2m, relative_humidity_2m, is_day, rain, wind_speed_10m, time } = data.current;
          const dateTime = new Date(time);
          setCurrentWeather({
            interval: 0,
            is_day,
            rain,
            relative_humidity_2m,
            temperature_2m,
            time: dateTime,
            wind_speed_10m,
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  const idk = async(longitude: number, latitude: number) => {
    const params = {
      latitude: latitude,
      longitude: longitude,
      current: "temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m",
      forecast_days: "1",
    };

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}&forecast_days=${params.forecast_days}`;

    try {
      const response = await fetch(url);

      const data = await response.json();

      console.log(data);

      if (data.current) {
        const { temperature_2m, relative_humidity_2m, is_day, rain, wind_speed_10m, time } = data.current;
        const dateTime = new Date(time);
        setCurrentWeather({
          interval: 0,
          is_day,
          rain,
          relative_humidity_2m,
          temperature_2m,
          time: dateTime,
          wind_speed_10m,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  const city = [
    {cityName: "francie", longtitude: 0.160000, latitude: 45.650002},
    {cityName: "cina" , longtitude: 110.478996, latitude: 29.117001},
    {cityName: "czech", longtitude: 14.418540, latitude: 50.073658},
    {cityName: "USA", longtitude: -89.500000, latitude: 44.500000},
    {cityName: "Brazil", longtitude: -43.196388, latitude: -22.908333},
  ]

  const [cityName, setCityName] = useState("city");
  

  return (
      <div className="App">
        <header className="text-center mt-10">
          <h1>Počací v : {cityName}</h1>
          <p className="mt-5">Now is: {currentWeather?.is_day ? "day" : "night"} </p>
          <p>Temp: {currentWeather?.temperature_2m} °C </p>
          <p>Humidity: {currentWeather?.relative_humidity_2m} % </p>
          <p>Its raining?: {currentWeather?.rain ? "Yes" : "No"}</p>
          <p>Wind Speed: {currentWeather?.wind_speed_10m} km/h </p>
          <a onClick={() => {setCityName("cina")}}><button className="me-5 mt-5" onClick={() => {idk(city[1].longtitude, city[1].latitude)}}>cina</button></a>
          <a onClick={() => {setCityName("cesko")}}><button className="me-5" onClick={() => idk(city[2].longtitude, city[2].latitude )}>cesko</button> </a>
          <a onClick={() => {setCityName("francie")}}><button className="me-5" onClick={() => idk(city[0].longtitude, city[0].latitude)}>francie</button></a>
          <a onClick={() => {setCityName("USA")}}><button className="me-5" onClick={() => idk(city[3].longtitude, city[3].latitude)}>USA</button></a>
          <a onClick={() => {setCityName("Brazilie (Rio de Janeiro)")}}><button className="" onClick={() => idk(city[4].longtitude, city[4].latitude)}>Brazil</button></a>
        </header>
      </div>
  );
}

export default App;
