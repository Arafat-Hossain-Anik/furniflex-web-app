// src/contexts/AppContext.js
import { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // Simulate login
    const login = async (email, password) => {
        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user); // Set user data from API response
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setProducts([]); // Clear products when logging out
    };

    const fetchProducts = async () => {
        // if (!user) return; // Don't fetch if user is not logged in

        try {
            // const response = await fetch('http://localhost:5000/products', {
            //     headers: {
            //         Authorization: `bearer ${user.token}`, // Include the user token for authentication
            //     },
            // });
            const response = await fetch('http://localhost:5000/products')

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products whenever user state changes
    }, [user]);

    // const addToCart = (product) => {
    //     setCart((prevCart) => [...prevCart, product]);
    // };
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    // Function to update product quantity in the cart
    const updateCartItemQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <AppContext.Provider value={{ user, login, logout, updateCartItemQuantity, loading, products, cart, addToCart, removeFromCart }}>
            {children}
        </AppContext.Provider>
    );
};
