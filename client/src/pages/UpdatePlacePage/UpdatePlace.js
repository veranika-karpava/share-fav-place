import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useForm } from '../../helpers/hooks/form-hooks';
import { useHttpClient } from '../../helpers/hooks/http-hook';
import { AuthContext } from '../../helpers/contex/auth_context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../helpers/util/validators';
import '../NewPlacePage/PlaceForm.scss';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    // get id from url param
    const placeId = useParams().placeId;

    //formData for update info about place with default values
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    // render component every time when sendRequest, placeId, setFormData changes
    useEffect(() => {
        // get place's info depends on the placeId
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`${API_URL}/places/${placeId}`);
                setLoadedPlaces(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true);
            } catch (err) { }
        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    // event handler for submission of update place's info
    const placeUpdateSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(`${API_URL}/places/${placeId}`, 'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            // redirect to user's list of places
            history.push('/' + auth.userId + '/places')
        } catch (err) { }
    };

    if (isLoading) {
        return (
            <div className='message__container-loading'>
                <LoadingSpinner asOvelay />
            </div>
        )
    };

    if (!loadedPlaces && !error) {
        return (
            <div className='message'>
                <Card>
                    <h2 className='message__content'>Could not find place!</h2>
                </Card>
            </div>
        )
    };

    // event handler to cancel update data and redirect to user's list of places
    const cancelUpdateHandler = () => {
        history.push('/' + auth.userId + '/places')
    };

    return (
        <section className='place-form'>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlaces && (
                <form className='place-form__form' onSubmit={placeUpdateSubmitHandler}>
                    <Input id='title'
                        element='input'
                        type='text'
                        label='Title'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a valid title'
                        onInput={inputHandler}
                        initialValue={loadedPlaces.title}
                        initialValid={true} />
                    <Input
                        id='description'
                        element='textarea'
                        label='Description'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid description (min 5 characters).'
                        onInput={inputHandler}
                        initialValue={loadedPlaces.description}
                        initialValid={true} />
                    <div className='place-form__actions'>
                        <Button onClick={cancelUpdateHandler}>CANCEL</Button>
                        <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default UpdatePlace;