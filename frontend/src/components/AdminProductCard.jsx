import React from 'react';

// Added 'onEdit' prop
const AdminProductCard = ({ product, onRemove, onEdit }) => {
  
  return (
    <>
      <style jsx>{`
        /* ... Keep your existing styles here ... */
        .admin-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-width: 280px;
          transition: all 0.3s ease;
          margin: 1rem;
        }

        .admin-card:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          transform: translateY(-3px);
        }

        .admin-card-image {
          width: 100%;
          height: 180px;
          object-fit: contain;
          background: #f0fdf4;
          padding: 1.5rem;
        }

        .admin-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .admin-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 0.5rem;
          min-height: 2.4rem;
        }

        .admin-card-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
        }

        .admin-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
        }

        .btn {
          flex: 1;
          padding: 0.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          border: none;
        }

        .btn-edit {
          background: #f59e0b;
          color: white;
        }

        .btn-edit:hover {
          background: #d97706;
        }

        .btn-remove {
          background: #ef4444;
          color: white;
        }

        .btn-remove:hover {
          background: #dc2626;
        }
      `}</style>

      <div className="admin-card">
        <img
          src={product.imgSrc}
          alt={product.title}
          className="admin-card-image"
          onError={(e) => { e.target.src = "https://via.placeholder.com/220"; }}
        />
        <div className="admin-card-body">
          <h5 className="admin-card-title">{product.title}</h5>
          <p className="admin-card-price">{product.price} ₹</p>
          <div className="admin-buttons">
            {/* Call onEdit with the specific product data */}
            <button className="btn btn-edit" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-remove" onClick={() => onRemove(product._id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;