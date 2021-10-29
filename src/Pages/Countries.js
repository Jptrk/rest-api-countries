//Styles
import "../Styles/Countries.scss";
//Components
import Country from "../Components/Country/Country";
import Pagination from "../Components/Pagination";
import Filter from "../Components/Filter";
//Library
import { useMemo, useEffect, useState } from "react";

const Countries = ({
  data,
  theme,
  page,
  setPage,
  filter,
  setFilter,
  searchInput,
  setSearchInput,
}) => {
  const [countries, setCountries] = useState([]);

  const itemPerPage = 20;

  //Functions
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    if (page !== 1) setPage(1);
  };

  const filterData = useMemo(() => {
    if (filter === "Filter by Region") {
      return data;
    } else {
      return data.filter((country) => country.region === filter);
    }
  }, [data, filter]);

  useEffect(() => {
    setCountries(filterData);
  }, [filter, filterData]);

  useEffect(() => {
    const searchedItems = data.filter((country) => {
      if (filter === "Filter by Region") {
        return country.name.toLowerCase().includes(searchInput.toLowerCase());
      } else {
        return (
          country.name.toLowerCase().includes(searchInput.toLowerCase()) &&
          filter === country.region
        );
      }
    });

    setCountries(searchedItems);
  }, [searchInput, data, filter]);

  return (
    <div className="card-container">
      <Filter
        data={data}
        filter={filter}
        setFilter={setFilter}
        setPage={setPage}
        searchHandler={searchHandler}
        searchInput={searchInput}
      />

      <div className="card-content">
        {countries
          .slice((page - 1) * itemPerPage, itemPerPage * page)
          .map((items, key) => (
            <Country data={items} key={key} theme={theme} />
          ))}
      </div>

      {countries.length > 0 && (
        <Pagination
          length={countries.length}
          itemsPerPage={itemPerPage}
          page={page}
          setPage={setPage}
          theme={theme}
          scrollTop={true}
        />
      )}
    </div>
  );
};

export default Countries;
