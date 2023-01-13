import React, { useReducer, useEffect } from 'react';

import { validate } from '../../helpers/util/validators'; // import validate function
import './Input.scss';

// reducer function
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        // allows not to lose data
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  element,
  type,
  id,
  placeholder,
  rows,
  maxlength,
  label,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  });

  // new value from input filed back to the place where we use Input component
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  // call reducer function and pass current state
  const onChangeHandler = e => {
    dispatch({ type: 'CHANGE', val: e.target.value, validators: validators });
  };

  // call reducer function and pass current state
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const elementForm =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="form__input"
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        className="form__input"
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        maxLength={maxlength || 100}
      />
    );

  return (
    <div
      className={`form__container ${
        !inputState.isValid &&
        inputState.isTouched &&
        'form__container--invalid'
      }`}
    >
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      {elementForm}
      {!inputState.isValid && inputState.isTouched && (
        <p className="form__error-message">{errorText}</p>
      )}
    </div>
  );
};

export default Input;
