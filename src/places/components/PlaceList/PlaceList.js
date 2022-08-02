import React from 'react';

import './PlaceList.scss';
import Card from '../../../shared/components/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';

const PlaceList = ({ items }) => {
    if (items.length === 0) {
        return <div className='messagge'>
            <Card>
                <h2>Sorry, not found any places. Maybe create one?</h2>
            </Card>
            <button>Share Place</button>
        </div>
    }
    return (
        <ul className='user-places__list'>
            {items.map(place =>
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location} />)}
        </ul>
    );
};

export default PlaceList;