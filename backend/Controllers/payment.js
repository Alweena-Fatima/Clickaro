import { Payment } from "../Models/Payment.js";

// -----------------------
// CREATE ORDER 
// -----------------------
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  // Just create a simple order object without Razorpay
  const order = {
    orderId: "ORDER_" + Date.now(),  // dummy unique id
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  };

  res.json({
    message: "Order created (no payment gateway used)",
    success: true,
    order,
  });
};


// -----------------------
// VERIFY ORDER (Direct Save, No Razorpay)
// -----------------------
export const verify = async (req, res) => {
  const {
    orderId,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId: "N/A",      // Because payment gateway removed
    signature: "N/A",
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",     // Mark directly paid
  });

  res.json({ 
    message: "Order saved successfully.", 
    success: true, 
    orderConfirm 
  });
};


// -----------------------
// USER SPECIFIC ORDERS
// -----------------------
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();

  let orders = await Payment.find({ userId }).sort({ orderDate: -1 });

  res.json({ success: true, orders });
};


// -----------------------
// ALL ORDERS (ADMIN)
// -----------------------
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 });
  res.json({ success: true, orders });
};
