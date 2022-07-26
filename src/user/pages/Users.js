import React from 'react';
import UserList from '../components/UserList/UserList';


const Users = () => {
    const users = [{
        id: Math.random(),
        name: 'Veranika Karpava',
        image: require('../../assets/images/photo1.jpg'),
        places: 3

    }]
    return (
        <section className='users'>
            <UserList users={users} />
        </section>
    );
};

export default Users;