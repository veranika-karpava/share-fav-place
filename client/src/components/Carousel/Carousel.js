import React, { useState, useEffect } from 'react';


import './Carousel.scss';
const ASSET_URL = process.env.REACT_APP_ASSET_URL;

const Carousel = ({ listPlaces }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(listPlaces.length);

    useEffect(() => {
        setLength(listPlaces.length)
    }, [listPlaces]);

    const nextHandler = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prevHandler = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return (
        <div style={{ maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
            <div className='carousel'>
                <div className="carousel__wrapper">
                    {currentIndex > 0 && <button className="carousel__left-arrow" onClick={prevHandler}>
                        &lt;
                    </button>}
                    <div className="carousel__content-wrapper">
                        <div className="carousel__content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {listPlaces.map((image, i) => {
                                return (<img
                                    key={i}
                                    src={image.image.includes('http' || 'https')
                                        ? image.image
                                        : `${ASSET_URL}/${image.image}`}
                                    alt={image.title}
                                    className="carousel__image"
                                />)
                            })}
                        </div>
                    </div>
                    {currentIndex < (length - 1) && <button className="carousel__right-arrow" onClick={nextHandler}>
                        &gt;
                    </button>}

                </div>
            </div>
        </div>
    );
};

export default Carousel;