import React, { useContext } from 'react';
// gives you access to the history instance that you may use to navigate. For rediction to another page
import { useHistory } from 'react-router-dom';

import './PlaceForm.scss';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/contex/auth_context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../shared/components/ImageUpload/ImageUpload';

const NewPlace = () => {
    const auth = useContext(AuthContext); // access the managing states
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
            },
            image: {
                value: null,
                isValid: false
            }
        }
    )


    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(
                'http://localhost:5050/api/places',
                'POST',
                formData);
            // redirect to main page
            history.push('/');
        } catch (err) { }
    }

    return (
        <section className='place-form'>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form__form'>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id='title'
                    element="input"
                    type="text"
                    label="Title"
                    errorText='Please enter a valid title.'
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />

                <Input
                    id='description'
                    element='textarea'
                    label="Description"
                    errorText='Please enter a valid description (at least 5 characters).'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler} />

                <Input
                    id='address'
                    element='input'
                    label="Address"
                    errorText='Please enter a valid address.'
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <ImageUpload center
                    id='image'
                    onInput={inputHandler}
                    errorText='Please provide an image' />

                <Button type="submit" disabled={!formState.isValid} onClick={placeSubmitHandler}>ADD PLACE</Button>
            </form>
        </section>
    );
};

export default NewPlace;