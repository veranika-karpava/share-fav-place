import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './PlaceItem.scss';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Map from '../Map/Map';
import ErrorModal from '../ErrorModal/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../helpers/contex/auth_context';
import { useHttpClient } from '../../helpers/hooks/http-hook';
const API_URL = process.env.REACT_APP_BACKEND_URL;
const ASSET_URL = process.env.REACT_APP_ASSET_URL;

const PlaceItem = ({ id, image, title, description, address, creatorId, coordinates, onDelete }) => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // event handlers to open and close modal with map
    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    // event handler to open warning modal when remove a place from places list
    const showDeleteWarningHandler = () => setShowConfirmModal(true);

    // event handler to cancel removing a place
    const cancelDeleteHandler = () => setShowConfirmModal(false);

    // event handler to confirm of removing a place
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`${API_URL}/places/${id}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            onDelete(id);
            history.push('/');
        } catch (err) { }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                    <Button onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </>
            } show={showConfirmModal}>
                <p className='modal__content'>Do you want to proceed and delete this place?</p>
            </Modal>
            <li className='user-places__item'>
                <Card className='user-places__card'>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className='user-places__view'>
                        <img src={image.includes('http' || 'https') ? image : `${ASSET_URL}/${image}`} alt={title} className='user-places__image' />
                    </div>
                    <div className='user-places__info'>
                        <h2 className='user-places__name'>{title}</h2>
                        <h3 className='user-places__address'>{address}</h3>
                        <p className='user-places__description'>{description}</p>
                    </div>
                    <div className='user-places__actions'>
                        <Button inverse onClick={openMapHandler} > MAP </Button>
                        {auth.userId === creatorId &&
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