import './SignUp.css'
import Hero from '../../components/Hero-Section/Hero';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../Context/AppContext';
import { toast } from 'react-toastify';
const SingUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useApp();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        await signup(data)
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
        console.log(data);
        reset();
    }
    return (
        <div className="signup-container">
            <div className='d-flex justify-content-center flex-wrap'>
                <div className='col-12 col-md-6 signup-form-container'>
                    <div className='form-content'>
                        <div className='text-center'>
                            <h2 style={{ fontSize: "24px" }}>Welcome To</h2>
                            <h1 className='logo-text'><span style={{ color: "#000" }}>Furni</span><span style={{ color: "#009ae0" }}>Flex</span></h1>
                            <p style={{ fontSize: "16px", color: "#707070" }}>Signup for purchase your desire products</p>
                        </div>
                        <div>
                            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
                                <div className='d-flex mb-3' style={{ gap: '10px' }}>
                                    <div className="form-floating" style={{ flex: 1 }}>
                                        <input type="text" className="form-control" id="floatingInput" placeholder="John" {...register("firstName", { required: true })} />
                                        <label htmlFor="floatingInput">First name</label>
                                    </div>
                                    <div className="form-floating" style={{ flex: 1 }}>
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Doe" {...register("lastName", { required: true })} />
                                        <label htmlFor="floatingInput">Last name</label>
                                    </div>
                                </div>
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
                                <input type="submit" className='sign-up-btn mb-3 mt-3' value="Sign Up" />
                            </form>
                        </div>
                        <div className='d-flex align-items-baseline'>
                            <div className='custom-divider'></div>
                            <span style={{ fontWeight: "500" }}>or</span>
                            <div className="custom-divider"></div>
                        </div>
                        <div className='d-flex flex-wrap' style={{ gap: "10px" }}>
                            <button className="btn-brand btn-google">
                                <img src="/google-logo.png" alt="Google logo" style={{ width: "25px" }} />&nbsp;&nbsp; Sign in with Google
                            </button>
                            <button className="btn-brand btn-apple">
                                <FaApple className="icon" /> Sign in with Apple
                            </button>
                        </div>
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "14px" }}>Have an account <Link to="/login">Sign In</Link></p>
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