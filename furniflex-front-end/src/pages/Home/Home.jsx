import { Outlet } from "react-router-dom";
import NavBar from "../../components/Header/NavBar";
import Footer from "../../components/Footer/Footer";
const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Home;