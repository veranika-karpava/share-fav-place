import React, { useCallback } from 'react';


import './NewPlace.scss';
import Input from '../../shared/components/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const NewPlace = () => {
    // for sharing information from input component to newplace
    const titleHandler = useCallback((id, value, isValid) => { }, [])
    const discriptionHandler = useCallback((id, value, isValid) => { }, []) // empty dependencies means if component re-renders or re-executes, this func will be stored away by React and will be reused( no creation new functio  object) and not changed => doesn't effect the useEffect

    return (
        <form className='place-form'>
            <Input id='title' element="input" type="text" label="Title" errorText='Please enter a valid title' validators={[VALIDATOR_REQUIRE()]} onInput={titleHandler} />
            <Input id='description' element='textarea' label="Description" errorText='Please enter a valid description (at least 5 characters)' validators={[VALIDATOR_MINLENGTH(5)]} onInput={discriptionHandler} />
        </form>
    );
};

export default NewPlace;