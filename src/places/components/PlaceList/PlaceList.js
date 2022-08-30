import React from 'react';

import './PlaceList.scss';
import Card from '../../../shared/components/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../shared/components/Button/Button';


const PlaceList = ({ items }) => {
    if (items.length === 0) {
        return <div className='message'>
            <Card>
                <h2 className='message__content'>No places found. Maybe create one?</h2>
                <Button to='/places/new'>SHARE YOUR PLACE</Button>
            </Card>
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