import peopleService from '../api/peopleService';
import React, { useEffect, useState } from 'react';
import MyLoader from './utils/MyLoader';

const PeopleDetails = (props) => {
  const [personItem, setPersonItem] = useState({
    item: '',
    isLoading: true,
  });


useEffect(() => {
  const fetchData = async () => {
    let theItem = await peopleService.getPerson(props.id);
    setPersonItem({ item: theItem, isLoading: false});
  };
  fetchData();
  console.log('PersonDetails is rendered', props.id);
}, [props.id]); //useEffect is triggered when this value is changed

return personItem.isLoading ? (
  <MyLoader />
) : (
        <dl>
            <dt>Name</dt>
            <dd>{personItem.item.name}</dd>
            <dt>PhoneNumber</dt>
            <dd>{personItem.item.phoneNumber}</dd>
            <dt>City</dt>
            <dd>{personItem.item.city.cityName}</dd>
            <dd><button className="btn btn-danger" onClick={() => peopleService.deletePerson(props.person.id)}>
                Delete
                </button>
                </dd>
        </dl>
);
};

export default PeopleDetails;