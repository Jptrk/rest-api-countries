//Styles
import "../../Styles/Country.scss";
//Library
import { Link } from "react-router-dom";

const Country = ({ data, theme }) => {
  return (
    <div className="card">
      <div className="thumbnail">
        <Link to={`/country/${data.alpha3Code}`}>
          <img src={data.flag} alt={data.name} className="flag" />
        </Link>
      </div>

      <div className="copy-container">
        <p className="name">
          <Link to={`/country/${data.alpha3Code}`}>{data.name}</Link>
        </p>
        <div className="details">
          <p className="population">
            <span className="label">Population: </span>
            {data.population}
          </p>
          <p className="region">
            <span className="label">Region: </span>
            {data.region}
          </p>
          <p className="Capital">
            <span className="label">Capital: </span>
            {data.capital}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Country;
