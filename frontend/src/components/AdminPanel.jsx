import React, { useState } from "react";
import AdminProductCard from "./AdminProductCard";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const initialProductState = {
    title: "",
    price: "",
    imgSrc: "",
    category: "",
  };
  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price && newProduct.imgSrc) {
      const productToAdd = { ...newProduct, _id: Date.now() };
      setProducts([...products, productToAdd]);
      setNewProduct(initialProductState);
    } else {
      alert("Please fill in title, price, and image URL.");
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <>
      <style jsx>{`
        .admin-panel-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 1rem;
        }

        .admin-panel-header {
          text-align: center;
          color: #059669;
          margin-bottom: 2rem;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .form-card h2 {
          color: #059669;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-input {
          width: 100%;
          padding: 0.6rem 1rem;
          margin-bottom: 1rem;
          border-radius: 10px;
          border: 1px solid #d1fae5;
          font-size: 1rem;
        }

        .add-btn {
          width: 100%;
          padding: 0.7rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: #059669;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          justify-items: center;
        }

        .no-products {
          text-align: center;
          color: #6b7280;
          margin-top: 2rem;
        }
      `}</style>

      <div className="admin-panel-container">
        <h1 className="admin-panel-header">Admin Panel</h1>

        {/* Form */}
        <form onSubmit={addProduct} className="form-card">
          <h2>Add New Product</h2>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={newProduct.price}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="imgSrc"
            placeholder="Image URL"
            value={newProduct.imgSrc}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="add-btn">
            Add Product
          </button>
        </form>

        {/* Products List */}
        <h2 className="admin-panel-header">Manage Products</h2>
        {products.length === 0 ? (
          <p className="no-products">
            No products added yet. Use the form above to add some!
          </p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <AdminProductCard
                key={product._id}
                product={product}
                onRemove={removeProduct}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
