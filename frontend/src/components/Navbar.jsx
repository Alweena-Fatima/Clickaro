import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart, user } =
    useContext(AppContext);
  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };
  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };
  return (
    <>
      <style jsx>{`
        .nav {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }

        .nav_bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          gap: 2rem;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .left h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo-icon {
          font-size: 2rem;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .search_bar {
          flex: 1;
          max-width: 500px;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .search_bar:focus-within {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transform: translateY(-1px);
        }

        .search_bar .material-symbols-outlined {
          color: #10b981;
          margin-right: 0.5rem;
          font-size: 1.3rem;
        }

        .search_bar input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 1rem;
          color: #333;
        }

        .search_bar input::placeholder {
          color: #9ca3af;
        }

        .right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .btn .material-symbols-outlined {
          font-size: 1.2rem;
        }

        .btn-primary {
          background: white;
          color: #10b981;
        }

        .btn-primary:hover {
          background: #f0fdf4;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-info {
          background: #d1fae5;
          color: #059669;
        }

        .btn-info:hover {
          background: #a7f3d0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-danger {
          background: rgba(255, 255, 255, 0.9);
          color: #ef4444;
        }

        .btn-danger:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #10b981;
          transform: translateY(-2px);
        }

        .position-relative .badge {
          font-size: 0.65rem;
          padding: 0.25rem 0.5rem;
          background: #ef4444 !important;
        }

        .sub_bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 2rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          flex-wrap: wrap;
        }

        .items {
          padding: 0.5rem 1.2rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-weight: 500;
          font-size: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .items:hover {
          background: white;
          color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .nav_bar {
            flex-direction: column;
            gap: 1rem;
          }

          .search_bar {
            width: 100%;
            max-width: 100%;
          }

          .right {
            width: 100%;
            justify-content: center;
          }

          .sub_bar {
            padding: 0.5rem;
          }

          .items {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }

          .left h3 {
            font-size: 1.2rem;
          }

          .logo-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="material-symbols-outlined logo-icon">
              shopping_bag
            </span>
            <h3>Clickaroo</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-1"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  Cart
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-1">
                  <span className="material-symbols-outlined">person</span>
                  Profile
                </Link>

                {/* Admin Button for specific email */}
                {user?.role === "admin" && (
                  <Link to={"/admin"} className="btn btn-warning mx-1">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    Admin
                  </Link>
                )}


                <button
                  className="btn btn-danger mx-1"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <span className="material-symbols-outlined">logout</span>
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-1">
                  <span className="material-symbols-outlined">login</span>
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-1">
                  <span className="material-symbols-outlined">person_add</span>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname === "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              ✨ No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("mobiles")}>
              📱 Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("laptops")}>
              💻 Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("cameras")}>
              📷 Cameras
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphones")}
            >
              🎧 Headphones
            </div>
            <div className="items" onClick={() => filterbyPrice(15999)}>
              💰 ₹15,999
            </div>
            <div className="items" onClick={() => filterbyPrice(25999)}>
              💰 ₹25,999
            </div>
            <div className="items" onClick={() => filterbyPrice(49999)}>
              💰 ₹49,999
            </div>
            <div className="items" onClick={() => filterbyPrice(69999)}>
              💰 ₹69,999
            </div>
            <div className="items" onClick={() => filterbyPrice(89999)}>
              💰 ₹89,999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
