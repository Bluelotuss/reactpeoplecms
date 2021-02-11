import React from "react";
import axios from "../../node_modules/axios";

function handleRemove(id) {
    console.log(id);

    axios({
        method: "delete",
        url: "https://localhost:5002/api/React/" + id,
        data: id,
      })
        .then((response) => {
          //Handle success
          console.log("api post response:", response);
        })
        .catch((error) => {
          //handle error
          console.log("Error", error);
        })
        .then(() => {
          //Always execute
        });
}



const PeopleDetails = (props) => {
    return (
        <dl>
            <dt>Name</dt>
            <dd>{props.person.name}</dd>
            <dt>PhoneNumber</dt>
            <dd>{props.person.phoneNumber}</dd>
            <dt>City</dt>
            <dd>{props.person.city.cityName}</dd>
            <dd><button className="btn btn-danger" onClick={() => handleRemove(props.person.id)}>
                Delete
                </button>
                </dd>
        </dl>
    );
};

export default PeopleDetails;