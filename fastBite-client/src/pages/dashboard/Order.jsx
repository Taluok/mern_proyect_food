import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom'; 
import { FaTrash } from 'react-icons/fa'; 
import useAuth from '../../hooks/useAuth';

const Order = () => {
    const { user } = useAuth(); 
    const token = localStorage.getItem('access-token');

    // Obtener las órdenes del usuario con React Query
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://localhost:6001/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.json();
        }
    });

    
    const cart = orders; 
    const calculateTotalPrice = (item) => item.quantity * item.price; // Función para calcular precio total
    const orderTotal = cart.reduce((total, item) => total + calculateTotalPrice(item), 0); // Total del carrito

    // Manejo de aumento y disminución de cantidad (a definir según tu lógica)
    const handleDecrease = (item) => { /* Lógica para disminuir */ };
    const handleIncrease = (item) => { /* Lógica para aumentar */ };
    const handleDelete = (item) => { /* Lógica para eliminar */ };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            {/* Banner */}
            <div className='bg-gradient-to-r from-0% from-[#fafafa] to-[#fcfcfc] to-100%'>
                <div className='py-28 flex flex-col items-center justify-center'>
                    {/* Content */}
                    <div className='text-center px-4 space-y-7'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Track All <span className='text-orange'>Orders!</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Tabla de pedidos */}
            {cart.length > 0 ? (
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Encabezado */}
                            <thead className="bg-green text-white rounded-sm">
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
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Food Item"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-medium">{item.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-xs"
                                                onClick={() => handleDecrease(item)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={() => console.log(item.quantity)}
                                                className="w-10 mx-2 text-center overflow-hidden appearance-none"
                                            />
                                            <button
                                                className="btn btn-xs"
                                                onClick={() => handleIncrease(item)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>${calculateTotalPrice(item).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm border-none text-red bg-transparent"
                                                onClick={() => handleDelete(item)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
                        <div className="md:w-1/2 space-y-3">
                            <h3 className="text-lg font-semibold">Customer Details</h3>
                            <p>Name: {user?.displayName || "None"}</p>
                            <p>Email: {user?.email}</p>
                            <p>User_id: <span className="text-sm">{user?.uid}</span></p>
                        </div>
                        <div className="md:w-1/2 space-y-3">
                            <h3 className="text-lg font-semibold">Shopping Details</h3>
                            <p>Total Items: {cart.length}</p>
                            <p>Total Price: <span id="total-price">${orderTotal.toFixed(2)}</span></p>
                            <Link to='/process-checkout'>
                                <button className="btn btn-md bg-green text-white px-8 py-1 mt-5">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p>Cart is empty. Please add products.</p>
                    <Link to="/menu">
                        <button className="btn bg-green text-white mt-3">Back to Menu</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Order;
