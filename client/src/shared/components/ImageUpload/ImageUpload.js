import React, { useRef, useState } from 'react';

import Button from '../Button/Button';
import './ImageUpload.scss';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    // for pick image
    const filePickerRef = useRef();

    const pickedHandler = (e) => {
        console.log(e.target)
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className='form__container'>
            <input type='file' id={props.id} style={{ display: 'none' }} accept='.jpg, .png, .jpeg' ref={filePickerRef} onChange={pickedHandler} className='form__input-upload-image' />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    <img src='' alt='Preview' className='image-upload__image' />
                </div>
                <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
        </div>
    );
};

export default ImageUpload;