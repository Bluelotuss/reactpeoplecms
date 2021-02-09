import React, { Component } from "react";
import "../css/TableList.css";

class TableList extends Component {
    render() {
        const { people, peopleLoaded } = this.props;
        let rowToShow;
        if (peopleLoaded) {//if axios has fetched the data from api
        rowToShow = people.map((item) => {
            return (
                <tr key={"peopleRow" + item.id}>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                        <button
                        className="btn btn-info"
                        onClick={() => this.props.selectedPerson(item)}
                        >
                            Details
                        </button>
                    </td>
                </tr>
            );
        });
        } else { //if we are waiting for axios to fetch the data from the api
            rowToShow = <tr>
                <td id="loadingData" colSpan="3">Loading...</td>
            </tr>
        }

        return (
            <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { rowToShow }
        </tbody>
      </table>
        );
    }
}

export default TableList;