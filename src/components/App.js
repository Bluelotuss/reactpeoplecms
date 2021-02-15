import React, { Component } from "react";
import peopleService from "../api/peopleService";
import axios from "../../node_modules/axios";
import PeopleCreate from "./PeopleCreate";
import PeopleDetails from "./PeopleDetails";
import TableList from "./TableList";

class App extends Component {
  state = {
    peopleIdCounter: 3,
    peopleList: [],
    peopleDetails: null,
    showDetails: false,
    showCreate: false,
    peopleLoading: false,
    childData: [],
  };

  async componentDidMount() {
    let people = await peopleService.getAll();
    console.log("componentDidMount");
    console.log(people);
    if (people !== null) {
      this.setState({
        peopleList: people,
        peopleLoading: true,
      });
    }
  }

  showPeople = async (person) => {
    if (
      this.state.peopleDetails === null ||
      person.id !== this.state.peopleDetails.id
    ) {
      //This if is here to prevent user from clicking the same details button many time and we don´t want to send multiple calls to the backend.

      let details = await peopleService.getPerson(person.id);
      console.log("showPeople");
      this.setState({
        peopleDetails: details,
        showCreate: false,
        showDetails: true,
      });
    }
  };

  showCreate = () => {
    this.setState({
      peopleDetails: null,
      showCreate: true,
      showDetails: false,
    });
  };

  callbackFunction = async (props, event) => {
    event.preventDefault();
    await this.setState({ childData: props });
    this.handleCreate(event);
  };

  handleCreate = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const phoneNumber = event.target[1].value;

    console.log("chilData", this.state.childData);

    let resultCity;
    for (let index = 0; index < this.state.childData.cities.length; index++) {
      if (
        this.state.childData.idCityValue ===
        this.state.childData.cities[index].id
      ) {
        console.log("indexstate", this.state.childData.cities[index]);
        resultCity = this.state.childData.cities[index];
      }
    }

    let resultCountry;
    for (
      let index = 0;
      index < this.state.childData.countries.length;
      index++
    ) {
      if (
        this.state.childData.idCountryValue ===
        this.state.childData.countries[index].id
      ) {
        console.log("indexstate", this.state.childData.countries[index]);
        resultCountry = this.state.childData.countries[index];
      }
    }

    console.log("citiesresult", resultCity);
    const person = {
      Name: name,
      PhoneNumber: phoneNumber,
      City: resultCity,
      Country: resultCountry,
    };

    let peopleList = this.state.peopleList;

    axios({
      method: "post",
      url: "https://localhost:5002/api/React",
      data: person,
    })
      .then((response) => {
        //Handle success
        console.log("api post response:", response);
        peopleList.push(response.data);
        this.setState({ peopleList: peopleList });
      })
      .catch((error) => {
        //handle error
        console.log("Error", error);
      })
      .then(() => {
        //Always execute
      });
  };

  render() {
    const {
      showCreate,
      showDetails,
      peopleDetails,
      peopleList,
      peopleLoaded,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-9">
                <h3>People list</h3>
              </div>
              <div className="col-3">
                <button
                  className="btn btn-outline-success"
                  onClick={this.showCreate}
                >
                  Create person
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h3>
              {showCreate ? "Create" : showDetails ? "Details" : "Welcome"}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <TableList
              people={peopleList}
              selectedPerson={this.showPeople}
              peopleLoaded={peopleLoaded}
            />
          </div>
          <div className="col-6">
            {showCreate ? (
              <PeopleCreate
                handleCreate={this.handleCreate}
                callbackFunction={this.callbackFunction}
              />
            ) : showDetails ? (
              <PeopleDetails person={peopleDetails} />
            ) : (
              <p>Select a person from the list or create a new person.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
