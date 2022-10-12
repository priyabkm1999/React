import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-grid-system";
import { setConfiguration } from "react-grid-system";
import { FaCloudSun , FaCloud , FaCloudRain , FaCloudMoonRain , FaCloudSunRain } from 'react-icons/fa';

setConfiguration({ maxScreenClass: "xl" });
function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    // let date = new Date();
    // const today = date.toDateString();
    // return today;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nocvember",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const appid = "f00c38e0279b7bc85480c3fe775d518c";
      // const appid = 'e594c712fc478149c37e1e622f5a173f';
      //console.log('Enter');

      await axios
        .get(url, {
          params: {
            q: query,
            units: "metric",
            appid: appid,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    }
  };

  console.log(weather.data);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={3} debug id="grid-1">
            <h1 className="app-name">
              Weather App<span>🌤</span>
            </h1>
            <div className="search-bar">
              <input
                type="text"
                className="city-search"
                placeholder="Search City.."
                name="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={search}
              />
            </div>

            {weather.loading && (
              <>
                <br />
                <br />
                <Loader type="Oval" height={100} width={100} />
              </>
            )}
            {weather.error && (
              <>
                <br />
                <br />
                <span className="error-message">
                  <FontAwesomeIcon icon={faSun} />
                  <span style={{ "font-size": "20px" }}>
                    {" "}
                    Sorry, City not found
                  </span>
                </span>
              </>
            )}

            {weather && weather.data && weather.data.main && (
              <div>
                <div className="icon-temp">
                  <img
                    className="img"
                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                    alt={weather.data.weather[0].description}
                  />
                  <div className="data">
                    {Math.round(weather.data.main.temp)}
                    <sup className="deg">&deg;C</sup>
                  </div>
                </div>
                <div className="city-name">
                  <h2>
                    {weather.data.name}, <span>{weather.data.sys.country}</span>
                  </h2>
                </div>
                <div className="date">
                  <span>{toDate()}</span>
                </div>

                <div className="des-wind">
                  <p>{weather.data.weather[0].description.toUpperCase()}</p>
                  <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                </div>

                <div>
                  <img
                    className="spain"
                    src={require("../components/img/download.jpeg")}
                    alt={"Barcelona, Spain"}
                  />
                </div>
              </div>
            )}
          </Col>

          <Col sm={9} id="grid-2">
            <Row justify="right">
              <Col xs={12} debug className="header">
                <a href="#">Today</a>
                <a href="#">Weekly</a>
              </Col>
              <Col xs={12} debug className="middle-content">
                {weather && weather.data && weather.data.main && (
                  <Row>
                    <Col xs={2} debug className="g1">
                      <h2>Monday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h3><FaCloud color="grey" fontSize={50} id="i"/></h3>
                      <div className="big">
                        {Math.round(weather.data.coord.lon)}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                    <Col xs={2} debug className="g1">
                      <h2>Tuesday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h1><FaCloudSun color="grey" fontSize={50} id="i"/></h1>
                      <div className="big">
                        {Math.round(weather.data.coord.lat)}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                    <Col xs={2} debug className="g1">
                      <h2>Wednesday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h3><FaCloud color="grey" fontSize={50} id="i"/></h3>
                      <div className="big">
                      {Math.round(weather.data.main.temp)}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                    <Col xs={2} debug className="g1">
                      <h2>Thursday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h1><FaCloudRain color="grey" fontSize={50} id="i"/></h1>
                      <div className="big">
                      {weather.data.main.humidity}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                    <Col xs={2} debug className="g1">
                      <h2>Friday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h1><FaCloudMoonRain color="grey" fontSize={50} id="i" /></h1>
                      <div className="big">
                        {Math.round(weather.data.coord.lon)}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                    <Col xs={2} debug className="g1">
                      <h2>Saturday</h2>
                      {/* <img
                        className="pic"
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                      /> */}
                      <h1><FaCloudSunRain color="grey" fontSize={50} id="i" /></h1>
                      <div className="big">
                        {Math.round(weather.data.coord.lat)}
                        <sup>&deg;C</sup>
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col xs={12} debug className="footer">
                {weather && weather.data && weather.data.main && (
                  <Row>
                    <Col xs={4} debug className="f2">
                      <img
                        src="https://www.tibco.com/sites/tibco/files/media_entity/2022-01/GaugeChart-01.svg"
                        alt="gauge-chart"
                        className="gauge-img"
                      />
                    </Col>
                    <Col xs={4} debug className="f2">
                      <p>Wind status</p>
                      <p>
                        <b className="f4">{weather.data.wind.speed}</b>km/h
                      </p>
                      <b>{weather.data.name}</b>
                    </Col>
                    <Col xs={4} debug className="f2">
                      <p>Temperature</p>
                      <div className="icon-temp">
                        <div className="data">
                          {Math.round(weather.data.main.temp)}
                          <sup className="deg">&deg;C</sup>
                        </div>
                      </div>
                      <div className="des-wind">
                        <p>
                          {weather.data.weather[0].description.toUpperCase()}
                        </p>
                      </div>
                    </Col>
                    <Col xs={4} debug className="f2">
                      <p>Humidity</p>
                      <p>
                        <b className="f4">{weather.data.main.humidity}</b>%
                      </p>
                      <p>
                        Status: <b id="color-1">Good Quality</b>
                      </p>
                    </Col>
                    <Col xs={4} debug className="f2">
                      <p>Visibilty</p>
                      <p>
                        <b className="f4">{weather.data.visibility}</b>km/h
                      </p>
                      <p>
                        Status: <b id="color-2">Average</b>
                      </p>
                    </Col>
                    <Col xs={4} debug className="f2">
                      <p>Air Quality</p>
                      <p>
                        <b className="f4">{weather.data.cod}</b>
                      </p>
                      <p>
                        Status: <b id="color-3">Bad Quality</b>
                      </p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Weather;
