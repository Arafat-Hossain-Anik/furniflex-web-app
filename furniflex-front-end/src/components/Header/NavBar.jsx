import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import './NavBar.css'
import { useApp } from "../../Context/AppContext";
const NavBar = () => {
    const { cart, logout, user } = useApp()
    console.log(user);
    user.image = "/man-big.png"
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout(); // Call the logout function
        navigate("/signup"); // Redirect to the signup page
    };

    const isActive = location.pathname === "/";
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <img src="/src/assets/black-logo-.png" alt="" style={{ height: "38px", width: "134px" }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    exact
                                    activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/products"
                                    activeClassName="active">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/categories"
                                    activeClassName="active">
                                    Categories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/custom"
                                    activeClassName="active">
                                    Custom
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/blog"
                                    activeClassName="active">
                                    Blog
                                </NavLink>
                            </li>
                        </ul>
                        <div className="ms-auto d-flex">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/cart"
                                        activeClassName="active">
                                        <FaCartShopping style={{ fontSize: "18px" }} />
                                        {cart.length}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <div className="dropdown">
                                        <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={user.image} alt={user.firstName} style={{ width: "30px" }} />
                                        </button>
                                        <ul className="dropdown-menu text-center">
                                            <li>
                                                <img src={user.image} alt={user.firstName} style={{ width: "30px" }} />
                                            </li>
                                            <li style={{ fontWeight: "600", fontSize: "14px", paddingLeft: "5px" }}>{user.firstName} {user.lastName}</li>
                                            <li style={{ fontWeight: "600", fontSize: "14px", paddingLeft: "5px" }}>{user.email}</li>
                                            <li>
                                                <button
                                                    className={`nav-link text-center ${isActive ? 'dropdown-item' : ''}`}
                                                    onClick={handleLogout} style={{ background: "#c5eaf5", fontWeight: "600" }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
};

export default NavBar;