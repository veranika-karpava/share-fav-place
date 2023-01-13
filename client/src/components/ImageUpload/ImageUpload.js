import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';
import './ImageUpload.scss';

const ImageUpload = ({ center, errorText, id, onInput }) => {
  const [file, setFile] = useState();
  // create url for preview
  const [previewUrl, setPreviewUrl] = useState();
  // check that image is picked or not
  const [isValid, setIsValid] = useState(false);

  // hook for pick image and save in virtual store
  const filePickerRef = useRef();

  // update preview everytime when file change
  useEffect(() => {
    // if file isn't picked
    if (!file) {
      return;
    }
    // convert file into a readable output url
    const fileReader = new FileReader();

    // file reader loads a new file or is done parsing a file
    fileReader.onload = () => setPreviewUrl(fileReader.result);

    // read file as a text string and run when file loads
    fileReader.readAsDataURL(file);
  }, [file]);

  // event handler for picking image in form
  const pickedHandler = e => {
    // default JS - in the event target which are locked, which is this input element, you will have a files property that holds the files the user selected.
    let pickedFile;
    let fileIsValid = isValid;
    // .files = a fileList that contain file objs that user selected
    if (e.target.files && e.target.files.length === 1) {
      [pickedFile] = e.target.files;
      setFile(pickedFile);
      setIsValid(true);
      // because not update immidately setIsValid
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  // event handler for picking image
  const pickImageHandler = () => filePickerRef.current.click();

  return (
    <div className="form__container">
      <input
        type="file"
        id={id}
        style={{ display: 'none' }}
        accept=".jpg, .png, .jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
        className="form__input-upload-image"
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="image-upload__image"
            />
          )}
          {!previewUrl && (
            <p className="image-upload__message">Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
