import React from 'react';

import './ErrorModal.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const ErrorModal = (props) => {
    return (
        <Modal
            onCancel={props.onClear}
            header='An Error Occurred!'
            show={!!props.error}
            footer={<Button onClick={props.onClear}>Okay</Button>}
        >
            <p className='modal__text-error'>{props.error}</p>
        </Modal>
    );
};

export default ErrorModal;