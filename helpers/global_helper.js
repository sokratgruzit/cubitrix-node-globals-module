const options = require("../models/options");

function get_option_by_key(key) {
  try {
    let option = options.findOne({ key });
    if (option) {
      return {
        success: true,
        data: option,
      };
    }
    return {
      success: false,
      data: null,
    };
  } catch (e) {
    console.log("get_option_by_key:", e.message);
    return {
      success: false,
      data: null,
    };
  }
}
module.exports = {
  get_option_by_key,
};
