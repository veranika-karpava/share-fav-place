import React from 'react';

import UserList from '../components/UserList/UserList';


const Users = () => {
    // const users = []
    const users = [{
        id: 'u1',
        name: 'An Smith',
        image: require('../../assets/images/photo1.jpg'),
        places: 2

    },
    {
        id: 'u2',
        name: 'John Silk',
        image: require('../../assets/images/photo1.jpg'),
        places: 2
    },
    {
        id: 'u3',
        name: 'Eva Dumn',
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