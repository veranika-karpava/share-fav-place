import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';// get router params from dynamic router

import PlaceList from '../components/PlaceList/PlaceList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;  // get userID from router

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5050/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId])

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    return (
        <section className='user-places'>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className='message__container-loading'><LoadingSpinner /></div>}
            {!isLoading && !loadedPlaces &&
                <div className='user-places__container-empty-list'>
                    <p className='user-places__message-empty'>Sorry, user's list is empty</p>
                    <Link to='/' className='user-places__link'>Back to main page</Link>
                </div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </section>
    );
};

export default UserPlaces;