import { Payment } from "../Models/Payment.js";

// -----------------------
// CREATE ORDER 
// -----------------------
// COD (Cash On Delivery) / Direct Order Logic
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    // 1. Create a fake Order ID (since we aren't getting one from a gateway)
    const orderId = `ORD-${Date.now()}`;

    // 2. Create the Order in Database
    const order = await Payment.create({
      orderId,
      paymentId: "COD-PAYMENT", // Placeholder ID
      signature: "COD-SIGNATURE", // Placeholder
      amount,
      orderItems: cartItems,
      userId,
      userShipping,
      payStatus: "Paid", // Or "Pending" if you prefer
    });

    res.json({
      success: true,
      message: "Order Placed Successfully!",
      order,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
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
