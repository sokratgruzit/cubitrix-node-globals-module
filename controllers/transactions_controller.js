const transactions = require("../models/txs/transactions");
const main_helper = require("../helpers/index");
const global_helper = require("../helpers/global_helper");
const transaction_types = require("../models/txs/transaction_types");

// make_transaction
async function make_transaction(req, res) {
  try {
    let { from, to, amount, tx_type, tx_hash, domination } = req.body;
    let tx_type_db = await get_tx_type(tx_type);
    let tx_global_currency = await global_helper.get_option_by_key(
      "global_currency"
    );

    let tx_save = await transactions.create({
      from,
      to,
      amount,
      tx_hash,
      tx_status: "pending",
      tx_type,
      domination,
    });
    if (tx_save) {
      return main_helper.success_message("saved");
    }
    return main_helper.error_message("error");
  } catch (e) {
    console.log(e.message);
    return main_helper.error_message("error");
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
  get_account_balance,
  set_account_balance,
};
