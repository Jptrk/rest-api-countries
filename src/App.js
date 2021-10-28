//Styles
import "./Styles/Main.scss";
//Components
import Navbar from "./Components/Navbar";
import Countries from "./Pages/Countries";
import CountryDetails from "./Pages/CountryDetails";
//Library
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch } from "react-router";

function App() {
  //States
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch_data();
  }, []);

  //Handlers
  const fetch_data = async () => {
    const response = await axios.get("https://restcountries.com/v2/all");
    setData(response.data);
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar setTheme={setTheme} theme={theme} />
      <Switch>
        <Route path="/" exact>
          {data.length && <Countries data={data} theme={theme} />}
        </Route>
        <Route path="/country/:name" exact>
          <CountryDetails data={data} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
