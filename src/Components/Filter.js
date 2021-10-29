//Styles
import "../Styles/Filter.scss";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//Library
import { useEffect, useState } from "react";

const Filter = ({
  data,
  filter,
  setFilter,
  setPage,
  searchHandler,
  searchInput,
}) => {
  const [show, setShow] = useState(false);
  const [regions, setRegions] = useState([]);

  //Functions
  const regionHandler = (e) => {
    setPage(1);
    if (e.target.innerText === "All") {
      setFilter("Filter by Region");
      setShow(false);
    } else {
      setFilter(e.target.innerText);
      setShow(false);
    }
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      setRegions((prev) =>
        prev.includes(data[i].region) ? [...prev] : [...prev, data[i].region]
      );
    }
  }, [setRegions, data]);

  return (
    <header className="filter-container">
      <div className="country-input">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          name="country"
          placeholder="Search for a country..."
          onChange={(e) => searchHandler(e)}
          value={searchInput}
        />
      </div>
      <div className="filter-region">
        <div className="dropdown" onClick={() => setShow((prev) => !prev)}>
          <div className={` ${show ? "place-holder active" : "place-holder"}`}>
            {filter}
          </div>
        </div>

        <div className={show ? "dropdown-list show-list" : "dropdown-list"}>
          <ul>
            <li onClick={(e) => regionHandler(e)}>All</li>
            {regions.map((region) => (
              <li key={region} onClick={(e) => regionHandler(e)}>
                {region}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Filter;
