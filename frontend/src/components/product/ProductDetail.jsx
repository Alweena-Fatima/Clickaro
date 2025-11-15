import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "http://localhost:5173/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <style jsx>{`
        .product-detail-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 3rem 0;
        }

        .product-card {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 1000px;
          margin: 2rem auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .product-card:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          transform: translateY(-3px);
        }

        .product-image {
          width: 250px;
          height: 250px;
          border-radius: 15px;
          border: 2px solid #10b981;
          object-fit: cover;
        }

        .product-info {
          flex: 1;
          max-width: 500px;
          text-align: left;
        }

        .product-info h1 {
          color: #059669;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .product-info p {
          color: #374151;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .product-price {
          color: #10b981;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .product-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-buy {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-buy:hover {
          background: #059669;
        }

        .btn-cart {
          background: #facc15;
          border: none;
          color: black;
          padding: 0.5rem 1.5rem;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-cart:hover {
          background: #eab308;
        }

        @media (max-width: 768px) {
          .product-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .product-info {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="product-detail-container">
        <div className="product-card">
          <div className="product-image-wrapper">
            <img
              src={product?.imgSrc}
              alt={product?.title}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <div className="product-price">{product?.price} ₹</div>
            <div className="product-actions">
              <button className="btn-buy">Buy Now</button>
              <button className="btn-cart">Add To Cart</button>
            </div>
          </div>
        </div>

        <RelatedProduct category={product?.category} />
      </div>
    </>
  );
};

export default ProductDetail;
