import React, { useState, useContext } from 'react';

import './Auth.scss';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import { AuthContext } from '../../shared/contex/auth_context';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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
            setFormData({ ...formState.inputs, name: undefined }, formState.inputs.email.isValid && formState.inputs.password.isValid);
            // for log in form
        } else {
            setFormData({ ...formState.inputs, name: { value: '', isValid: false } }, false)
            //for sign up form
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (isLoginMode) {
            try {
                const response = await fetch('http://localhost:5050/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setIsLoading(false);
                auth.login();
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again.')
            }

        } else {
            try {
                setIsLoading(true);
                // fetch() is provided JS. it starts the process of fetching a resource from server and returns promises
                const response = await fetch('http://localhost:5050/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const responseData = await response.json();
                //if response status code 500 or 400 and not status not OK, we use JS Error object and throw this object and run catch block. Don't execute othe code after if block
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setIsLoading(false);
                auth.login();
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again.')
            }
        }
    }

    const errorHandler = () => {
        setError(null)
    }


    return (
        <section className='user-auth'>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className='user-auth__authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2 className='user-auth__header'>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                <form className='user-auth__form' onSubmit={authSubmitHandler}>
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
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid password, at least 5 characters.'
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