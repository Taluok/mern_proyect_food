import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            {/* Contenedor para el corazón */}
            <div 
                className={`absolute top-2 right-2 p-2 rounded-full cursor-pointer ${isHeartFilled ? "text-rose-500" : "text-white"} bg-orange`} 
                onClick={handleHeartClick}
            >
                <FaHeart className="w-5 h-5 cursor-pointer" />
            </div>

            {/* Enlace a la página del menú */}
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-72 object-cover rounded-t-lg transition-transform transform hover:scale-105 duration-300"
                    />
                </figure>
            </Link>

            {/* Contenido de la tarjeta */}
            <div className="card-body p-4">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                </Link>
                <p className="text-gray-600 mb-4">{item.recipe}</p> {/* Se muestra la receta */}
                <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">
                        <span className="text-red-500">$</span> {item.price}
                    </h5>
                    <button className="btn bg-orange text-white px-4 py-2 rounded-lg">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;



