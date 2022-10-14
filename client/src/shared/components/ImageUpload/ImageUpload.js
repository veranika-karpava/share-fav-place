import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';
import './ImageUpload.scss';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();// url for preview
    const [isValid, setIsValid] = useState(false); // select or not select image

    // for pick image and store in virtual store
    const filePickerRef = useRef();

    // update preview
    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader(); // convert file into a readableor output url
        // file reader loads a new file or is done parsing a file
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)

        }
        // read file as a text string. run when file loads
        fileReader.readAsDataURL(file)

    }, [file])

    const pickedHandler = (e) => {
        // default JS - in the event target which are locked, which is this input element, you will have a files property that holds the files the user selected.
        let pickedFile;
        let fileIsValid = isValid;
        // .files = a fileList that contain file objs that user selected
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            // because not update immidately setIsValid
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    // for pick image 
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className='form__container'>
            <input type='file' id={props.id} style={{ display: 'none' }} accept='.jpg, .png, .jpeg' ref={filePickerRef} onChange={pickedHandler} className='form__input-upload-image' />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt='Preview' className='image-upload__image' />}
                    {!previewUrl && <p className='image-upload__message'>Please pick an image.</p>}

                </div>
                <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;