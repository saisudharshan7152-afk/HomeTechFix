const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MONGODB
const MONGO_URI =
process.env.MONGO_URI ||
"mongodb+srv://akshaysharma200508_db_user:1234abcd@cluster0.sek1a7l.mongodb.net/hometech?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SCHEMA
const Booking = mongoose.model("Booking", {

  name: String,

  service: String,

  phone: String,

  status: {
    type: String,
    default: "Technician Assigned"
  },

  technician: String,

  eta: String,

  rating: String,

  techPhone: String

});

// SAVE BOOKING
app.post("/book", async (req, res) => {

  try {

    // 👨‍🔧 TECHNICIANS
    const technicians = [

      {
        name: "Ravi Kumar",
        eta: "15 mins",
        rating: "⭐ 4.8",
        phone: "+91 9876543210"
      },

      {
        name: "Arjun Reddy",
        eta: "10 mins",
        rating: "⭐ 4.6",
        phone: "+91 9123456780"
      },

      {
        name: "Kiran",
        eta: "20 mins",
        rating: "⭐ 4.9",
        phone: "+91 9988776655"
      },

      {
        name: "Rahul Sharma",
        eta: "8 mins",
        rating: "⭐ 4.7",
        phone: "+91 9090909090"
      }

    ];

    // RANDOM TECHNICIAN
    const randomTech =
      technicians[
        Math.floor(Math.random() * technicians.length)
      ];

    // SAVE BOOKING
    const data = new Booking({

      name: req.body.name,

      service: req.body.service,

      phone: req.body.phone,

      status: "Technician Assigned",

      technician: randomTech.name,

      eta: randomTech.eta,

      rating: randomTech.rating,

      techPhone: randomTech.phone

    });

    await data.save();

    res.send("Saved");

  } catch (err) {

    console.log(err);

    res.status(500).send("Error");

  }

});

// GET BOOKINGS
app.get("/bookings", async (req, res) => {

  try {

    const data = await Booking.find();

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).send("Error fetching bookings");

  }

});

// UPDATE STATUS
app.put("/update-status/:id", async (req, res) => {

  try {

    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      }
    );

    res.send("Updated");

  } catch (err) {

    console.log(err);

    res.status(500).send("Error updating");

  }

});

// DELETE BOOKING
app.delete("/delete-booking/:id", async (req, res) => {

  try {

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.send("Deleted");

  } catch (err) {

    console.log(err);

    res.status(500).send("Error deleting");

  }

});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
