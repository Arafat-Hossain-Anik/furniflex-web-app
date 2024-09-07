import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="overlay">
                <div className='d-flex align-items-center flex-column'>
                    <img src="/src/assets/favicon.png" alt="" style={{ height: "45px" }} />
                    <h4 className='logo-text'><span>Furni</span><span style={{ color: "#009ae0" }}>Flex</span></h4>
                </div>
                <div className='text-center'>
                    <p className='hero-text'>Discover a seamless shopping experience with our curated <br /> collection of products. From fashion to electronics, we bring quality.</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
