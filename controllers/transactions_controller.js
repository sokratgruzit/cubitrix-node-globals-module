const main_helper = require("../helpers/index");
const global_helper = require("../helpers/global_helper");
const { transaction_types, transactions } = require("@cubitrix/models");
// var Web3 = require("web3");

// make_transaction
async function make_transaction(req, res) {
  try {
    let { from, to, amount, tx_type, tx_hash, tx_currency, account_type } =
      req.body;
    if (
      !from &&
      !to &&
      !amount &&
      !tx_type &&
      !tx_hash &&
      !tx_currency &&
      !account_type
    ) {
      return main_helper.error_response(
        res,
        "please provide all necessary values"
      );
    }
    amount = parseFloat(amount);
    let tx_type_db = await get_tx_type(tx_type);
    let check_from_address_exists = await global_helper.check_if_address_exists(
      from
    );
    let check_to_address_exists = await global_helper.check_if_address_exists(
      to
    );
    if (!check_from_address_exists && !check_to_address_exists) {
      return main_helper.error_response(
        res,
        "we dont have such address registered in our system."
      );
    }
    let tx_global_currency = await global_helper.get_option_by_key(
      "global_currency"
    );

    if (!(tx_type_db.success && tx_global_currency.success)) {
      return main_helper.error_response(
        res,
        "such kind of transaction type is not defined."
      );
    }
    let tx_fee_currency = tx_global_currency?.data?.value;
    let tx_wei = tx_type_db?.data?.tx_fee;

    if (!tx_fee_currency && !tx_wei) {
      return main_helper.error_response(res, "fee currency is not defined");
    }

    let tx_fee_value = await global_helper.calculate_tx_fee(
      tx_wei,
      tx_fee_currency
    );
    if (!tx_fee_value.success) {
      return main_helper.error_response(res, tx_fee_value.message);
    }
    let tx_fee = tx_fee_value.data;
    let get_from_account_balance = await global_helper.get_account_balance(
      from,
      account_type
    );
    let get_to_account_balance = await global_helper.get_account_balance(
      to,
      account_type
    );
    // return main_helper.error_response(res);
    if (
      !get_from_account_balance.success ||
      get_from_account_balance.data == null ||
      get_from_account_balance.data < amount + parseFloat(tx_fee)
    ) {
      return main_helper.error_response(
        res,
        "there is no sufficient amount on your balance"
      );
    } else {
      let get_from_account_balance_value = parseFloat(
        get_from_account_balance?.data
      );
      let get_to_account_balance_value = parseFloat(
        get_to_account_balance?.data
      );

      await global_helper.set_account_balance(
        from,
        account_type,
        get_from_account_balance_value - (amount + parseFloat(tx_fee))
      );
      await global_helper.set_account_balance(
        to,
        account_type,
        (get_to_account_balance_value ? get_to_account_balance_value : 0) +
          amount
      );
    }
    let domination = 0;
    // return main_helper.error_response(res, tx_fee);

    let tx_save = await transactions.create({
      from,
      to,
      amount,
      tx_hash,
      tx_status: "pending",
      tx_type,
      domination,
      tx_fee,
      tx_fee_currency,
      tx_currency,
    });
    if (tx_save) {
      return main_helper.success_response(res, tx_save);
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
      return main_helper.return_data(true, type);
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
