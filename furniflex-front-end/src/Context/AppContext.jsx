import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
// adding firebase
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null)
    //************ */ google sign in***********
    const signInWithGoogle = async () => {
        try {
            setLoading(true)
            const { email, displayName, photoURL } = await signInWithPopup(auth, googleProvider)
            const userData = { email, displayName, photoURL }
            if (userData) {
                await fetch('http://localhost:5000/google-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                    credentials: 'include',
                });
                toast.success('Log in succesfully')
            }
        } catch (err) {
            setLoading(false)
            toast.error(err?.message)
        }
    }
    //user watcher
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => { return unsubscribe() }
    }, [])
    //***********************/
    //sign up
    const signup = async (userInfo) => {
        try {
            console.log("from context", userInfo);
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
                credentials: 'include',
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message)
                throw new Error(data.message || 'Signup failed');
            }
            console.log(data);
            setError(null)
            // Store user data in context (e.g., token, user info)
            // setUser(data.user);
            // setError(null); // Clear any previous errors
        } catch (err) {
            console.log(err.message);
            setError(err.message);
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
                setError(null)
                toast.success('🦄 Login Successful', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                toast.warn('🦄 Login Failed', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                setError(data.message)
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            setError(error)
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
            setError('Network response was not ok')
            throw new Error('Network response was not ok');
        }
        setUser(null);
        setProducts([]);
        setError(null)
        // google signout
        if (user.displayName) {
            signOut(auth)
        }
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
                    setError('Network response was not ok')
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
                setError(null)
            } catch (error) {
                setError(error)
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
                console.log("data reload", data.user);
                if (response.ok) {
                    setUser(data.user);
                    setError(null)
                } else {
                    setError('User not authenticated')
                    console.error('User not authenticated');
                }
            } catch (error) {
                setError(error)
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
        <AppContext.Provider value={{ user, error, login, setCart, logout, signup, loading, products, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, signInWithGoogle }}>
            {children}
        </AppContext.Provider>
    );
};
