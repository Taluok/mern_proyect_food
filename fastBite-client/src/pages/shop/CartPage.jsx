import React, { useContext } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

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
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-ghost btn-xs text-red" 
                                            onClick={() => handleDelete(item)}
                                        >
                                            Remove
                                        </button>
                                        <FaTrash />
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
                    // Mensaje si no hay usuario autenticado
                    <p>Please log in to see your customer details.</p>
                )}
            </div>
        </div>
    );
}

export default CartPage;