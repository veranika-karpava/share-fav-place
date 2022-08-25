import React from 'react';

import './PlaceForm.scss';
import { useForm } from '../../shared/hooks/form-hooks';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';


const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        }
    )

    const placeSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs)// send to back end server
    }

    return (
        <section className='place-form'>
            <form className='place-form__form'>
                <Input id='title' element="input" type="text" label="Title" errorText='Please enter a valid title.' validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />
                <Input id='description' element='textarea' label="Description" errorText='Please enter a valid description (at least 5 characters).' validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandler} />
                <Input id='address' element='input' label="Address" errorText='Please enter a valid address.' validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />
                <Button type="submit" disabled={!formState.isValid} onClick={placeSubmitHandler}>ADD PLACE</Button>
            </form>
        </section>
    );
};

export default NewPlace;