import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ShowOrderProduct from '../ShowOrderProduct';

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);
  
  return (
    <>
      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .profile-header {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem auto;
          max-width: 800px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .profile-icon {
          font-size: 5rem;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .profile-header h1 {
          color: #059669;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .profile-header h3 {
          color: #6b7280;
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .orders-summary {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-size: 1.3rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .orders-summary-icon {
          font-size: 2rem;
        }

        .orders-section-title {
          text-align: center;
          margin: 3rem 0 2rem 0;
        }

        .orders-section-title h2 {
          color: #059669;
          font-size: 1.8rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }

        .section-icon {
          font-size: 2.2rem;
          color: #10b981;
        }

        .order-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin: 2rem auto;
          max-width: 1200px;
          transition: all 0.3s ease;
        }

        .order-card:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
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

        .order-section-icon {
          font-size: 2rem;
          color: #10b981;
        }

        .order-section-header h3 {
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

        .no-orders {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-orders-icon {
          font-size: 5rem;
          color: #d1fae5;
          margin-bottom: 1rem;
        }

        .no-orders h3 {
          color: #6b7280;
          font-size: 1.3rem;
        }

        @media (max-width: 968px) {
          .order-grid {
            grid-template-columns: 1fr;
          }

          .order-items-section {
            border-right: none;
            border-bottom: 2px solid #e5e7eb;
          }

          .profile-header h1 {
            font-size: 1.5rem;
          }

          .profile-header h3 {
            font-size: 1rem;
          }

          .orders-summary {
            font-size: 1.1rem;
          }

          .order-section {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="profile-container">
        <div className="container">
          <div className="profile-header">
            <span className="material-symbols-outlined profile-icon">
              account_circle
            </span>
            <h1>Welcome, {user?.name}! 👋</h1>
            <h3>{user?.email}</h3>
            <div className="orders-summary">
              <span className="material-symbols-outlined orders-summary-icon">
                shopping_bags
              </span>
              Total Orders: {userOrder?.length || 10}
            </div>
          </div>

          {userOrder && userOrder.length > 0 ? (
            <>
              <div className="orders-section-title">
                <h2>
                  <span className="material-symbols-outlined section-icon">
                    history
                  </span>
                  Order History
                </h2>
              </div>

              {userOrder?.map((product) => (
                <div key={product._id} className="order-card">
                  <div className="order-grid">
                    {/* Order Items Section */}
                    <div className="order-section order-items-section">
                      <div className="order-section-header">
                        <span className="material-symbols-outlined order-section-icon">
                          shopping_bag
                        </span>
                        <h3>Order Items</h3>
                      </div>
                      <ShowOrderProduct items={product?.orderItems} />
                    </div>

                    {/* Order Details Section */}
                    <div className="order-section">
                      <div className="order-section-header">
                        <span className="material-symbols-outlined order-section-icon">
                          receipt_long
                        </span>
                        <h3>Order & Shipping Details</h3>
                      </div>
                      <ul className="order-info-list">
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            tag
                          </span>
                          <div className="info-content">
                            <div className="info-label">Order ID</div>
                            <div className="info-value">{product?.orderId}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            payment
                          </span>
                          <div className="info-content">
                            <div className="info-label">Payment ID</div>
                            <div className="info-value">{product?.paymentId}</div>
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
                              {product?.payStatus}
                            </div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            person
                          </span>
                          <div className="info-content">
                            <div className="info-label">Name</div>
                            <div className="info-value">{product?.userShipping?.fullName}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            call
                          </span>
                          <div className="info-content">
                            <div className="info-label">Phone</div>
                            <div className="info-value">{product?.userShipping?.phoneNumber}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            public
                          </span>
                          <div className="info-content">
                            <div className="info-label">Country</div>
                            <div className="info-value">{product?.userShipping?.country}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            map
                          </span>
                          <div className="info-content">
                            <div className="info-label">State</div>
                            <div className="info-value">{product?.userShipping?.state}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            pin_drop
                          </span>
                          <div className="info-content">
                            <div className="info-label">PIN Code</div>
                            <div className="info-value">{product?.userShipping?.pincode}</div>
                          </div>
                        </li>
                        <li>
                          <span className="material-symbols-outlined info-icon">
                            home
                          </span>
                          <div className="info-content">
                            <div className="info-label">Address</div>
                            <div className="info-value">{product?.userShipping?.address}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-orders">
              <span className="material-symbols-outlined no-orders-icon">
                inbox
              </span>
              <h3>No orders yet</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;