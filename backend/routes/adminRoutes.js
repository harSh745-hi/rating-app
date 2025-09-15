const express = require("express");
const router = express.Router();
const adminController = require("../controller/admincontroller");
const { verifyAdmin } = require("../middleware/authMiddle");

// Dashboard
router.get("/dashboard", verifyAdmin, adminController.getDashboardStats);

// Users
router.post("/users", verifyAdmin, adminController.createUser);
router.get("/users", verifyAdmin, adminController.getUsers);
router.get("/users/:id", verifyAdmin, adminController.getUserDetails);

// Stores
router.get("/stores", verifyAdmin, adminController.getStores);

module.exports = router;
