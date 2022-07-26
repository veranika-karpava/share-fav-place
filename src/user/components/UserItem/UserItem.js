import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../../shared/components/Avatar/Avatar';
import Card from '../../../shared/components/Card/Card';
import './UserItem.scss';

const UserItem = ({ id, image, name, placeCount }) => {
    return (
        <li className='users__item'>
            <Card className='users__item-content'>
                <Link to={`/${id}/places`} className='users__item-link'>
                    <div className='users__item-image'>
                        <Avatar image={image} alt={name} />
                    </div>
                    <div className='users__item-info'>
                        <h2 className='users__item-name'>{name}</h2>
                        <h3 className='users__item-shared-places'>{placeCount} {placeCount === 1 ? 'Place' : 'Places'} Shared</h3>
                    </div>
                </Link>
            </Card>
        </li >
    );
};

export default UserItem;