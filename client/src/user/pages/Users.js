import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList/UserList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';


const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                // fetch() - the default type is a get request
                const response = await fetch('http://localhost:5050/api/users');
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message)
            }
            setIsLoading(false);
        }
        sendRequest();

    }, []) // if dependency is empty, it will never rerun function inside of useEffect

    const errorHandler = () => {
        setError(null)
    }

    return (
        <section className='users'>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className='users__container-loading'><LoadingSpinner /></div>}
            {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
        </section>
    );
};

export default Users;