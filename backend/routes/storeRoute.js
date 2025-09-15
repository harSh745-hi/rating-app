const express = require("express");
const router = express.Router();

const { getStoresWithAvgRating } = require("../controller/storeController");
const { rateStore } = require("../controller/ratingController");
const { authMiddleware } = require("../middleware/authMiddle");

// anyone can see stores with average rating
router.get("/", getStoresWithAvgRating);

// only logged-in users can rate
router.post("/:id/rate", authMiddleware, rateStore);

module.exports = router;
