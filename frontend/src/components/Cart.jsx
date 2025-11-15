import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
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
        .cart-container {
          min-height: 80vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .empty-cart-icon {
          font-size: 6rem;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .empty-cart h2 {
          color: #059669;
          margin-bottom: 1rem;
        }

        .empty-cart p {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .cart-summary {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .summary-card {
          background: white;
          padding: 1rem 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.2);
        }

        .summary-icon {
          font-size: 2rem;
          color: #10b981;
        }

        .summary-content h3 {
          margin: 0;
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        .summary-content p {
          margin: 0;
          font-size: 1.5rem;
          color: #059669;
          font-weight: 700;
        }

        .cart-item {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          margin: 1rem auto;
          max-width: 1000px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .cart-item:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }

        .cart-item-content {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2rem;
          align-items: center;
        }

        .cart_img img {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          object-fit: cover;
          border: 3px solid #d1fae5;
        }

        .cart_des {
          text-align: left;
          min-width: 250px;
        }

        .cart_des h2 {
          color: #059669;
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        .cart_des h4 {
          color: #6b7280;
          font-size: 1rem;
          margin: 0.5rem 0;
        }

        .price-tag {
          color: #10b981;
          font-weight: 700;
          font-size: 1.4rem;
        }

        .qty-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #d1fae5;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          color: #059669;
          font-weight: 600;
        }

        .cart_action {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          min-width: 180px;
        }

        .qty-controls {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.7rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .btn .material-symbols-outlined {
          font-size: 1.2rem;
        }

        .btn-success {
          background: #10b981;
          color: white;
        }

        .btn-success:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-light-green {
          background: #d1fae5;
          color: #059669;
        }

        .btn-light-green:hover {
          background: #a7f3d0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-warning {
          background: #fbbf24;
          color: white;
        }

        .btn-warning:hover {
          background: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
        }

        .btn-danger {
          background: #ef4444;
          color: white;
        }

        .btn-danger:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .cart-footer {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .cart-item-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }

          .cart_img {
            display: flex;
            justify-content: center;
          }

          .cart_des {
            text-align: center;
            min-width: auto;
          }

          .cart_action {
            width: 100%;
            min-width: auto;
          }

          .qty-controls {
            justify-content: center;
          }

          .summary-card {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
      <div className="cart-container">
        {cart?.items?.length == 0 ? (
          <div className="empty-cart">
            <span className="material-symbols-outlined empty-cart-icon">
              shopping_cart
            </span>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button
              className="btn btn-success"
              onClick={() => navigate("/")}
            >
              <span className="material-symbols-outlined">storefront</span>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <div className="summary-card">
                <span className="material-symbols-outlined summary-icon">
                  inventory_2
                </span>
                <div className="summary-content">
                  <h3>Total Items</h3>
                  <p>{qty}</p>
                </div>
              </div>
              <div className="summary-card">
                <span className="material-symbols-outlined summary-icon">
                  payments
                </span>
                <div className="summary-content">
                  <h3>Total Amount</h3>
                  <p>₹{price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="container">
              {cart?.items?.map((product) => (
                <div key={product._id} className="cart-item">
                  <div className="cart-item-content">
                    <div className="cart_img">
                      <img src={product.imgSrc} alt={product.title} />
                    </div>
                    <div className="cart_des">
                      <h2>{product.title}</h2>
                      <h4 className="price-tag">₹{product.price.toLocaleString()}</h4>
                      <h4>
                        <span className="qty-badge">
                          <span className="material-symbols-outlined" style={{fontSize: '1rem'}}>
                            shopping_basket
                          </span>
                          Qty: {product.qty}
                        </span>
                      </h4>
                    </div>
                    <div className="cart_action">
                      <div className="qty-controls">
                        <button
                          className="btn btn-light-green"
                          onClick={() => decreaseQty(product?.productId, 1)}
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            addToCart(
                              product?.productId,
                              product.title,
                              product.price / product.qty,
                              1,
                              product.imgSrc
                            )
                          }
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                      <button
                        className="btn btn-danger"
                        style={{width: '100%'}}
                        onClick={() => {
                          if (confirm("Are you sure, want remove from cart")) {
                            removeFromCart(product?.productId);
                          }
                        }}
                      >
                        <span className="material-symbols-outlined">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <button
                className="btn btn-success"
                onClick={() => navigate("/shipping")}
              >
                <span className="material-symbols-outlined">local_shipping</span>
                Proceed to Checkout
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (confirm("Are you sure, want clear cart ...?")) {
                    clearCart();
                  }
                }}
              >
                <span className="material-symbols-outlined">delete_sweep</span>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;