import React, { useReducer } from 'react';

import { validate } from '../../util/validators;'
import './Input.scss';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            };
        default:
            return state;
    }
}

const Input = ({ element, type, id, placeholder, rows, label, errorText }) => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    const onChangeHandler = (e) => {
        dispatch({ type: 'CHANGE', val: e.target.value })
    };

    const elementForm = element === 'input'
        ?
        (<input id={id} type={type} placeholder={placeholder} className='form-place__input' onChange={onChangeHandler} value={inputState.value} />)
        :
        (<textarea id={id} rows={rows || 3} className='form-place__input' onChange={onChangeHandler} value={inputState.value} />
        );



    return (
        <div className={`form-place__container ${!inputState.isValid && 'form-place__container--invalid'}`}>
            <label htmlFor={id} className='form-place__label'>{label}</label>
            {elementForm}
            {!inputState.isValid && <p className='form-place__error-message'>{errorText}</p>}
        </div>
    );
};

export default Input;