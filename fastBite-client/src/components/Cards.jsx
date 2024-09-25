import React, { useState, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../contexts/AuthProvider";

const Cards = ({ item }) => {
    const { name, image, price, _id } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext); // Obtenemos el usuario desde el contexto

    const navigate = useNavigate();
    const location = useLocation();

    // Función para agregar al carrito
    const handleAddtoCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

            fetch('http://localhost:6001/carts', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your item has been added to the cart",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error("Error adding to cart:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                });
        } else {
            // Si no hay usuario, redirigimos a la página de registro o login
            Swal.fire({
                title: "Are you sure?",
                text: "Please, create an account or login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', { state: { from: location } });
                }
            });
        }
    };

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className="card shadow-xl relative mr-5 md:my-5">
            {/* Corazón para agregar a favoritos */}
            <div
                className={`absolute right-2 top-2 p-4 rounded-full cursor-pointer ${isHeartFilled ? "text-rose-500" : "text-white"
                    } bg-orange`}
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
                    <button
                        className="btn bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                        onClick={() => handleAddtoCart(item)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;





