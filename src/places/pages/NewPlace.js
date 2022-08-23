import React from 'react';


import './NewPlace.scss';
import Input from '../../shared/components/Input/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

const NewPlace = () => {
    return (
        <form className='place-form'>
            <Input element="input" type="text" label="Title" errorText='Please enter a valid title' validators={[VALIDATOR_REQUIRE()]} />
        </form>
    );
};

export default NewPlace;