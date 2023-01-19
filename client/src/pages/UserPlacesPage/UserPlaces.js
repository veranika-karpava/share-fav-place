import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'; // get router params from dynamic router

import PlaceList from '../../components/PlaceList/PlaceList';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../helpers/contex/auth_context';
import { useHttpClient } from '../../helpers/hooks/http-hook';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const UserPlaces = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  // get userID from url params
  const { userId } = useParams();

  // for fetching places fro specified userID
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${API_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  //for removing place from the list of places
  const placeDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <section className="user-places">
      {isLoading && (
        <div
          className="message__container-loading"
          style={{ marginTop: '-5rem' }}
        >
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !loadedPlaces && (
        <div className="message">
          <Card>
            <h2 className="message__content">
              {auth.userId === userId
                ? 'No places found. Maybe create one?'
                : 'Sorry, no places found.'}
            </h2>
            {auth.userId === userId ? (
              <Button to="/places/new">SHARE YOUR PLACE</Button>
            ) : (
              <Button to="/">BACK TO HOME PAGE</Button>
            )}
          </Card>
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </section>
  );
};

export default UserPlaces;
