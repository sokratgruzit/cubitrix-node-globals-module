const express = require("express");
const router = express();
const global_helper = require("../helpers/global_helper");
const migration_controller = require("../controllers/migration_controller");

const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.get(
  "/insert_all_start_elements",
  migration_controller.insert_all_start_elements
);
//get all types
router.post("/get-all-types", global_helper.get_types);
module.exports = router;
