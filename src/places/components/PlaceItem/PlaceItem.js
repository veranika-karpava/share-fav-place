import React, { useState, useContext } from 'react';

import './PlaceItem.scss';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Modal from '../../../shared/components/Modal/Modal';
import Map from '../../../shared/components/Map/Map';
import { AuthContext } from '../../../shared/contex/auth_context';

const PlaceItem = ({ id, image, title, description, address, creatorId, coordinates }) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // handler for modal with map
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    // handler for show warning modal
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log('Delete')
    }


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

            <Modal header='Are you sure?' footerClass='place-item-actions' footer={
                <>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </>
            } show={showConfirmModal}>
                <p>Do you want to proceed and delete this place?</p>
                <p>Please note that it can't be undone thereafter</p>
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
                        {auth.isLoggedIn &&
                            <>
                                <Button to={`/places/${id}`} > EDIT </Button>
                                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                            </>}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;