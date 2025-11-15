import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      <style jsx>{`
        .table-product-container {
          width: 100%;
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .product-card {
          display: grid;
          grid-template-columns: 80px 2fr 1fr 1fr auto;
          gap: 1rem;
          align-items: center;
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          background: #d1fae5;
          transform: translateX(3px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
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
          width: fit-content;
        }

        .qty-icon {
          font-size: 1rem;
          color: #10b981;
        }

        .product-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .action-btn {
          background: white;
          border: 2px solid #10b981;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: #10b981;
          transform: scale(1.1);
        }

        .action-btn .material-symbols-outlined {
          font-size: 1.3rem;
          color: #10b981;
          transition: color 0.3s ease;
        }

        .action-btn:hover .material-symbols-outlined {
          color: white;
        }

        .action-btn.remove-btn {
          border-color: #ef4444;
        }

        .action-btn.remove-btn .material-symbols-outlined {
          color: #ef4444;
        }

        .action-btn.remove-btn:hover {
          background: #ef4444;
        }

        .action-btn.remove-btn:hover .material-symbols-outlined {
          color: white;
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

        @media (max-width: 968px) {
          .product-card {
            grid-template-columns: 60px 1fr;
            gap: 0.8rem;
          }

          .product-title,
          .product-price,
          .product-qty,
          .product-actions {
            grid-column: 2;
          }

          .product-img {
            grid-row: 1 / 5;
          }

          .product-actions {
            justify-self: start;
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

      <div className="table-product-container">
        <div className="products-list">
          {cart?.items?.map((product) => (
            <div key={product._id} className="product-card">
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
              <div className="product-actions">
                <div
                  className="action-btn"
                  onClick={() => decreaseQty(product?.productId, 1)}
                  title="Decrease quantity"
                >
                  <span className="material-symbols-outlined">remove</span>
                </div>
                <div
                  className="action-btn"
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                  title="Increase quantity"
                >
                  <span className="material-symbols-outlined">add</span>
                </div>
                <div
                  className="action-btn remove-btn"
                  onClick={() => {
                    if (confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                  title="Remove from cart"
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>
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
              Cart Summary
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

export default TableProduct;