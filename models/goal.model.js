const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    calories: { type: Number },
    status: { type: String, enum: ["In Progress", "Acheived", "Abandoned"] },
  },
  { timestamps: true },
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
