import React, { useState, useEffect, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../../components/Cards';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const SimpleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick}>
            NEXT
        </div>
    );
};

const SimplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "orange" }} onClick={onClick}>
            BACK
        </div>
    );
};

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = useRef(null);

    useEffect(() => {
        fetch("/menu.json")
            .then(res => res.json())
            .then(data => {
                const specials = data.filter((item) => item.category === "popular");
                setRecipes(specials);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <SimpleNextArrow />,  
        prevArrow: <SimplePrevArrow />  
    };

    return (
        <div className='section-container my-20 relative'>
            <div className='text-center'>
                <p className='subtitle text-orange uppercase tracking-wide font-medium text-lg'>Special Dishes</p>
                <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>
                    Standout Dishes From Our Menu
                </h2>
            </div>

            {/* arrow btn */}
            <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
                <button onClick={() => slider?.current?.slickPrev()} className='btn p-2 rounded-full ml-5'><FaAngleLeft className='w-8 h-8 p-1'/></button>
                <button onClick={() => slider?.current?.slickNext()} className='btn p-2 rounded-full ml-5 bg-orange'><FaAngleRight className='w-8 h-8 p-1'/></button>
            </div>

            <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
                {
                    recipes.map((item, i) => (
                        <Cards key={i} item={item} />
                    ))
                }
            </Slider>
        </div>
    );
};

export default SpecialDishes;



