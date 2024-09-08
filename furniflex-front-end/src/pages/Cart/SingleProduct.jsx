import { useApp } from "../../Context/AppContext";
/* eslint-disable react/prop-types */
const SingleProduct = ({ item, removeFromCart }) => {
    const { increaseQuantity, decreaseQuantity } = useApp();
    const handleRemove = () => {
        removeFromCart(item.id);
    }
    return (
        <div className="order-prod-container">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between" style={{ gap: "15px" }}>
                    <div className="quantity-controls">
                        <button className="decrease-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button className="increase-btn" onClick={() => increaseQuantity(item.id)}>+</button>
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
                    <button className="remove-btn" onClick={handleRemove}>X</button>
                </div>
            </div>
            <div>
                <h5 className="text-end" style={{ fontSize: "16px", fontWeight: "700", color: "#00" }}>$ {item.price * item.quantity}</h5>
                <hr />
            </div>
        </div>
    );
};

export default SingleProduct;