const express = require("express");
const router = express();
const transactions_controller = require("../controllers/transactions_controller");

const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.post("/make_transaction", transactions_controller.make_transaction);
module.exports = router;
