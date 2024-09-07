import { useState } from "react";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const image = "https://raw.githubusercontent.com/GolamMuntakim/Akij-job-task/main/public/images/chair1.JPG";
    const price = 300;
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
                            <img src={image} className="card-img-top img-fluid" alt="..." style={{ borderRadius: "5px" }} />
                        </div>
                        <div>
                            <h5 style={{ fontSize: "16px", fontWeight: "700", color: "#434343" }}>Product Name</h5>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="remove-btn" onClick={''}>X</button>
                </div>
            </div>
            <div>
                <h5 className="text-end" style={{ fontSize: "16px", fontWeight: "700", color: "#00" }}>$ {price * quantity}</h5>
                <hr />
            </div>
        </div>
    );
};

export default SingleProduct;