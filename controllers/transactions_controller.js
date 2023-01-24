const transactions = require("../models/txs/transactions");
const main_helper = require("../helpers/index");
const global_helper = require("../helpers/global_helper");
const transaction_types = require("../models/txs/transaction_types");
// var Web3 = require("web3");

// make_transaction
async function make_transaction(req, res) {
  try {
    let { from, to, amount, tx_type, tx_hash, domination, tx_currency } =
      req.body;
    let tx_type_db = await get_tx_type(tx_type);
    let tx_global_currency = await global_helper.get_option_by_key(
      "global_currency"
    );
    if (!tx_type_db.success && !tx_global_currency.success) {
      return main_helper.error_response(
        res,
        "such kind of transaction type is not defined"
      );
    }
    let tx_global_currency_value = tx_global_currency?.data?.value;
    if (tx_global_currency_value) {
      return main_helper.error_response(res, "fee currency is not defined");
    }
    let tx_save = await transactions.create({
      from,
      to,
      amount,
      tx_hash,
      tx_status: "pending",
      tx_type,
      domination,
      // tx_fee,
      // tx_fee_currency,
      // tx_currency,
    });
    if (tx_save) {
      return main_helper.success_response(res, tx_global_currency_value);
    }
    return main_helper.error_response(res, "error saving transaction");
  } catch (e) {
    console.log(e.message);
    return main_helper.error_response(res, "error saving transaction");
  }
}
async function get_tx_type(tx_type) {
  try {
    let type = await transaction_types.findOne({ name: tx_type }).exec();
    if (type) {
      return type;
    }
    return main_helper.error_message("tx_type not found");
  } catch (e) {
    console.log(e.message);
    return main_helper.error_message("error");
  }
}
module.exports = {
  make_transaction,
};
