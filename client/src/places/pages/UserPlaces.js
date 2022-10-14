import React, { useEffect, useState } from 'react';
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
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </section>
    );
};

export default UserPlaces;