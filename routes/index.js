const express = require("express");
const router = express();
const migration_controller = require("../controllers/migration_controller");

const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/test", (req, res) => {
  console.log("starting importing startinl elements");
  res.status(200).send("hi Jinx");
});
router.get(
  "/insert_all_start_elements",
  migration_controller.insert_all_start_elements
);
module.exports = router;
