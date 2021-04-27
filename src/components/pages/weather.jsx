import React, { useMemo, useState } from "react";
import { getTempByType, TempType } from "../../utils";

export default function Weather({ apiKey }) {
  const [tempType, setTempType] = useState(TempType.KELVIN);
  const [cityName, setCityName] = useState(undefined);
  const [inputVal, setInputVal] = useState(undefined);
  const [temp, setTemp] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentWeatherForCity = (cityName, apiKey) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result && result.main && result.main.temp)
          setTemp(result.main.temp);
        else setTemp(undefined);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleCheckWeather = () => {
    if (inputVal !== cityName) {
      setCityName(inputVal);
      getCurrentWeatherForCity(inputVal, apiKey);
    }
  };

  const temperatureByType = useMemo(() => {
    if (temp) {
      return getTempByType(temp, tempType);
    }
    return "";
  }, [tempType, temp]);

  const onChangeTempType = (event) => {
    setTempType(event.target.value);
  };

  return (
    <>
      <h2>Weather</h2>
      <form onChange={onChangeTempType}>
        <label>
          <input
            type="radio"
            value={TempType.KELVIN}
            name="temptype"
            defaultChecked={tempType === TempType.KELVIN}
          />
          {TempType.KELVIN}
        </label>
        <label>
          <input
            type="radio"
            value={TempType.CELCIUS}
            name="temptype"
            defaultChecked={tempType === TempType.CELCIUS}
          />
          {TempType.CELCIUS}
        </label>
        <label>
          <input
            type="radio"
            value={TempType.FARENHEIT}
            name="temptype"
            defaultChecked={tempType === TempType.FARENHEIT}
          />
          {TempType.FARENHEIT}
        </label>
      </form>
      <input
        type="text"
        placeholder="City Name"
        onChange={(e) => setInputVal(e.currentTarget.value)}
      />
      <button onClick={() => handleCheckWeather()} disabled={isLoading}>
        Check Weather
      </button>
      <p>
        The current weather is: <span data-testid="temperature">{temperatureByType}</span>
      </p>
    </>
  );
}
