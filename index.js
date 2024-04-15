const express = require("express");
const cors = require("cors");
const app = express();

const Exercise = require("./models/exercise.model");
const Food = require("./models/food.model");
const Goal = require("./models/goal.model");

app.use(express.json());
app.use(cors());

require("./db");

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Backend Code for The Fitness tracker App");
});

app.get("/exercises", async (req, res) => {
  try {
    const getExercises = await Exercise.find();
    console.log(getExercises);
    res.status(200).json(getExercises);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Exercise data" });
  }
});

app.post("/exercises", async (req, res) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({ error: "Name and duration are required" });
  }

  try {
    const newExercise = await Exercise.create(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ error: "Error adding exercise", error });
  }
});

app.delete("/exercises/:exerciseId", async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(
      req.params.exerciseId,
    );
    res.status(204).json(deletedExercise);
  } catch (error) {
    res.status(500).json({ error: "Error deleting exercise" });
  }
});

app.get("/food", async (req, res) => {
  try {
    const foodList = await Food.find();
    res.status(200).json(foodList);
  } catch (error) {
    res.status(500).json({ error: "Error fetching food details." });
  }
});

app.post("/food", async (req, res) => {
  const { foodName, calories, protein, carbohydrates, fat } = req.body;

  if (!foodName || !calories || !protein || !carbohydrates || !fat) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: "Error adding food", error });
  }
});

app.delete("/food/:foodId", async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.foodId);
    res.status(204).json(deletedFood);
  } catch (error) {
    res.json(500).json("Error deleting food", error);
  }
});

app.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json("Error fetching goals data", error);
  }
});

app.post("/goals", async (req, res) => {
  const { name, description, date, calories, status } = req.body;

  if (!name || !description || !date || !calories || !status) {
    return res.status(400).json("All fields are required.");
  }
  try {
    const newGoal = await Goal.create(req.body);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json("Error adding new goal", error);
  }
});

app.delete("/goals/:goalId", async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.goalId);
    res.status(204).json(deletedGoal);
  } catch (error) {
    res.status(500).json("Error deleting goal", error);
  }
});

const PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
