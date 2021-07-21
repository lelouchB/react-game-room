import React, { useState, useEffect } from "react";
import GameCard, { DataProps } from "./components/GameCard";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const getData = () => {
    setLoading(true);
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
        setCompanies(
          json.map((item: DataProps) => {
            return item.company.name;
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  function customSearch(query: string) {
    return function (elem: DataProps) {
      var userNames = elem.users.map((user: { name: string }) => {
        return user.name.toLowerCase();
      });
      const subUserNames = userNames.map((name: string) => {
        return name.includes(query);
      });

      return elem.id.includes(query) || subUserNames.includes(true);
    };
  }
  let result = data;
  if (searchTerm) {
    result = data.filter(customSearch(searchTerm.toLowerCase()));
  }

  if (selectedCompany) {
    result = data.filter((item: DataProps) => {
      return item.company.name === selectedCompany;
    });
  }
  const clear = () => {
    setSelectedCompany("");
    setSearchTerm("");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>React + TS Game Room</h1>
      <div className="App-menu">
        <div className="search">
          <input
            type="text"
            placeholder="Enter item to be searched"
            onChange={(e) => search(e)}
            value={searchTerm}
          />
        </div>
        <div className="App-filter">
          <div className="App-filter-date">
            <button onClick={clear} className="clear-button">
              Clear
            </button>
          </div>
        </div>
        <div className="App-filter-company">
          <select
            defaultValue="default"
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="default" disabled>
              Filter by Company Name
            </option>

            {companies &&
              companies.length > 0 &&
              companies.map((company: any, index: number) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
          </select>
        </div>
      </div>
      {data &&
        result.length > 0 &&
        result.map((item) => (
          <GameCard
            key={item.id}
            id={item.id}
            scheduledTime={item.scheduledTime}
            users={item.users}
            company={item.company}
            status={item.status}
          />
        ))}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
