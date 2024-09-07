import { useEffect, useState } from 'react';
import './Products.css'
import Product from './Product';
import { useApp } from '../../Context/AppContext';
const Products = () => {
    const { products } = useApp()
    const [showProducts, setShowProducts] = useState(products);
    const [isActive, setIsActive] = useState('rockingChair');
    const handleClick = (chairName) => {
        setIsActive(chairName);
    };
    useEffect(() => {
        const filteredProducts = products.filter(
            (product) => product.category === isActive
        );
        setShowProducts(filteredProducts);
    }, [isActive, products]);
    return (
        <div className="products-container mt-3 mb-3">
            <div className="d-flex justify-content-between" style={{ gap: "15px" }}>
                <div className="col-4 col-md-2 d-flex flex-column product-btn-container">
                    <button onClick={() => handleClick('rockingChair')} className={`product-btn ${isActive == 'rockingChair' ? 'prod-active-btn' : ''}`}>Rocking Chair</button>
                    <button onClick={() => handleClick('sideChair')} className={`product-btn ${isActive == 'sideChair' ? 'prod-active-btn' : ''}`}>Side Chair</button>
                    <button onClick={() => handleClick('loungeChair')} className={`product-btn ${isActive == 'loungeChair' ? 'prod-active-btn' : ''}`}>Loung Chair</button>
                </div>
                <div className='col-7 col-md-9'>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {
                            showProducts.map((product) => <Product key={product.id} product={product} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;