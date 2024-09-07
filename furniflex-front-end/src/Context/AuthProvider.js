// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();


// // eslint-disable-next-line react/prop-types
// const AuthProvider = ({ children }) => {
//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(''); // Replace with your API endpoint

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 setProducts(data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [])
//     return (
//         <AuthContext.Provider value={{}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;