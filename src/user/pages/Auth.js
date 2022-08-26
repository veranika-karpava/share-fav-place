import React from 'react';


import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';


const Auth = () => {
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }
    )

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs)
    }

    return (
        <section className='user-auth'>
            <Card className='user-auth__authentication'>
                <h2>Login Required</h2>
                <form className='user-auth__form'>
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
                        element='password'
                        type='password'
                        label='Password'
                        placeholder='Please enter your password'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid password, at least 5 characters.'
                        onInput={inputHandler} />
                    <Button type='submit' onSubmit={authSubmitHandler} disabled={!formState.isValid}>LOG IN</Button>
                </form>
            </Card>
        </section>
    );
};

export default Auth;