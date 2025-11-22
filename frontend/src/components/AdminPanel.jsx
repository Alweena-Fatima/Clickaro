import React, { useEffect, useState, useContext } from "react";
import AdminProductCard from "./AdminProductCard";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../context/AppContext"; // Importing your context for the URL

const AdminPanel = () => {
  const { url, token } = useContext(AppContext); // Get URL and Token from Context
  const [products, setProducts] = useState([]);
  
  // State to track if we are editing (stores the ID of product being edited)
  const [editingId, setEditingId] = useState(null);

  const initialProductState = {
    title: "",
    description: "", // Added because your Schema requires it
    price: "",
    imgSrc: "",
    category: "",
    qty: "", // Added because your Schema requires it
  };

  const [formData, setFormData] = useState(initialProductState);

  // 1. Fetch Products from Backend
  const fetchProducts = async () => {
    try {
      const api = await axios.get(`${url}/product/all`);
      setProducts(api.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [url]); // Re-run if URL changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. Handle Form Submit (Add OR Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // --- UPDATE MODE ---
        const api = await axios.put(
          `${url}/product/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              // Auth: token, // Uncomment if you want to protect this route later
            },
          }
        );
        toast.success(api.data.message, { theme: "dark", transition: Bounce });
        setEditingId(null); // Reset edit mode
      } else {
        // --- ADD MODE ---
        const api = await axios.post(
          `${url}/product/add`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              // Auth: token,
            },
          }
        );
        toast.success(api.data.message, { theme: "dark", transition: Bounce });
      }

      // Reset Form and Refresh List
      setFormData(initialProductState);
      fetchProducts();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // 3. Handle Delete
  const removeProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const api = await axios.delete(`${url}/product/${id}`, {
            headers: {
                // Auth: token
            }
        });
        toast.success(api.data.message, { theme: "dark", transition: Bounce });
        fetchProducts(); // Refresh list
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  // 4. Handle Edit Click (Populate Form)
  const editHandler = (product) => {
    setEditingId(product._id); // Set the ID so we know we are updating
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      imgSrc: product.imgSrc,
      category: product.category,
      qty: product.qty,
    });
    // Optional: Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        /* Style for update button to look different */
        .update-btn {
           background: #f59e0b;
        }
        .update-btn:hover {
           background: #d97706;
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

      <ToastContainer />

      <div className="admin-panel-container">
        <h1 className="admin-panel-header">Admin Panel</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-card">
          <h2>{editingId ? "Update Product" : "Add New Product"}</h2>
          
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          {/* Added Description Input */}
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          <input
            type="text"
            name="imgSrc"
            placeholder="Image URL"
            value={formData.imgSrc}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          {/* Added Quantity Input */}
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button 
            type="submit" 
            className={`add-btn ${editingId ? 'update-btn' : ''}`}
          >
            {editingId ? "Update Product" : "Add Product"}
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
                onEdit={editHandler} // Passing the edit handler
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;