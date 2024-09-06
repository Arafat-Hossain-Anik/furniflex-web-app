import { Outlet } from "react-router-dom";
import NavBar from "../../components/Header/NavBar";
import Footer from "../../components/Footer/Footer";
const Home = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;