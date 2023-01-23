const mongoose = require("mongoose");

const transactions = new mongoose.Schema(
  {
    from: String,
    to: String,
    ammount: Number,
    tx_type: String,
    tx_hash: String,
    domination: Number,
    tx_status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("transactions", transactions);
