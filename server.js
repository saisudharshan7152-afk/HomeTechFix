const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend (HTML, CSS, JS)
app.use(express.static(__dirname));

// ✅ Home route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ MongoDB Connection (use env in production)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://akshaysharma200508_db_user:1234abcd@cluster0.sek1a7l.mongodb.net/hometech?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const Booking = mongoose.model("Booking", {
  name: String,
  service: String,
  phone: String
});

// ✅ Save booking
app.post("/book", async (req, res) => {
  try {
    const data = new Booking(req.body);
    await data.save();
    res.send("Saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving booking");
  }
});

// ✅ Get bookings
app.get("/bookings", async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching bookings");
  }
});

// ✅ IMPORTANT: Render dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
