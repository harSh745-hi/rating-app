const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/databse");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

db.query("SELECT 1")
  .then(() => console.log(" Database connected"))
  .catch(err => {
    console.error(" Database connection failed:", err);
    process.exit(1);
  });

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoute");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
