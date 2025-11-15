import React, { useEffect, useState } from "react";

const ShowOrderProduct = ({ items }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

  return (
    <>
      <style jsx>{`
        .order-products-container {
          width: 100%;
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .product-item {
          display: grid;
          grid-template-columns: 80px 1fr auto auto;
          gap: 1rem;
          align-items: center;
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .product-item:hover {
          background: #d1fae5;
          transform: translateX(3px);
        }

        .product-img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          object-fit: cover;
          border: 2px solid #10b981;
        }

        .product-title {
          color: #059669;
          font-weight: 600;
          font-size: 1rem;
        }

        .product-price {
          color: #10b981;
          font-weight: 700;
          font-size: 1.1rem;
          min-width: 100px;
          text-align: right;
        }

        .product-qty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #059669;
          font-weight: 600;
          min-width: 80px;
          justify-content: center;
        }

        .qty-icon {
          font-size: 1rem;
          color: #10b981;
        }

        .total-section {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 1.5rem;
          border-radius: 12px;
          margin-top: 1rem;
        }

        .total-grid {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 1.5rem;
          align-items: center;
        }

        .total-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .total-icon {
          font-size: 1.8rem;
        }

        .total-value {
          background: white;
          color: #10b981;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .total-qty {
          background: white;
          color: #059669;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .value-icon {
          font-size: 1.3rem;
        }

        @media (max-width: 768px) {
          .product-item {
            grid-template-columns: 60px 1fr;
            gap: 0.8rem;
          }

          .product-price,
          .product-qty {
            grid-column: 2;
            justify-self: start;
          }

          .product-img {
            width: 60px;
            height: 60px;
          }

          .total-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .total-value,
          .total-qty {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="order-products-container">
        <div className="products-list">
          {items?.map((product) => (
            <div key={product._id} className="product-item">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="product-img"
              />
              <div className="product-title">{product.title}</div>
              <div className="product-price">₹{product.price.toLocaleString()}</div>
              <div className="product-qty">
                <span className="material-symbols-outlined qty-icon">
                  inventory_2
                </span>
                {product.qty}
              </div>
            </div>
          ))}
        </div>

        <div className="total-section">
          <div className="total-grid">
            <div className="total-label">
              <span className="material-symbols-outlined total-icon">
                receipt_long
              </span>
              Order Summary
            </div>
            <div className="total-value">
              <span className="material-symbols-outlined value-icon">
                payments
              </span>
              ₹{price.toLocaleString()}
            </div>
            <div className="total-qty">
              <span className="material-symbols-outlined value-icon">
                shopping_basket
              </span>
              {qty} Items
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowOrderProduct;