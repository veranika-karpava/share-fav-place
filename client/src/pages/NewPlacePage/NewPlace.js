import React, { useContext } from 'react';
// access to the history instance. redirect to another page
import { useHistory } from 'react-router-dom';

import './PlaceForm.scss';
import { useForm } from '../../helpers/hooks/form-hooks';
import { useHttpClient } from '../../helpers/hooks/http-hook';
import { AuthContext } from '../../helpers/contex/auth_context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../helpers/util/validators';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const NewPlace = () => {
  // access the managing states
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // form state with default values
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
  });

  // event handler for submission form and redirection to main page
  const placeSubmitHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(`${API_URL}/places`, 'POST', formData, {
        Authorization: 'Bearer ' + auth.token,
      });
      // redirect to main page
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="place-form">
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form__form">
        {isLoading && <LoadingSpinner asOverlay />}
        <h1 className="place-form__title">Add your new favourite place</h1>
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          errorText="Please enter a valid title."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          errorText="Please enter a valid description (at least 5 characters)."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          maxlength="100"
        />
        <Input
          id="address"
          element="input"
          label="Address"
          errorText="Please enter a valid address."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={placeSubmitHandler}
        >
          ADD PLACE
        </Button>
      </form>
    </section>
  );
};

export default NewPlace;
