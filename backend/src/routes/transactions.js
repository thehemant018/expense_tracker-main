const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const Transaction = require("../models/Transactions.js");
const User = require("../models/User.js");

router.post("/add", auth, async (req, res, next) => {
  try {
    const { date, category, description, amount } = req.body;
    const userId = req.user._id;
    const transaction = new Transaction({
      user: userId,
      date,
      category,
      description,
      amount,
    });
    await transaction.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.transactions.push(transaction._id);

    // Save the updated user model
    await User.findByIdAndUpdate(
      userId,
      { $push: { transactions: transaction._id } },
      { new: true }
    );

    return res.status(201).json({
      _id: transaction._id,
      user: transaction.user,
      userId: user._id,
      date: transaction.date,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const idToDelete = req.params.id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(idToDelete);
    
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Error: Data not found." });
    }

    res
      .status(200)
      .json({
        deletedId: deletedTransaction._id,
        message: "Success: Data deleted successfully.",
      });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Error: Internal server error." });
  }
});

router.get("/transactions", auth, async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find transactions associated with the user
    const transactions = await Transaction.find({ user: userId });

    // Return the transactions in the response
    res.status(200).json(transactions);
  } catch (error) {
    // Handle errors
    next(error);
  }
});

module.exports = router;
