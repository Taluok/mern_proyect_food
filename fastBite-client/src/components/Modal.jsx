import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signUpWithGmail, login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    // Obtener la ubicación actual y redirigir al usuario a la página adecuada
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        login(email, password)
            .then((result) => {
                alert("Login successful");
                document.getElementById("my_modal_5").close();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                if (error.message.includes("auth/user-not-found")) {
                    setErrorMessage("User not found. Please check your email or sign up.");
                } else if (error.message.includes("auth/wrong-password")) {
                    setErrorMessage("Incorrect password. Please try again.");
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            });
    };

    // Iniciar sesión con Google
    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                alert("Login successful!");
                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
                <div className="modal-action flex flex-col justify-center mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                        <h3 className="font-bold text-lg">Please Login!</h3>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <p className="text-red text-xs italic">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red text-xs italic">{errors.password.message}</p>
                            )}
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* Error */}
                        {errorMessage && (
                            <p className="text-red text-xs italic">{errorMessage}</p>
                        )}

                        {/* Botón de Login */}
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                value="Login"
                                className="btn bg-green text-white"
                            />
                        </div>

                        <p className="text-center my-2">
                            Don't have an account?{" "}
                            <Link to="/signup" className="underline text-red ml-1">
                                Signup Now
                            </Link>{" "}
                        </p>

                        {/* Botón para cerrar el modal */}
                        <button
                            onClick={() => document.getElementById("my_modal_5").close()}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                    </form>

                    {/* Botones de inicio de sesión social */}
                    <div className="text-center space-x-3 mb-5">
                        <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
