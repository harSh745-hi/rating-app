const express = require("express");
const { getStores } = require("../controllers/storeController");
const { rateStore } = require("../controllers/ratingController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getStores);
router.post("/:id/rate", auth, rateStore);

module.exports = router;
