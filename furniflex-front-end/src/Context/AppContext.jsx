import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
// adding firebase
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import axios from 'axios';
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
            const response = await signInWithPopup(auth, googleProvider)
            const { uid, email, displayName, photoURL } = response.user
            const userData = { uid, email, displayName, photoURL }
            console.log("google login user", userData);
            if (userData) {
                // await fetch('https://furniflex-backend-v1pz.onrender.com/google-login', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(userData),
                //     credentials: 'include',
                // });
                await axios.post('https://furniflex-backend-v1pz.onrender.com/google-login', userData, {
                    withCredentials: true
                })
                setUser(userData)
                toast.success('Login Successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (err) {
            setLoading(false)
            toast.warn('🦄 Google Login Failed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            toast.error(err?.message)
        }
    }
    //user watcher
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser)
    //         setLoading(false)
    //     })
    //     return () => { return unsubscribe() }
    // }, [])
    //***********************/
    //sign up
    const signup = async (userData) => {
        try {
            setLoading(true)
            const response = await axios.post('https://furniflex-backend-v1pz.onrender.com/signup', userData, {
                withCredentials: true
            })
            const data = await response.data;
            if (data) {
                toast.success('Registraion Success! Please Login!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            console.log(data);
            setError(null)
            setLoading(false)
        } catch (err) {
            toast.warn('🦄 Signup Failed. Try Again!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            console.log(err.message);
            setError(err.message);
            setLoading(false)
        }
    };
    // Simulate login
    const login = async (userData) => {
        try {
            setLoading(true)
            console.log(userData);
            const response = await axios.post('https://furniflex-backend-v1pz.onrender.com/login', userData, {
                withCredentials: true
            })
            console.log("login axios response", axios);
            const data = await response.data;
            console.log("login data", data);
            if (data) {
                setUser(data.user);
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
            setError(error)
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        const response = await axios.get('https://furniflex-backend-v1pz.onrender.com/logout', {
            withCredentials: true
        });
        console.log(response);
        if (!response.data.message) {
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
    // Restore user from cookies when the app initializes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://furniflex-backend-v1pz.onrender.com/verify-user', {
                    withCredentials: true,
                });
                const data = await response.data;
                console.log("data reload", data.user);
                if (data) {
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
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    // fetch product when user state is changed
    const fetchProducts = async () => {
        if (!user) return;
        try {
            setLoading(true)
            const response = await axios.get('https://furniflex-backend-v1pz.onrender.com/products', {
                withCredentials: true
            });
            if (!response.data) {
                setError('Network response was not ok')
                throw new Error('Network response was not ok');
            }
            const data = await response.data;
            console.log(data);
            setProducts(data);
            setError(null)
        } catch (error) {
            setError(error)
            console.error('Error fetching products:', error);
        }
        finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        console.log("fetch products", user);
        fetchProducts();
    }, [user]);
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
