
// identifiers of different validator types
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'; // not empty input
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'; //minimum length input
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';//maximum length input
const VALIDATOR_TYPE_MIN = 'MIN';// min number
const VALIDATOR_TYPE_MAX = 'MAX';// max number
const VALIDATOR_TYPE_EMAIL = 'EMAIL'; // email address
const VALIDATOR_TYPE_FILE = 'FILE'; // file for upload image


// function that return type of validation and input value
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE }); //return type of validation
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE }); // return type od validation
export const VALIDATOR_MINLENGTH = val => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    val: val
}); //return type of validation and input value
export const VALIDATOR_MAXLENGTH = val => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    val: val
});//return type of validation and input value
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });//return type of validation and input value
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });//return type of validation and input value
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });// return type od validation

// function that uses arguments: value - input value and validators - array of validators
export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        } // that input isn't empty
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAX) {
            isValid = isValid && +value <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};