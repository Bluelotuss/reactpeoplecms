import React, { useEffect } from "react";
import PersonItem from './PersonItem';

const PersonsList = (props) => {
    //useEffect in functional components is the equivalent of componentDidMount in class components
    useEffect(() => {
        console.log('component PersonsList rendered');
    }, []);
    let rowToShow;
    if (props.peopleLoaded) {//if axios has fetched the data from api
        rowToShow = props.people.map((person) => {
            return (
                <PersonItem
                key={person.id}
                person={person}
                itemClick={props.detailsClick}
                />
            );
        });
     } else { //if we are waiting for axios to fetch the data from the api
            
                    rowToShow = <tr>
                <td id="loadingData" colSpan="3">Loading...</td>
            </tr>
        };

    return (
        <table id='tablePeople' className='table table-striped table-hover'>
            <thead>
                <tr className='table-info'>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { rowToShow }
            </tbody>
        </table>
    )
}

export default PersonsList;