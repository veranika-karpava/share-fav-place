import React from 'react';

import UserList from '../components/UserList/UserList';


const Users = () => {
    // const users = []
    const users = [{
        id: 'u1',
        name: 'Veranika Karpava',
        image: require('../../assets/images/photo1.jpg'),
        places: 3

    },
    {
        id: 'u2',
        name: 'Andrei Karpau',
        image: require('../../assets/images/photo1.jpg'),
        places: 2
    },
    {
        id: 'u3',
        name: 'Nika Hlazkova',
        image: require('../../assets/images/photo1.jpg'),
        places: 1
    }
    ]
    return (
        <section className='users'>
            <UserList users={users} />
        </section>
    );
};

export default Users;