import { useCallback, useReducer } from "react";

// reducer for useReducer hook
const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;// skip property that is undefined and go to new inputId
                }
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
            };
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
};

// custom hooks
export const useForm = (initialInputs, initialFormValidity) => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    // for sharing information from input component to newplace
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, []);
    // empty dependencies means if component re-renders or re-executes, this func will be stored away by React and will be reused( no creation new functio  object) and not changed => doesn't effect the useEffect

    // to get information form server before update data
    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({ type: 'SET_DATA', inputs: inputData, formIsValid: formValidity })
    }, []);

    return [formState, inputHandler, setFormData]
}