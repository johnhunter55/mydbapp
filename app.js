import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URI = "mongodb://127.0.0.1:27017/mtech";

mongoose.connect(MONGO_URI).catch((err) => {
  console.error("Initial database connection error:", err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);

app.get("/getRestaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    console.log(restaurants);
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
