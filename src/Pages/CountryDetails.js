import "../../Styles/CountryDetails.scss";
//Icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
//Library
import { useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CountryDetails = ({ data }) => {
  const location = useLocation();
  const country = location.pathname.split("/country/")[1];

  //States
  const [details, setDetails] = useState([]);
  const [borders, setBorders] = useState([]);

  //Fetch Details
  useEffect(() => {
    setDetails(data.filter((item) => item.name === country));
  }, [country, data]);

  //Fetch Borders
  useEffect(() => {
    if (details[0]) {
      if (details[0].borders) {
        const fillBorderName = data.filter((country) =>
          details[0].borders.includes(country.alpha3Code)
        );
        setBorders(fillBorderName);
      }
    }
  }, [details, data]);

  return (
    <div className="details-container">
      <div className="back-container">
        <Link to="/">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
            Back
          </button>
        </Link>
      </div>
      {details.length > 0 && (
        <div className="info-container">
          <div className="flag">
            <img src={details[0].flags.svg} alt={details[0].name} />
          </div>
          <div className="info">
            <div className="country-name">
              <h1>{details[0].name}</h1>
            </div>
            <div className="country-info">
              <div className="flex-items">
                <div className="left">
                  <p>
                    <label>Native Name:</label> {details[0].nativeName}
                  </p>
                  <p>
                    <label>Population:</label> {details[0].population}
                  </p>
                  <p>
                    <label>Region:</label> {details[0].region}
                  </p>
                  <p>
                    <label>Sub Region:</label> {details[0].subregion}
                  </p>
                  <p>
                    <label>Capital:</label> {details[0].capital}
                  </p>
                </div>
                <div className="right">
                  <p>
                    <label>Top Level Domain:</label>{" "}
                    {details[0].topLevelDomain[0]}
                  </p>
                  <p>
                    <label>Currencies:</label> {details[0].currencies[0].name}
                  </p>
                  <p>
                    <label>Language:</label> {details[0].languages[0].name}
                  </p>
                </div>
              </div>
              {borders.length > 0 && (
                <div className="border-countries">
                  <label>Border Countries:</label>
                  <div className="border-list">
                    {borders.map((border, key) => (
                      <Link key={key} to={`/country/${border.name}`}>
                        <div className="border">{border.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
