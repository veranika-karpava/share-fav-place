import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList/UserList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5050/api/users'
                );

                setLoadedUsers(responseData.users);
            } catch (err) { }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <section className='users'>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className='users__container-loading'><LoadingSpinner /></div>}
            {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
        </section>
    );
};

export default Users;