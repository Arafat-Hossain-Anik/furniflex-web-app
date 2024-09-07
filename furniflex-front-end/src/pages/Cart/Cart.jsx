// import { useState } from 'react';
import { useApp } from '../../Context/AppContext';
import './Cart.css'
import SingleProduct from './SingleProduct';

const Cart = () => {
    const { cart } = useApp();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div className="d-flex justify-content-between" style={{ gap: "20px" }}>
            <div className='col-12 col-md-8'>
                <h2>An Overview of your order</h2>
                {
                    cart.map((item, index) => <SingleProduct item={item} key={index} />)
                }
            </div>
            <div className='col-12 col-md-4'>
                <h2>Order Details</h2>
                <div className='order-details-container mb-3'>
                    <div className='mb-2 d-flex justify-content-between' style={{ fontSize: "20px", color: "#656565" }}><span>Subtotal</span><span>${totalPrice}</span></div>
                    <div className='mb-2 d-flex justify-content-between' style={{ fontSize: "20px", color: "#656565" }}><span>Shipping</span><span>Free</span></div>
                    <div className='mb-2 d-flex justify-content-between' style={{ fontSize: "20px", color: "#656565" }}><span>Estimated Tax</span><span>$-</span></div>
                    <hr />
                    <div className='d-flex justify-content-between' style={{ fontSize: "24px", color: "#0e0e0e" }}><span>Total</span><span>$ {totalPrice}</span></div>
                </div>
                <button className='product-btn prod-active-btn'>GO TO CHECKOUT</button>
            </div>
        </div>
    );
};

export default Cart;