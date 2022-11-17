import React from 'react';

import './PlaceList.scss';
import PlaceItem from '../PlaceItem/PlaceItem';

const PlaceList = ({ items, onDeletePlace }) => {


    return (
        <ul className='user-places__list'>
            {items.map(place =>
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={onDeletePlace} />)}
        </ul>
    );
};

export default PlaceList;