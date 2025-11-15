import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import paymentRouter from './Routes/payment.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
// Body parser
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Home route
app.get('/', (req, res) => res.json({ message: 'This is home route' }));
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/payment', paymentRouter);
mongoose.connect(process.env.MONGO_URI, {
  dbName: "MERN_E_Commerce"
})
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.log("MongoDB Connection Error:", err));

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
