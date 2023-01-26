const main_helper = require("../helpers/index");
var Web3 = require("web3");
const { options, accounts } = require("@cubitrix/models");
async function get_option_by_key(key) {
  try {
    let option = await options.findOne({ key });
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
async function calculate_tx_fee(wei = 21000, currency = "ether") {
  try {
    const value = Web3.utils.fromWei(wei.toString(), currency);
    return main_helper.return_data(true, value);
  } catch (e) {
    console.log("calculate_tx_fee:", e.message);
    return main_helper.error_message("error calculating tx_fee");
  }
}
async function check_if_address_exists(address) {
  try {
    const check_address = await accounts.findOne({ address });
    if (check_address) {
      return true;
    }
    return false;
  } catch (e) {
    console.log("check_if_address_exists:", e.message);
    return main_helper.error_message("error checking address");
  }
}
module.exports = {
  get_option_by_key,
  calculate_tx_fee,
  check_if_address_exists,
};
