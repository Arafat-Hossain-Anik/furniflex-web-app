import Hero from '../../components/Hero-Section/Hero';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../Context/AppContext';
const SingUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useApp();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await login(data);
        navigate('/')
    }
    return (
        <div className="signup-container">
            <Link to='/'>home</Link>
            <div className='d-flex justify-content-center flex-wrap'>
                <div className='col-12 col-md-6 signup-form-container'>
                    <div className='form-content'>
                        <div className='text-start'>
                            <h2 style={{ fontSize: "32px", fontWeight: "500" }}>Welcome Back!</h2>
                            <p style={{ fontSize: "16px", color: "#707070", fontWeight: "500" }}>Enter your Credentials to access your account</p>
                        </div>
                        <div>
                            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" {...register("email", { required: true })} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                    <span
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div className="form-check mt-3" style={{ textAlign: "left" }}>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked />
                                    <label className="form-check-label" htmlFor="flexCheckChecked" style={{ fontWeight: "500", fontSize: "14px", color: "#000" }}>
                                        I agree to the <Link href="">Terms & Policy</Link>
                                    </label>
                                </div>
                                <input type="submit" className='sign-up-btn mb-3 mt-3' value="Sign In" />
                            </form>
                        </div>
                        <div className='d-flex align-items-baseline'>
                            <div className='custom-divider'></div>
                            <span style={{ fontWeight: "500" }}>or</span>
                            <div className="custom-divider"></div>
                        </div>
                        <div className='d-flex pb-3 flex-wrap' style={{ gap: "10px" }}>
                            <button className="btn-brand btn-google">
                                <FaGoogle className="icon" /> Sign in with Google
                            </button>
                            <button className="btn-brand btn-apple">
                                <FaApple className="icon" /> Sign in with Apple
                            </button>
                        </div>
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "14px" }}>Have an account <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <Hero />
                </div>
            </div>
        </div>
    );
};

export default SingUp;