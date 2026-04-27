const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://akshaysharma200508_db_user:1234abcd@cluster0.sek1a7l.mongodb.net/hometech?retryWrites=true&w=majority")
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
  const data = new Booking(req.body);
  await data.save();
  res.send("Saved");
});

// Get bookings
app.get("/bookings", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

// Start server
app.listen(3000, () => {
  console.log("Server running on 3000");
});