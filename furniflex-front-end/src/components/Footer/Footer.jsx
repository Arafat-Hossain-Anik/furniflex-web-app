import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => {
    return (
        <footer className='footer-section pt-5 pb-2' style={{ background: "#000" }}>
            <div className="container">
                <div className='d-flex justify-content-between flex-wrap'>
                    <div className='col-5'>
                        <img src='/white-logo.png' alt="footer-logo" style={{ height: "38px", width: "134px" }} />
                    </div>
                    <div className='d-flex col-7 justify-content-between flex-wrap'>
                        <div className='link-container'>
                            <h5 className='text-light'>About Us</h5>
                            <Link className="footer-link" href='/'>Master Plan</Link>
                            <Link className="footer-link" href='/'>Jobs</Link>
                            <Link className="footer-link" href='/'>Invest</Link>
                            <Link className="footer-link" href='/'>Pressroom</Link>
                            <Link className="footer-link" href='/'>Blog</Link>
                            <Link className="footer-link" href='/'>Contact</Link>
                        </div>
                        <div className='link-container'>
                            <h5 className='text-light'>Explore EEVE</h5>
                            <Link className="footer-link" href='/'>Unlock my Robot Power</Link>
                            <Link className="footer-link" href='/'>Starlight</Link>
                            <Link className="footer-link" href='/'>Robot Platform</Link>
                            <Link className="footer-link" href='/'>EEVE Roadmap</Link>
                        </div>
                        <div className='link-container'>
                            <h5 className='text-light'>Community & Support</h5>
                            <Link className="footer-link" href="/">Willow X Community</Link>
                            <Link className="footer-link" href="/">Developer & Maker Access</Link>
                            <Link className="footer-link" href="/">Special Cases</Link>
                        </div>
                    </div>
                </div>
                <div className="custom-divider"></div>;
                <div className="d-flex justify-content-between pb-3 flex-wrap">
                    <div>
                        <img style={{ height: "20px", width: "20" }} src="/brand-logo/facebook.jpg" alt="" />
                        <img style={{ height: "20px", width: "20" }} src="/brand-logo/instagram.jpg" alt="" />
                        <img style={{ height: "20px", width: "20" }} src="/brand-logo/linkedin.jpg" alt="" />
                        <img style={{ height: "20px", width: "20" }} src="/brand-logo/x.jpg" alt="" />
                    </div>
                    <div>
                        <Link className='footer-link link-margin' href="/">March22 Reacp</Link>
                        <Link className='footer-link link-margin' href="/">Privacy Policy</Link>
                        <Link className='footer-link link-margin' href="/">General Terms</Link>
                        <Link className='footer-link link-margin' href="/">Contact</Link>
                    </div>
                    <div className='d-flex align-items-center' style={{ color: "#81859f" }}>
                        <img className="h-8" src="/flag.png" alt="us-flag" style={{ height: "18px", marginRight: "3px" }} />
                        <span>United State (English)</span>
                    </div>
                </div>
                <div className='copyright text-center'>
                    <p>EEVE © {new Date().getFullYear()} - All right reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;