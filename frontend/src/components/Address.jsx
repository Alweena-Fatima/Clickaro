import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address added ", result);

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      <style jsx>{`
        .address-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
          padding: 2rem 0;
        }

        .address-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 800px;
          margin: 2rem auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .address-card:hover {
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
        }

        .address-card h1 {
          text-align: center;
          color: #059669;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .form-label {
          font-weight: 600;
          color: #059669;
        }

        .form-control {
          border-radius: 10px;
          border: 1px solid #10b981;
          padding: 0.5rem 1rem;
          background: #f0fdf4;
          color: #374151;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
          background: #dcfce7;
        }

        .btn-submit,
        .btn-old-address {
          font-weight: 600;
          border-radius: 15px;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-submit {
          background: #10b981;
          border: none;
          color: white;
        }

        .btn-submit:hover {
          background: #059669;
        }

        .btn-old-address {
          background: #facc15;
          border: none;
          color: black;
        }

        .btn-old-address:hover {
          background: #eab308;
        }

        @media (max-width: 768px) {
          .address-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="address-container">
        <div className="address-card">
          <h1>Shipping Address</h1>
          <form onSubmit={submitHandler}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  name="fullName"
                  value={fullName}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="number"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Country</label>
                <input
                  name="country"
                  value={country}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">State</label>
                <input
                  name="state"
                  value={state}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input
                  name="city"
                  value={city}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Pincode</label>
                <input
                  name="pincode"
                  value={pincode}
                  onChange={onChangerHandler}
                  className="form-control"
                  type="number"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Address / Nearby</label>
                <textarea
                  name="address"
                  value={address}
                  onChange={onChangerHandler}
                  className="form-control"
                />
              </div>
            </div>

            <div className="d-grid my-3">
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>

            {userAddress && (
              <div className="d-grid my-3">
                <button
                  className="btn-old-address"
                  onClick={() => navigate("/checkout")}
                  type="button"
                >
                  Use Old Address
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Address;
