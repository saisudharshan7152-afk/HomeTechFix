const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use ENV variable (IMPORTANT)
const MONGO_URI = process.env.MONGO_URI;

// Connect MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const Booking = mongoose.model("Booking", {
  name: String,
  service: String,
  phone: String
});

// Save booking
app.post("/book", async (req, res) => {
  try {
    const data = new Booking(req.body);
    await data.save();
    res.send("Saved");
  } catch (err) {
    res.status(500).send("Error saving");
  }
});

// Get bookings
app.get("/bookings", async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching");
  }
});

// ✅ IMPORTANT: Use Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
