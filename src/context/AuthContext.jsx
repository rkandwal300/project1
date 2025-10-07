import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Hydrate from localStorage on client side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedAuth = localStorage.getItem('auth');
            if (savedAuth) {
                const { isLoggedIn: saved, user: savedUser } = JSON.parse(savedAuth);
                setIsLoggedIn(saved);
                setUser(savedUser);
            }
        }
    }, []);

    // Persist to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth', JSON.stringify({ isLoggedIn, user }));
        }
    }, [isLoggedIn, user]);

    const login = (userData = { name: 'John Doe', email: 'john@example.com' }) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}