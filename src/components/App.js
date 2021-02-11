import React, { Component } from "react";
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
    peopleLoaded: false,
  };

  componentDidMount() {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";

    axios //The url might be a bit different for you (the port number might be 44004)
      .get("https://localhost:5002/api/React")
      .then((response) => {
        //Handle success
        console.log("api all response:", response);
        this.setState({ peopleList: response.data, peopleLoaded: true });
      })
      .catch((error) => {
        //Handle error
        console.log("Error", error);
      })
      .then(() => {
        //Always executed
      });
  }

  showPeople = (person) => {
    if (
      this.state.peopleDetails === null ||
      person.id !== this.state.peopleDetails.id
    ) {
      //This if is here to prevent user from clicking the same details button many time and we don´t want to send multiple calls to the backend.
      axios
        .get("https://localhost:5002/api/React/" + person.id)
        .then((response) => {
          //Handle success
          console.log("api details response:", response);
          this.setState({
            peopleDetails: response.data,
            showCreate: false,
            showDetails: true,
          });
        })
        .catch((error) => {
          //Handle error
          console.log("Error", error);
        })
        .then(() => {
          //Always executed
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

  handleCreate = (event) => {
    event.preventDefault();
    console.log(event);
    const name = event.target[0].value;
    const phoneNumber = event.target[1].value;
    const city = event.target[2].value;
    console.log(city);
    const person = {
      Name: name,
      PhoneNumber: phoneNumber,
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
              <PeopleCreate handleCreate={this.handleCreate} />
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
