import React, { Component } from "react";
import axios from "../../node_modules/axios";

class PeopleCreate extends Component {
    state = {
        name : "",
        phoneNumber: "",
        cities: [],
        countries: [],
        idCityValue: -1,
        idCountryValue: -1,
    };

    componentDidMount() {
        axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";

    axios //The url might be a bit different for you (the port number might be 44004)
      .get("https://localhost:5002/api/React/cities")
      .then((response) => {
        //Handle success
        console.log("api cities response:", response);
        this.setState({ cities: response.data });
        console.log("cities state:", this.state.cities);

      })
      .catch((error) => {
        //Handle error
        console.log("Error", error);
      })
      .then(() => {
        //Always executed
      });

      axios //The url might be a bit different for you (the port number might be 44004)
      .get("https://localhost:5002/api/React/countries")
      .then((response) => {
        //Handle success
        console.log("api countries response:", response);
        this.setState({ countries: response.data });
        console.log("countries state:", this.state.countries);
      })
      .catch((error) => {
        //Handle error
        console.log("Error", error);
      })
      .then(() => {
        //Always executed
      });
    }

    sendData = (event) => {
      console.log("senddata run");
      const currentState = this.state;
      this.props.callbackFunction(currentState);
      this.props.handleCreate(event);
    }

    changeValue = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    render() {
        const { name, phoneNumber, idCityValue, cities, idCountryValue, countries } = this.state;

        return (
            <form onSubmit={this.sendData}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                    id="name"
                    name="name"
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={this.changeValue}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <input
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={this.changeValue}
                    />
                </div>
                <div className="form-group">
                    <select
                    required
                    className="form-control"
                    name="idCityValue"
                    value={idCityValue}
                    onChange={this.changeValue}>
                      <option value="-1" disabled>
                        Select a city
                      </option>
                        {cities.map((city) => (
                        <option key={"cityId" + city.id} value={city.id}>
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
                    value={idCountryValue}
                    onChange={this.changeValue}>
                      <option value="-1" disabled>
                        Select a country
                      </option>
                        {countries.map((country) => <option key={"country" + country.id} value={country.id}>{country.countryName}</option>)}
                    </select>
                </div>
                <div className="form-group">
                <button className="btn btn-primary" type="submit">
                    Create
                </button>
                </div>
            </form>
        );
    }
}

export default PeopleCreate;