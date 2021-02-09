import React, { Component } from "react";

class PeopleCreate extends Component {
    state = {
        name: "",
        phoneNumber: "",
    };

    changeValue = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { name, phoneNumber } = this.state;

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
                <button className="btn btn-primary" type="submit">
                    Create
                </button>
            </form>
        );
    }
}

export default PeopleCreate;