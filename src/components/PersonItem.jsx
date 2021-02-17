import React from 'react';

function PersonItem(props) {
    let person = props.person;
    let ret = 
    person == null ? null : (
        <tr className='table-secondary'>
            <td>{person.name}</td>
            <td>{person.phoneNumber}</td>
            <td>
                <input
                type='button'
                className='btn btn-info'
                value='Details'
                onClick={() => props.itemClick(person.id)}
                />
            </td>
        </tr>
    );
        return ret;
}

export default PersonItem;