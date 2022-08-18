import React from 'react';


import './NewPlace.scss';
import Input from '../../shared/components/Input/Input';

const NewPlace = () => {
    return (
        <form className='place-form'>
            <Input element="input" type="text" label="Title" errorText='Please enter a valid title' />
        </form>
    );
};

export default NewPlace;