import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className="card shadow-xl relative mr-5 md:my-5">
            {/* Corazón para agregar a favoritos */}
            <div
                className={`absolute right-2 top-2 p-4 rounded-full cursor-pointer ${isHeartFilled ? "text-rose-500" : "text-white"
                    } bg-orange`} // Asegúrate que 'bg-green-500' esté en tu configuración de Tailwind
                onClick={handleHeartClick}
            >
                <FaHeart className="w-5 h-5" />
            </div>

            {/* Enlace a la página del menú */}
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="hover:scale-105 transition-all duration-300 md:h-72 object-cover w-full"
                    />
                </figure>
            </Link>

            {/* Contenido de la tarjeta */}
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title text-lg font-semibold">{item.name}</h2>
                </Link>
                <p className="text-gray-500">Description of the item</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold text-lg">
                        <span className="text-sm text-red-500">$ </span>{item.price}
                    </h5>
                    <button className="btn bg-orange text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;




