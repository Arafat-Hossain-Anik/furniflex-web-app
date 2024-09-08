import { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    //sign up
    const signup = async (userInfo) => {
        try {
            console.log("from context", userInfo);
            const response = await fetch('http://localhost:5000/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
                credentials: 'include',
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            console.log(data);
            // Store user data in context (e.g., token, user info)
            // setUser(data.user);
            // setError(null); // Clear any previous errors
        } catch (err) {
            console.log(err.message);
            // setError(err.message);
        }
    };
    // Simulate login
    const login = async (userData) => {
        try {
            setLoading(true)
            console.log(userData);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
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

    const logout = async () => {
        const response = await fetch('http://localhost:5000/logout', {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setUser(null);
        setProducts([]);
    };
    // fetch product when user state is changed
    useEffect(() => {
        console.log("fetch products", user);
        const fetchProducts = async () => {
            if (!user) return; // Don't fetch if user is not logged in

            try {
                const response = await fetch('http://localhost:5000/products', {
                    credentials: 'include'
                });
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
        fetchProducts();
    }, [user]);

    // Restore user from cookies when the app initializes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/verify-user', {
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    console.error('User not authenticated');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false); // Set loading to false once the check is complete
            }
        };

        fetchUser();
    }, []); // Run only once when the app loads
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
    const increaseQuantity = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCart(cart.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        console.log(cart);
    };

    return (
        <AppContext.Provider value={{ user, login, setCart, logout, signup, loading, products, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </AppContext.Provider>
    );
};
