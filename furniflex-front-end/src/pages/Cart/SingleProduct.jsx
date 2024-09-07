import { useEffect, useState } from "react";
import { useApp } from "../../Context/AppContext";
/* eslint-disable react/prop-types */
const SingleProduct = ({ item }) => {
    console.log(item);
    const [quantity, setQuantity] = useState(item.quantity);

    const { updateCartItemQuantity } = useApp();


    useEffect(() => {
        updateCartItemQuantity(item.id, quantity);
    }, [quantity, item.id, updateCartItemQuantity]);


    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };


    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className="order-prod-container">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between" style={{ gap: "15px" }}>
                    <div className="quantity-controls">
                        <button className="decrease-btn" onClick={decreaseQuantity}>-</button>
                        <span className="quantity-display">{quantity}</span>
                        <button className="increase-btn" onClick={increaseQuantity}>+</button>
                    </div>
                    <div className='d-flex align-items-center' style={{ gap: "10px" }}>
                        <div className="d-flex justify-content-center align-items-center mt-3" style={{ width: "88px", height: "88px", backgroundColor: "#f2f2f2", borderRadius: "5px" }}>
                            <img src={item.image} className="card-img-top img-fluid" alt="..." style={{ borderRadius: "5px" }} />
                        </div>
                        <div>
                            <h5 style={{ fontSize: "16px", fontWeight: "700", color: "#434343" }}>{item.title}</h5>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="remove-btn" onClick={''}>X</button>
                </div>
            </div>
            <div>
                <h5 className="text-end" style={{ fontSize: "16px", fontWeight: "700", color: "#00" }}>$ {item.price * quantity}</h5>
                <hr />
            </div>
        </div>
    );
};

export default SingleProduct;