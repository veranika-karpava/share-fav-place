import React from 'react';
import './UserItem.scss';

const UserItem = ({ id, image, name, placeCount }) => {
    return (
        <li className='users__item'>
            <div className='users__item-content'>
                <div className='users__item-image'>
                    <img src={image} alt={name} className='users__image' />
                </div>
                <div className='users__item-info'>
                    <h2 className='users__item-name'>{name}</h2>
                    <h3 className='users__item-shared-places'>{placeCount} {placeCount === 1 ? 'Place' : 'Places'} Shared</h3>
                </div>
            </div>


        </li>
    );
};

export default UserItem;