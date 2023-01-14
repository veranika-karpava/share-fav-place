//a list of types of validator
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'; // input is not empty
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'; //minimum length input
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH'; //maximum length input
const VALIDATOR_TYPE_MIN = 'MIN'; // min number
const VALIDATOR_TYPE_MAX = 'MAX'; // max number
const VALIDATOR_TYPE_EMAIL = 'EMAIL'; // email address
const VALIDATOR_TYPE_FILE = 'FILE'; // file for upload image

// get type of validation and input value
export const VALIDATOR_REQUIRE = () => ({
  type: VALIDATOR_TYPE_REQUIRE,
});

// get validation of the file
export const VALIDATOR_FILE = () => ({
  type: VALIDATOR_TYPE_FILE,
});

// set min length for input validation
export const VALIDATOR_MINLENGTH = (num) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: num,
});

// set max length for input validation
export const VALIDATOR_MAXLENGTH = (num) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: num,
});

// set min amount character
export const VALIDATOR_MIN = (num) => ({
  type: VALIDATOR_TYPE_MIN,
  val: num,
});

// set max amount character
export const VALIDATOR_MAX = (num) => ({
  type: VALIDATOR_TYPE_MAX,
  val: num,
});

// validate email
export const VALIDATOR_EMAIL = () => ({
  type: VALIDATOR_TYPE_EMAIL
});

// function that uses arguments: value - input value and validators - array of validators
export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      //isValid = true && false => false
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
