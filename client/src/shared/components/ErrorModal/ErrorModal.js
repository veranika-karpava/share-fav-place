import React from 'react';

import './ErrorModal.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const ErrorModal = ({ onClear, error }) => {
    return (
        <Modal
            onCancel={onClear}
            header='Oppps...An Error Occurred.'
            show={!!error}
            footer={<Button onClick={onClear}>Okay</Button>}
        >
            <p className='modal__text-error'>{error}</p>
        </Modal>
    );
};

export default ErrorModal;