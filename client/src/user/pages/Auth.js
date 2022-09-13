import React, { useState, useContext } from 'react';

import './Auth.scss';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import { AuthContext } from '../../shared/contex/auth_context';


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

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
            setFormData({ ...formState.inputs, username: undefined }, formState.inputs.email.isValid && formState.inputs.password.isValid);
            // for log in form
        } else {
            setFormData({ ...formState.inputs, username: { value: '', isValid: false } }, false)
            //for sign up form
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }


    return (
        <section className='user-auth'>
            <Card className='user-auth__authentication'>
                <h2 className='user-auth__header'>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                <form className='user-auth__form' onSubmit={authSubmitHandler}>
                    {!isLoginMode &&
                        (<Input
                            id='username'
                            element='input'
                            type='text'
                            label='Username'
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