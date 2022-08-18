import React, { useState } from 'react';


import './PlaceItem.scss';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Modal from '../../../shared/components/Modal/Modal';
import Map from '../../../shared/components/Map/Map';

const PlaceItem = ({ id, image, title, description, address, creatorId, coordinates }) => {
    const [showMap, setShowMap] = useState(false);

    // handler for modal with map
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass='place-item-contents'
                footerClass='place-item-actions'
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
                <div className='modal__map-container'>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>

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
                        <Button inverse onClick={openMapHandler} > VIEW ON MAP </Button>
                        <Button to={`places/${id}`} > EDIT </Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;