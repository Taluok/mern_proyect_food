import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config"; 

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efecto para verificar el estado de autenticación
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe; // Limpia el suscriptor al desmontar el componente
    }, []);

    const value = {
        currentUser,
        // Puedes agregar más funciones aquí, como login, logout, etc.
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Renderiza los hijos solo si no está cargando */}
        </AuthContext.Provider>
    );
};