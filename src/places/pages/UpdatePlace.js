import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

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
    console.log(placeId)
    // get info for special place 
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

    if (!identifiedPlace) {
        return (
            <div classname='message'>
                <h2>Could not find place!</h2>
            </div>
        )
    }

    return (
        <section className='place-update'>
            <form className='place-update__form'>
                <Input id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title'
                    onInput={() => { }}
                    value={identifiedPlace.title}
                    valid={true} />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid description (min 5 characters).'
                    onInput={() => { }}
                    value={identifiedPlace.description}
                    valid={true} />

                <Button type='submit' disabled={true}>UPDATE PLACE</Button>
            </form>
        </section>

    );
};

export default UpdatePlace;