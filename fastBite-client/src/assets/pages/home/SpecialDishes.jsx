/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../../components/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";  // Ajuste de imports

// Componente para flecha siguiente
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        >
            NEXT
        </div>
    );
};

// Componente para flecha previa
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
            BACK
        </div>
    );
};

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = useRef(null);

    useEffect(() => {
        fetch("/menu.json")
            .then((res) => res.json())
            .then((data) => {
                const specials = data.filter((item) => item.category === "popular");
                setRecipes(specials);
            });
    }, []);

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
            {/* Título y subtítulo */}
            <div className='text-left'>
                <p className='subtitle text-orange uppercase tracking-wide font-medium text-lg'>
                    Customer Favorites
                </p>
                <h2 className='title text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>
                    Popular Categories
                </h2>
            </div>

            {/* Botones de navegación */}
            <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
                <button
                    onClick={() => slider?.current?.slickPrev()}
                    className="btn p-2 rounded-full ml-5 bg-gray-300"
                >
                    <FaAngleLeft className="h-8 w-8 p-1" />
                </button>
                <button
                    className="btn p-2 rounded-full ml-5 bg-orange text-white"
                    onClick={() => slider?.current?.slickNext()}
                >
                    <FaAngleRight className="h-8 w-8 p-1" />
                </button>
            </div>

            {/* Slider */}
            <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
                {recipes.map((item, i) => (
                    <Cards item={item} key={i} />
                ))}
            </Slider>
        </div>
    );
};

export default SpecialDishes;




