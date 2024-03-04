const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
