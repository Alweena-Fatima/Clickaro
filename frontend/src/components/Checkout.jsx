import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (cart?.items) {
      cart.items.forEach((item) => {
        qty += item.qty;
        price += item.price;
      });
    }

    setQty(qty);
    setPrice(price);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const checkoutRes = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      console.log("Checkout Response:", checkoutRes.data);

      if (!checkoutRes.data.success) {
        alert("Failed to create order!");
        return;
      }

      const order = checkoutRes.data.order;

      const verifyRes = await axios.post(`${url}/payment/verify`, {
        orderId: order.orderId,
        amount: order.amount,
        orderItems: order.cartItems,
        userId: order.userId,
        userShipping: order.userShipping,
      });

      console.log("Verify Response:", verifyRes.data);

      if (verifyRes.data.success) {
        clearCart();
        navigate("/oderconfirmation");
      } else {
        alert("Order failed to save!");
      }
    } catch (error) {
      console.log("Order Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <style jsx>{`
        .checkout-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .checkout-header {
          text-align: center;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .checkout-header h1 {
          color: #059669;
          font-size: 2.5rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          font-size: 3rem;
          color: #10b981;
        }

        .checkout-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin: 2rem auto;
          max-width: 1200px;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .checkout-section {
          padding: 2rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #d1fae5;
        }

        .section-icon {
          font-size: 2rem;
          color: #10b981;
        }

        .section-header h2 {
          color: #059669;
          font-size: 1.3rem;
          margin: 0;
          font-weight: 600;
        }

        .product-section {
          border-right: 2px solid #e5e7eb;
        }

        .shipping-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .shipping-info-list li {
          padding: 0.8rem 1rem;
          margin-bottom: 0.8rem;
          background: #f0fdf4;
          border-radius: 10px;
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          transition: all 0.3s ease;
        }

        .shipping-info-list li:hover {
          background: #d1fae5;
          transform: translateX(5px);
        }

        .info-icon {
          font-size: 1.3rem;
          color: #10b981;
          margin-top: 0.1rem;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-weight: 600;
          color: #059669;
          margin-bottom: 0.2rem;
          font-size: 0.9rem;
        }

        .info-value {
          color: #374151;
          font-size: 1rem;
        }

        .payment-section {
          text-align: center;
          padding: 2rem;
          margin-top: 2rem;
        }

        .payment-summary {
          background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: inline-block;
          min-width: 400px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 2px solid #10b981;
        }

        .summary-row:last-child {
          border-bottom: none;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 3px solid #10b981;
        }

        .summary-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .summary-value {
          color: #10b981;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .total-label {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .total-value {
          font-size: 1.8rem;
        }

        .btn-pay {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-pay:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
        }

        .btn-pay:active {
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 2rem;
        }

        @media (max-width: 968px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .product-section {
            border-right: none;
            border-bottom: 2px solid #e5e7eb;
          }

          .checkout-header h1 {
            font-size: 1.8rem;
          }

          .payment-summary {
            min-width: auto;
            width: 100%;
          }

          .btn-pay {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="checkout-container">
        <div className="checkout-header">
          <h1>
            <span className="material-symbols-outlined header-icon">
              shopping_cart_checkout
            </span>
            Order Summary
          </h1>
        </div>

        <div className="container">
          <div className="checkout-card">
            <div className="checkout-grid">
              {/* Product Details Section */}
              <div className="checkout-section product-section">
                <div className="section-header">
                  <span className="material-symbols-outlined section-icon">
                    shopping_bag
                  </span>
                  <h2>Product Details</h2>
                </div>
                <TableProduct cart={cart} />
              </div>

              {/* Shipping Address Section */}
              <div className="checkout-section">
                <div className="section-header">
                  <span className="material-symbols-outlined section-icon">
                    local_shipping
                  </span>
                  <h2>Shipping Address</h2>
                </div>
                <ul className="shipping-info-list">
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      person
                    </span>
                    <div className="info-content">
                      <div className="info-label">Full Name</div>
                      <div className="info-value">{userAddress?.fullName}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      call
                    </span>
                    <div className="info-content">
                      <div className="info-label">Phone Number</div>
                      <div className="info-value">{userAddress?.phoneNumber}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      public
                    </span>
                    <div className="info-content">
                      <div className="info-label">Country</div>
                      <div className="info-value">{userAddress?.country}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      map
                    </span>
                    <div className="info-content">
                      <div className="info-label">State</div>
                      <div className="info-value">{userAddress?.state}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      pin_drop
                    </span>
                    <div className="info-content">
                      <div className="info-label">PIN Code</div>
                      <div className="info-value">{userAddress?.pincode}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      home
                    </span>
                    <div className="info-content">
                      <div className="info-label">Address</div>
                      <div className="info-value">{userAddress?.address}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <div className="payment-summary">
              <div className="summary-row">
                <div className="summary-label">
                  <span className="material-symbols-outlined">inventory_2</span>
                  Total Items
                </div>
                <div className="summary-value">{qty}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label total-label">
                  <span className="material-symbols-outlined">payments</span>
                  Total Amount
                </div>
                <div className="summary-value total-value">₹{price.toLocaleString()}</div>
              </div>
            </div>

            <button className="btn-pay" onClick={handlePayment}>
              <span className="material-symbols-outlined btn-icon">
                credit_card
              </span>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;