import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';// import validate function
import './Input.scss';

// reducer function
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state, // don't lose data 
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = ({ element, type, id, placeholder, rows, label, errorText, validators, onInput, initialValue, initialValid }) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initialValid || false,
        isTouched: false
    })

    // new value from input filed back to the place where we use Input component
    useEffect(() => { onInput(id, inputState.value, inputState.isValid) }, [id, inputState.value, inputState.isValid, onInput]);

    // call reducer function and pass current state
    const onChangeHandler = (e) => {
        dispatch({ type: 'CHANGE', val: e.target.value, validators: validators })
    };

    // // call reducer function and pass current state
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }


    const elementForm = element === 'input'
        ?
        (<input id={id} type={type} placeholder={placeholder} className='form-place__input' onChange={onChangeHandler} value={inputState.value} onBlur={touchHandler} />)
        :
        (<textarea id={id} rows={rows || 3} className='form-place__input' onChange={onChangeHandler} value={inputState.value} onBlur={touchHandler} />
        );

    return (
        <div className={`form-place__container ${!inputState.isValid && inputState.isTouched && 'form-place__container--invalid'}`}>
            <label htmlFor={id} className='form-place__label'>{label}</label>
            {elementForm}
            {!inputState.isValid && inputState.isTouched && <p className='form-place__error-message'>{errorText}</p>}
        </div>
    );
};

export default Input;