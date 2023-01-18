import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import './UserItem.scss';
const ASSET_URL = process.env.REACT_APP_ASSET_URL;

const UserItem = ({ id, image, name, placeCount, listPlaces }) => {

  return (
    <li className="users__item">
      <Card className="users__item-content">
        <Link to={`/${id}/places`} className="users__item-link">
          <div className="users__item-image">
            <Avatar
              image={
                image.includes('http' || 'https')
                  ? image
                  : `${ASSET_URL}/${image}`
              }
              alt={name}
            />
          </div>
          <div className="users__item-info">
            <h2 className="users__item-name">{name}</h2>
            <h3 className="users__item-shared-places">
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'} Shared
            </h3>

          </div>
        </Link>
        {listPlaces.length !== 0 && <Carousel listPlaces={listPlaces} />}
      </Card>
    </li>
  );
};

export default UserItem;
