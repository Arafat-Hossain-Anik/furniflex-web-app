import { IoBagOutline } from "react-icons/io5";
const Product = () => {
    const description = "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
    const image = "https://raw.githubusercontent.com/GolamMuntakim/Akij-job-task/main/public/images/chair1.JPG";
    const price = 300;
    const prevPrice = 400;
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col d-flex justify-content-center">
                <div className="card d-flex flex-column justify-content-center align-items-center" style={{ height: "445px", width: "277px" }}>
                    <div className="d-flex justify-content-center align-items-center mt-3" style={{ width: "245px", height: "236px", backgroundColor: "#f2f2f2", borderRadius: "5px" }}>
                        <img src={image} className="card-img-top" alt="..." style={{ height: "205px", width: "205px", borderRadius: "5px" }} />
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Card title</h4>
                        <div className="d-flex justify-content-between" style={{ fontSize: "18px" }}>
                            <span style={{ fontWeight: "700", color: "#353535" }}>${price}</span>
                            <span style={{ fontWeight: "500", color: "#ABABAB" }}><strike>${prevPrice}</strike></span>
                            <span style={{ fontWeight: "600", color: "#B92E2E" }}>{((prevPrice - price) / prevPrice) * 100}% OFF</span>
                        </div>
                        <p className="card-text">{description.split(' ').slice(0, 10).join(' ') + '...'}</p>
                        <div>
                            <button className="add-card-btn d-flex justify-content-center align-items-center">
                                <IoBagOutline /> <span>&nbsp;&nbsp;&nbsp;Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;