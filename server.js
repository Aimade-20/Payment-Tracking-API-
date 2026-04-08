const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoute");
const fournisseursRoute =require("./routes/fournisseursRoute")
const ErrorMiddleware = require("./middlewares/errorHandler");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api",fournisseursRoute)
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;