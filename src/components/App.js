import React, { Component } from "react";
import peopleService from "../api/peopleService";
import axios from "../../node_modules/axios";
import PeopleCreate from "./PeopleCreate";
import PeopleDetails from "./PeopleDetails";
import TableList from "./TableList";

class App extends Component {
  state = {
    peopleList: [],
    peopleDetails: null,
    showDetails: false,
    showCreate: false,
    peopleLoaded: false,
    selectedId: "",
  };

  async componentDidMount() {
    let people = await peopleService.getAll();
    console.log("componentDidMount");
    console.log("people", people);
    if (people !== false) {
      this.setState({
        peopleList: people,
        peopleLoaded: true,
      });
    }
  }

  openDetails = (id) => {
    /*if (
      this.state.peopleDetails === null ||
      id !== this.state.peopleDetails.id
    ) {
      //This if is here to prevent user from clicking the same details button many time and we don´t want to send multiple calls to the backend.*/

    console.log("openDetails", id);
    this.setState({
      selectedId: id,
      showCreate: false,
      showDetails: true,
    });
  };

  openCreate = () => {
    console.log("openCreate");
    this.setState({
      showCreate: true,
      showDetails: false,
    });
  };

  saveNewPerson = async (props) => {
    console.log("in saveNewPerson", props.item);
    let theNewItem = await peopleService.createPerson(props.item);
    let people = await peopleService.getAll();

    console.log("theResponse", theNewItem, props.item);
    this.setState({
      peopleList: people,
      showCreate: false,
    });
  };

  render() {
    const {
      showCreate,
      openDetails,
      selectedId,
      peopleList,
      peopleLoaded,
      showDetails,
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
                  onClick={this.openCreate}
                >
                  Create person
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h3>
              {showCreate ? "Create" : openDetails ? "Details" : "Welcome"}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <TableList
              people={peopleList}
              detailsClick={this.openDetails}
              peopleLoaded={peopleLoaded}
            />
          </div>
          <div className="col-6">
            {showCreate ? (
              <PeopleCreate
                onSubmit={this.saveNewPerson}
                //callbackFunction={this.callbackFunction}
              />
            ) : showDetails ? (
              <PeopleDetails id={selectedId} />
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
