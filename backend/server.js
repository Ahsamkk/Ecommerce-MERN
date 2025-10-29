import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import checkoutRouter from "./routes/checkout.route.js";
import orderRouter from "./routes/order.route.js";
import uploadRouter from "./routes/upload.route.js";
import subscriberRouter from "./routes/subscriber.route.js";
import adminRouter from "./routes/admin.route.js";
import adminProductRouter from "./routes/adminProducts.route.js";
import adminOrderRouter from "./routes/adminOrder.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
//add aggregate paginate

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit API");
});

//API Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subscriberRouter);

//Admin Routes
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
