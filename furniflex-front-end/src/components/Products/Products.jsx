import { useState } from 'react';
import './Products.css'
import Product from './Product';
const Products = () => {
    const [isActive, setIsActive] = useState(1);

    const handleClick = (btnId) => {
        setIsActive(btnId);
    };
    return (
        <div className="products-container mt-3 mb-3">
            <div className="d-flex justify-content-between" style={{ gap: "15px" }}>
                <div className="col-4 col-md-2 d-flex flex-column product-btn-container">
                    <button onClick={() => handleClick(1)} className={`product-btn ${isActive == 1 ? 'prod-active-btn' : ''}`}>Rocking Chair</button>
                    <button onClick={() => handleClick(2)} className={`product-btn ${isActive == 2 ? 'prod-active-btn' : ''}`}>Side Chair</button>
                    <button onClick={() => handleClick(3)} className={`product-btn ${isActive == 3 ? 'prod-active-btn' : ''}`}>Loung Chair</button>
                </div>
                <div className='col-7 col-md-9'>
                    <Product />
                </div>
            </div>
        </div>
    );
};

export default Products;