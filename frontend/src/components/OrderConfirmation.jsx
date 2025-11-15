import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("latestOrder", latestOrder);

  return (
    <>
      <style jsx>{`
        .order-confirmation-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .success-header {
          text-align: center;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .success-icon {
          font-size: 5rem;
          color: #10b981;
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-header h1 {
          color: #059669;
          font-size: 2rem;
          margin: 1rem 0 0.5rem 0;
          font-weight: 700;
        }

        .success-header h3 {
          color: #6b7280;
          font-size: 1.2rem;
          font-weight: 400;
        }

        .order-details-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin: 2rem auto;
          max-width: 1200px;
        }

        .order-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .order-section {
          padding: 2rem;
        }

        .order-section-header {
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

        .order-section-header h2 {
          color: #059669;
          font-size: 1.3rem;
          margin: 0;
          font-weight: 600;
        }

        .order-items-section {
          border-right: 2px solid #e5e7eb;
        }

        .order-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .order-info-list li {
          padding: 0.8rem 1rem;
          margin-bottom: 0.8rem;
          background: #f0fdf4;
          border-radius: 10px;
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          transition: all 0.3s ease;
        }

        .order-info-list li:hover {
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

        .payment-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: #10b981;
          color: white;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .payment-status-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 968px) {
          .order-grid {
            grid-template-columns: 1fr;
          }

          .order-items-section {
            border-right: none;
            border-bottom: 2px solid #e5e7eb;
          }

          .success-header h1 {
            font-size: 1.5rem;
          }

          .success-header h3 {
            font-size: 1rem;
          }

          .order-section {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="order-confirmation-container">
        <div className="success-header">
          <span className="material-symbols-outlined success-icon">
            check_circle
          </span>
          <h1>🎉 Your Order Has Been Confirmed!</h1>
          <h3>It will be delivered soon</h3>
        </div>

        <div className="container">
          <div className="order-details-card">
            <div className="order-grid">
              {/* Order Items Section */}
              <div className="order-section order-items-section">
                <div className="order-section-header">
                  <span className="material-symbols-outlined section-icon">
                    shopping_bag
                  </span>
                  <h2>Order Items</h2>
                </div>
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </div>

              {/* Order Details Section */}
              <div className="order-section">
                <div className="order-section-header">
                  <span className="material-symbols-outlined section-icon">
                    receipt_long
                  </span>
                  <h2>Order & Shipping Details</h2>
                </div>
                <ul className="order-info-list">
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      tag
                    </span>
                    <div className="info-content">
                      <div className="info-label">Order ID</div>
                      <div className="info-value">{latestOrder?.orderId}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      payment
                    </span>
                    <div className="info-content">
                      <div className="info-label">Payment ID</div>
                      <div className="info-value">{latestOrder?.paymentId}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      verified
                    </span>
                    <div className="info-content">
                      <div className="info-label">Payment Status</div>
                      <div className="payment-status">
                        <span className="material-symbols-outlined payment-status-icon">
                          check
                        </span>
                        {latestOrder?.payStatus}
                      </div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      person
                    </span>
                    <div className="info-content">
                      <div className="info-label">Name</div>
                      <div className="info-value">{latestOrder?.userShipping?.fullName}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      call
                    </span>
                    <div className="info-content">
                      <div className="info-label">Phone</div>
                      <div className="info-value">{latestOrder?.userShipping?.phoneNumber}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      public
                    </span>
                    <div className="info-content">
                      <div className="info-label">Country</div>
                      <div className="info-value">{latestOrder?.userShipping?.country}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      map
                    </span>
                    <div className="info-content">
                      <div className="info-label">State</div>
                      <div className="info-value">{latestOrder?.userShipping?.state}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      pin_drop
                    </span>
                    <div className="info-content">
                      <div className="info-label">PIN Code</div>
                      <div className="info-value">{latestOrder?.userShipping?.pincode}</div>
                    </div>
                  </li>
                  <li>
                    <span className="material-symbols-outlined info-icon">
                      home
                    </span>
                    <div className="info-content">
                      <div className="info-label">Address</div>
                      <div className="info-value">{latestOrder?.userShipping?.address}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;