import React from "react";

const PeopleDetails = (props) => {
    return (
        <dl>
            <dt>Name</dt>
            <dd>{props.person.name}</dd>
            <dt>PhoneNumber</dt>
            <dd>{props.person.phoneNumber}</dd>
            <dt>City</dt>
            <dd>{props.person.city}</dd>
        </dl>
    );
};

export default PeopleDetails;