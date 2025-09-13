const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const storeRoutes = require("./routes/storeRoute");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
