import React from 'react';
import UserItem from '../UserItem/UserItem';
import './UserList.scss';

const UserList = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className='users__message-container'>
                <h1 className='users__message'>Sorry, users not found</h1>
            </div>
        );
    }

    return <ul className='users__list'>
        {users.map(user => (
            <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places} />
        ))}
    </ul>

};

export default UserList;