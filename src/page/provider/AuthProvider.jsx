import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signIn = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();
            if (data.token) {
                setUser({ username });
                setLoading(false);
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setLoading(false);
        }
    };


    const authData = {
        signIn,
        loading,
        user
    };

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
