import React, { useState } from 'react';
import "/node_modules/slick-carousel/slick/slick.css";
import "/node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([])
    const slider = React.useRef(null)

    useEffect(()=>{
        fetch("/menu.json").then(res => res.json()). then(data => {
            const specials = data.filter((item) => item.category === "popular")
            setRecipes(specials)
        })
    },[])

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
        ]
    };

    return (
        <div className='section-container my-20'>
            <div className='text-left'>
                <p className='subtitle text-orange uppercase tracking-wide font-medium text-lg'>Special Dishes</p>
                <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>Standout Dishes From Our Menu</h2>
            </div>

            <Slider {...settings}>
                {
                    recipes.map((item, i) => (
                        
                    ))
                }
            </Slider>

        </div>
    );
}

export default SpecialDishes;

