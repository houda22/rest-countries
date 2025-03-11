import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const ListCountries = () => {
  const api_url = "https://restcountries.com/v3.1/all";
  const searchInput = useRef("");
  const [countries, setCountries] = useState([]);

  const getAllCountries = async () => {
    try {
      const response = await axios.get(api_url); //api endpoints (les méthodes de crud)
      if (response.status === 200) {
        setCountries(response.data);
        //setFilteredCountries(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   const searchItems = (searchValue) => {
  //     setSearchTerm(searchValue);
  //   };
  //   useEffect(() => {
  //     const filtered = countries.filter((country) =>
  //       Object.values(country)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredCountries(filtered);
  //   }, [searchTerm, countries]);

  //   // Réinitialiser la recherche
  //   const handleReset = () => {
  //     setSearchTerm("");
  //     setFilteredCountries(countries);
  //   };
  const searchCountries = async (e) => {
    e.preventDefault();
    let search = searchInput.current.value; // pour récupérer la valeur de l'input
    if (search === "") {
      alert("please write something");
      return;
    }
    try {
      const response = await axios.get(`api_url/${search}`);
      if (response.status === 200) {
        setCountries(response.data);
        //setFilteredCountries(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // de préférence on fait la fonction en dehors de useEffect et on l'appeler après
    getAllCountries();
  }, []);
  return (
    <>
      <div className="relative">
        <form onSubmit={searchCountries}>
          <input
            ref={searchInput}
            type="search"
            placeholder="Rechercher un pays..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit">Search</button>
          {/* {searchTerm && (
            <button
              onClick={handleReset}
              className="absolute right-2 top-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
          )} */}
        </form>
      </div>

      <div className="flex flex-wrap -mx-2">
        {countries.map((country) => (
          <div
            key={country.cca3}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-10"
          >
            <div className="bg-white shadow-md rounded-lg">
              <div className="h-48 overflow-hidden">
                {country.flags && (
                  <img
                    src={country.flags[`png`]} //
                    alt={`Drapeau de ${country.name.common}`}
                    className="w-full h-full object-cover"
                    style={{
                      border: "1px solid #ccc",
                    }}
                  />
                )}
              </div>
              <div className="pt-8 pb-4">
                <h3 className="text-lg font-bold">{country.name.common}</h3>
                <p className="text-sm text-gray-900">{country.name.official}</p>
                <p className="text-sm font-bold text-gray-700">
                  {country.capital}
                </p>
                <p className="text-sm text-gray-600">{country.region}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCountries;
