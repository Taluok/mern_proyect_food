import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

    // Calcular precio total por item
    const calculatePrice = (item) => {
        return item.price * item.quantity;
    };

    // Función para disminuir la cantidad
    const handleDecrease = (item) => {
        if (item.quantity > 1) {  // No permitir cantidades menores a 1
            fetch(`http://localhost:6001/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        refetch(); // Actualizar carrito tras la petición
                    } else {
                        console.error('Error updating quantity:', data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };

    //calculo precio total 
    const cartSubTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item);
    },0);

    const orderTotal = cartSubTotal;

    // Función para aumentar la cantidad
    const handleIncrease = (item) => {
        fetch(`http://localhost:6001/carts/${item._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    refetch();
                } else {
                    console.error('Error updating quantity:', data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Manejar la eliminación del item
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:6001/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue deleting the item.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="section-container">
            {/* Banner */}
            <div className='py-36 flex flex-col items-center justify-center gap-8'>
                {/* Textos */}
                <div className='px-4 space-y-7 text-center'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Items Added to the <span className='text-orange'>Cart</span>
                    </h2>
                    <p className='text-[#4a4a4a] text-xl'>
                        Where Each Plate Weaves a Story of Culinary Mastery & Passionate Craftsmanship
                    </p>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Cabecera */}
                        <thead className='bg-orange text-white rounded-sm'>
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Filas dinámicas del carrito */}
                            {cart.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-medium'>{item.name}</td>
                                    <td>
                                        <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                                        <input type="number" value={item.quantity}
                                            readOnly className='w-10 mx-2 text-center overflow-hidden appearance-none' />
                                        <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                                    </td>
                                    <td>${calculatePrice(item)}</td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-xs text-red"
                                            onClick={() => handleDelete(item)}
                                        >
                                            <FaTrash className="inline mr-1" /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Pie de tabla */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Detalles del cliente */}
                {user ? ( // Verifica si 'user' no es null
                    <div className='md:w-1/2 space-y-3'>
                        <h3 className='font-medium'>Customer Details</h3>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                        <p>User ID: {user._id}</p>
                    </div>
                ) : (
                    <p>Please log in to see your customer details.</p>
                )}
            </div>
        </div>
    );
};

export default CartPage;
