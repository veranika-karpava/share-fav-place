import React, { useState, useContext } from 'react';

import './Auth.scss';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import Card from '../../components/Card/Card';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../helpers/util/validators';
import { useForm } from '../../helpers/hooks/form-hooks';
import { useHttpClient } from '../../helpers/hooks/http-hook';
import { AuthContext } from '../../helpers/contex/auth_context';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({ ...formState.inputs, name: undefined, image: undefined }, formState.inputs.email.isValid && formState.inputs.password.isValid);
            // for log in form
        } else {
            setFormData({ ...formState.inputs, name: { value: '', isValid: false }, image: { value: null, isValid: false } }, false)
            //for sign up form
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    `${API_URL}/users/login`,
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) { }
        } else {
            try {
                const formData = new FormData();
                formData.append('name', formState.inputs.name.value);
                formData.append('email', formState.inputs.email.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                const responseData = await sendRequest(
                    `${API_URL}/users/signup`,
                    'POST',
                    // couldn't JSON.stringify - because image is binary data
                    formData
                );
                auth.login(responseData.userId, responseData.token);
            } catch (err) { }
        }
    };

    return (
        <section className='user-auth'>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='user-auth__authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2 className='user-auth__header'>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                <form className='user-auth__form' onSubmit={authSubmitHandler}>
                    {!isLoginMode && <ImageUpload id='image' onInput={inputHandler} errorText='Please provide an image' />}
                    {!isLoginMode &&
                        (<Input
                            id='name'
                            element='input'
                            type='text'
                            label='Name'
                            placeholder='Please enter your Username'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter an Username' onInput={inputHandler} />
                        )}
                    <Input
                        id='email'
                        element='input'
                        type='email'
                        label='E-mail'
                        placeholder='Please enter your email'
                        validators={[VALIDATOR_EMAIL()]}
                        errorText='Please enter a valid email address.'
                        onInput={inputHandler} />
                    <Input
                        id='password'
                        element='input'
                        type='password'
                        label='Password'
                        placeholder='Please enter your password'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText='Please enter a valid password, at least 6 characters.'
                        onInput={inputHandler} />
                    <Button type='submit' disabled={!formState.isValid}>{isLoginMode ? 'LOG IN' : 'SIGN UP'}</Button>
                </form>
                <div className='user-auth__container'>
                    <p>{isLoginMode ? `Don't have an account?` : 'Do you have an account'} </p>
                    <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOG IN'}</Button>
                </div>
            </Card>
        </section>
    );
};

export default Auth;