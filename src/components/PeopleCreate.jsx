import React, { useState, useEffect } from "react";
import peopleService from '../api/peopleService';

const PeopleCreate = (props) => {
  const [personItem, setPersonItem] = useState({ //What is useState
    name: '',
    phoneNumber: '',
    city: [],
    country: [],
  });
  const [personCities, setPersonCities] = useState({
    cities: [],
    areCitiesLoading: true,
  });
  const [personCountries, setPersonCountries] = useState({
    countries: [],
    areCountriesLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      let theCities = await peopleService.getAllCities();
      setPersonCities({ cities: theCities, areCitiesLoading: false });

      let theCountries = await peopleService.getAllCountries();
      setPersonCountries({ countries: theCountries, areCountriesLoading: false });
      //console.log('component PeopleCreate rerendered'); //console.log might cause a second render sometimes
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit personItem', personItem);
    let itemObject = { item: personItem };
    props.onSubmit(itemObject);
  };

  const changeValue = (event) => {
    const { name, value } = event.target;
    setPersonItem({ ...personItem, [name]: value });
    //console.log('event', event.target);
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonItem({ ...personItem, [name]: {value} });
  };

return (
  <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
          id="name"
          name="name"
          className="form-control"
          type="text"
          value={personItem.name}
          onChange={changeValue}
          />
      </div>
      <div className="form-group">
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
          id="phoneNumber"
          name="phoneNumber"
          className="form-control"
          type="text"
          value={personItem.phoneNumber}
          onChange={changeValue}
          />
      </div>
      <div className="form-group">
          <select
          required
          className="form-control"
          name="city"
          //value={idCityValue}
          onChange={handleChange}>
            <option value="-1" disabled>
              Select a city
            </option>
              {personCities.cities.map((city) => (
              <option key={"cityId" + city.id} value={city}>
                {city.cityName}
              </option>
              ))}
          </select>
      </div>
      <div className="form-group">
          <select
          required
          className="form-control"
          name="idCountryValue"
          //value={idCountryValue}
          onChange={handleChange}>
            <option value="-1" disabled>
              Select a country
            </option>
              {personCountries.countries.map((country) => (
              <option key={"country" + country.id} value={country.id}>{country.countryName}
              </option>))}
          </select>
      </div>
      <div className="form-group">
      <button className="btn btn-primary" type="submit">
          Create
      </button>
      </div>
  </form>
);

};

export default PeopleCreate;