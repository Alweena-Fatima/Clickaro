import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <style jsx>{`
        .register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .register-card {
          background: white;
          border-radius: 25px;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
          padding: 3rem;
          width: 100%;
          max-width: 500px;
          transition: all 0.3s ease;
        }

        .register-card:hover {
          box-shadow: 0 12px 32px rgba(16, 185, 129, 0.2);
        }

        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-icon {
          font-size: 4rem;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .register-header h1 {
          color: #059669;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .register-header p {
          color: #6b7280;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .label-icon {
          font-size: 1.2rem;
          color: #10b981;
        }

        .input-wrapper {
          position: relative;
        }

        .form-control {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 3rem;
          border: 2px solid #d1fae5;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .form-control:focus {
          outline: none;
          border-color: #10b981;
          background: white;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.3rem;
          color: #10b981;
          pointer-events: none;
        }

        .btn-register {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-register:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 1.5rem;
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #6b7280;
        }

        .login-link a {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .login-link a:hover {
          color: #059669;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .register-card {
            padding: 2rem;
          }

          .register-header h1 {
            font-size: 1.5rem;
          }

          .register-icon {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <span className="material-symbols-outlined register-icon">
              person_add
            </span>
            <h1>Create Account</h1>
            <p>Join us today! It's quick and easy</p>
          </div>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="material-symbols-outlined label-icon">
                  badge
                </span>
                Full Name
              </label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">
                  person
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onChangerHandler}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="material-symbols-outlined label-icon">
                  mail
                </span>
                Email Address
              </label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">
                  alternate_email
                </span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={onChangerHandler}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="material-symbols-outlined label-icon">
                  lock
                </span>
                Password
              </label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">
                  key
                </span>
                <input
                  name="password"
                  value={formData.password}
                  onChange={onChangerHandler}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-register">
              <span className="material-symbols-outlined btn-icon">
                how_to_reg
              </span>
              Create Account
            </button>
          </form>

          <div className="login-link">
            Already have an account?{" "}
            <a href="/login">Login here</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;