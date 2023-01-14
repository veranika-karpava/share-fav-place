import { useCallback, useReducer } from 'react';

// reducer function that specifies how to state gets updated
const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        // if it's undefied, skip property and go to new inputId
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          // if first value is falsy, result will be first value, otherwise second value
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    }
    default:
      return state;
  }
};

// name of custom hook for form should contain word 'use'
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // for sharing data of Input component (new place) to server
  // [] - empty depend - when component re-renders, function (first argument) is created and memorized
  // and can be reused
  const handleInputSubmit = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  //for getting data from server before update data in form
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, handleInputSubmit, setFormData];
};
