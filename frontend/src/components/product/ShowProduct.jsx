import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <>
      <style jsx>{`
        .products-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
          text-align: center;
        }

        .product-card:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          transform: translateY(-3px);
        }

        .product-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin: 1rem auto 0;
          border: 2px solid #10b981;
        }

        .product-title {
          font-size: 1.2rem;
          color: #059669;
          font-weight: 600;
          margin: 1rem 0;
        }

        .product-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .btn-add-cart {
          background: #10b981;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-add-cart:hover {
          background: #059669;
        }

        .btn-price {
          background: #facc15;
          border: none;
          color: black;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-img {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>

      <div className="products-container">
        <div className="products-grid">
          {filteredData?.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="product-img"
                />
              </Link>
              <div className="product-title">{product.title}</div>
              <div className="product-actions">
                <button className="btn-price">{product.price} ₹</button>
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.title,
                      product.price,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
