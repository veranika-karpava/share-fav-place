import React, { useCallback, useReducer } from 'react';


import './NewPlace.scss';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        default:
            return state;
    }
};


const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });
    // for sharing information from input component to newplace
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, [])
    // empty dependencies means if component re-renders or re-executes, this func will be stored away by React and will be reused( no creation new functio  object) and not changed => doesn't effect the useEffect

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