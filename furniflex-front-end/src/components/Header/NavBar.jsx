import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import './NavBar.css'
const NavBar = () => {
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
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/login"
                                        activeClassName="active">
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;