import React from 'react';

import './PlaceItem.scss';
import Card from '../../../shared/components/Card/Card';

const PlaceItem = ({ id, image, title, description, address, creatorId, coordinates }) => {
    return (
        <li className='user-places__item'>
            <Card className='user-places__card'>
                <div className='user-places__view'>
                    <img src={image} alt={title} className='user-places__image' />
                </div>
                <div className='user-places__info'>
                    <h2 className='user-places__name'>{title}</h2>
                    <h3 className='user-places__address'>{address}</h3>
                    <p className='user-places__description'>{description}</p>
                </div>
                <div className='user-places__actions'>
                    <button className='user-places__button-action'>VIEW ON MAP</button>
                    {/* in future should be shown only for user of this places */}
                    <button className='user-places__button-action'>EDIT</button>
                    {/* in future should be shown only for user of this places */}
                    <button className='user-places__button-action'>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;