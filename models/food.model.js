const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    calories: { type: Number },
    protein: { type: Number },
    carbohydrates: { type: Number },
    fat: { type: Number },
  },
  { timestamps: true },
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
