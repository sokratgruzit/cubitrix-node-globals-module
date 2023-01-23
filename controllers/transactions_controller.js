const transactions = require("../models/txs/transactions");
const main_helper = require("../helpers/index");

// make_transaction
async function make_transaction(req, res) {
  try {
    let { from, to, amount, tx_type, tx_hash, domination } = req.body;

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

module.exports = {
  get_account_balance,
  set_account_balance,
};
