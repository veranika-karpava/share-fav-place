import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/contex/auth_context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.scss';

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();


    // find id for place from url
    const placeId = useParams().placeId;
    // get info for special place 

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

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5050/api/places/${placeId}`);
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
    }, [sendRequest, placeId, setFormData])


    const placeUpdateSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5050/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/' + auth.userId + '/places')
        } catch (err) { }

    }

    if (isLoading) {
        return (
            <div className='message__container-loading'>
                <LoadingSpinner asOvelay />
            </div>
        )
    }

    if (!loadedPlaces && !error) {
        return (
            <div className='message'>
                <Card>
                    <h2 className='message__content'>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    const cancelUpdateHandler = () => {
        history.push('/' + auth.userId + '/places')
    }

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