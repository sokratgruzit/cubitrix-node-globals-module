let options = require("../models/options");
let account_types = require("../models/accounts/account_types");
let transaction_types = require("../models/txs/transaction_types");

async function insert_all_start_elements(req, res) {
  let total_migrated_list = [];
  // insert options
  let option_1 = {
    key: "global_currency",
    value: "ether",
    onject_value: {},
  };
  let option_1_check = await options.findOne({ key: "global_currency" });
  if (!option_1_check) {
    await options.create(option_1);
    total_migrated_list.push("global_currency");
  }

  // insert account types
  let account_type_1 = {
    name: "user_current",
  };
  let account_type_1_check = await account_types.findOne({
    name: "user_current",
  });
  if (!account_type_1_check) {
    await account_types.create(account_type_1);
    total_migrated_list.push("account_type_1 : user_current");
  }

  let account_type_2 = {
    name: "loan",
  };
  let account_type_2_check = await account_types.findOne({
    name: "loan",
  });
  if (!account_type_2_check) {
    await account_types.create(account_type_2);
    total_migrated_list.push("account_type_2 : loan");
  }

  let account_type_3 = {
    name: "staking",
  };
  let account_type_3_check = await account_types.findOne({
    name: "staking",
  });
  if (!account_type_3_check) {
    await account_types.create(account_type_3);
    total_migrated_list.push("account_type_3 : staking");
  }

  // insert transaction types
  let transaction_type_1 = {
    name: "transfer",
    tx_fee: 21000,
  };
  let transaction_type_1_check = await transaction_types.findOne({
    name: "transfer",
  });
  if (!transaction_type_1_check) {
    await transaction_types.create(transaction_type_1);
    total_migrated_list.push("transaction_type_1 : transfer");
  }

  let transaction_type_2 = {
    name: "deposit",
    tx_fee: 21000,
  };
  let transaction_type_2_check = await transaction_types.findOne({
    name: "deposit",
  });
  if (!transaction_type_2_check) {
    await transaction_types.create(transaction_type_2);
    total_migrated_list.push("transaction_type_2 : deposit");
  }

  let transaction_type_3 = {
    name: "withdraw",
    tx_fee: 21000,
  };
  let transaction_type_3_check = await transaction_types.findOne({
    name: "withdraw",
  });
  if (!transaction_type_3_check) {
    await transaction_types.create(transaction_type_3);
    total_migrated_list.push("transaction_type_3 : withdraw");
  }

  res.send(total_migrated_list);
}
module.exports = {
  insert_all_start_elements,
};
