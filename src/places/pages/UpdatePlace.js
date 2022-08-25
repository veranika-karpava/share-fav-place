import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import { useForm } from '../../shared/hooks/form-hooks';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.scss';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdatePlace = () => {

    // find id for place from url
    const placeId = useParams().placeId;
    // get info for special place 
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: identifiedPlace.title,
                isValid: true
            },
            description: {
                value: identifiedPlace.description,
                isValid: true
            }
        },
        true
    );

    const placeUpdateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return (
            <div classname='message'>
                <h2>Could not find place!</h2>
            </div>
        )
    }

    return (
        <section className='place-form'>
            <form className='place-form__form' onSubmit={placeUpdateSubmitHandler}>
                <Input id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title'
                    onInput={inputHandler}
                    value={formState.inputs.title.value}
                    valid={formState.inputs.title.isValid} />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid description (min 5 characters).'
                    onInput={inputHandler}
                    value={formState.inputs.description.value}
                    valid={formState.inputs.description.isValid} />
                <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
            </form>
        </section>

    );
};

export default UpdatePlace;