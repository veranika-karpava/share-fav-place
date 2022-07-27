import React from 'react';

import UserList from '../components/UserList/UserList';


const Users = () => {
    // const users = []
    const users = [{
        id: 'u1',
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