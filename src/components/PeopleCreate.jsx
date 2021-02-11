import React, { Component } from "react";
import axios from "../../node_modules/axios";

class PeopleCreate extends Component {
    state = {
        name: "",
        phoneNumber: "",
        cities: [],
        countries: [],
        selectedCity: {},
        selectedCountry: "",
    };

    componentDidMount() {
        axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";

    axios //The url might be a bit different for you (the port number might be 44004)
      .get("https://localhost:5002/api/React/cities")
      .then((response) => {
        //Handle success
        console.log("api cities response:", response);
        let citiesFromApi = response.data.map(city => {
            return {value: city, display: city.cityName}
        });
        console.log(citiesFromApi);
        this.setState({ cities: [{value: {id: 0}, display: 'Select your city'}].concat(citiesFromApi) });
        console.log(this.state.cities);
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
        let countriesFromApi = response.data.map(country => {
            return {value: country, display: country.countryName}
        });
        console.log(countriesFromApi);
        this.setState({ countries: [{value: {id: 0}, display: 'Select your country'}].concat(countriesFromApi) });
        console.log(this.state.countries);
      })
      .catch((error) => {
        //Handle error
        console.log("Error", error);
      })
      .then(() => {
        //Always executed
      });
    }

    changeValue = (event) => {
        console.log(event);
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { name, phoneNumber, selectedCity } = this.state;

        return (
            <form onSubmit={this.props.handleCreate}>
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
                    className="form-control"
                    name="selectedCity"
                    type="text"
                    value={this.option.key.value.id}
                    onChange={this.changeValue}>
                        {this.state.cities.map((city) => <option key={"city" + city.value.id} value={city.value}>{city.display}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <select
                    className="form-control"
                    name="selectedCountry"
                    onChange={this.changeValue}>
                        {this.state.countries.map((country) => <option key={"country" + country.value.id} value={country.value}>{country.display}</option>)}
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