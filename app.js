const path = require("path");
const fs = require("fs");
const express = require("express");
const OS = require("os");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");
const dbURL =
  process.env.NODE_ENV === "test"
    ? "mongodb://172.17.0.3:27017/solar?authSource=admin"
    : "mongodb://127.0.0.1:27017/solar?authSource=admin";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors());

mongoose.connect(
  dbURL,
  {
    user: "admin",
    pass: "admin123",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.log("error!! " + err);
    } else {
      console.log("MongoDB Connection Successful");
    }
  }
);

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});
var planetModel = mongoose.model("planets", dataSchema);

async function ensureCollectionExists() {
  try {
    const existingCount = await planetModel.countDocuments();
    if (existingCount === 0) {
      await planetModel.insertMany([
        {
          name: "Mercury",
          id: 1,
          description: "The smallest planet and closest to the Sun.",
          image: "images/mercury.jpg",
          velocity: "47.87 km/s",
          distance: "57.9 million km",
        },
        {
          name: "Venus",
          id: 2,
          description:
            "Second planet from the Sun, known for its thick, toxic atmosphere.",
          image: "images/venus.jpg",
          velocity: "35.02 km/s",
          distance: "108.2 million km",
        },
        {
          name: "Earth",
          id: 3,
          description: "Our home planet, the only one known to support life.",
          image: "images/earth.jpg",
          velocity: "29.78 km/s",
          distance: "149.6 million km",
        },
        {
          name: "Mars",
          id: 4,
          description:
            "The Red Planet, known for its dusty landscape and potential for past life.",
          image: "images/mars.jpg",
          velocity: "24.07 km/s",
          distance: "227.9 million km",
        },
        {
          name: "Jupiter",
          id: 5,
          description:
            "The largest planet in the Solar System, famous for its Great Red Spot.",
          image: "images/jupiter.jpg",
          velocity: "13.07 km/s",
          distance: "778.5 million km",
        },
        {
          name: "Saturn",
          id: 6,
          description:
            "Known for its stunning ring system, composed mainly of ice particles.",
          image: "images/saturn.jpg",
          velocity: "9.69 km/s",
          distance: "1.4 billion km",
        },
        {
          name: "Uranus",
          id: 7,
          description:
            "An ice giant that orbits the Sun on its side due to a massive collision.",
          image: "images/uranus.jpg",
          velocity: "6.81 km/s",
          distance: "2.9 billion km",
        },
        {
          name: "Neptune",
          id: 8,
          description:
            "The farthest known planet, with supersonic winds and deep blue color.",
          image: "images/neptune.jpg",
          velocity: "5.43 km/s",
          distance: "4.5 billion km",
        },
      ]);
      console.log("Inserted all planets into the planets collection.");
    } else {
      console.log(
        "Planets collection already contains data. No need to insert."
      );
    }
  } catch (error) {
    console.error("Error ensuring planets collection exists:", error);
  }
}

// Call function after successful DB connection
mongoose.connection.once("open", ensureCollectionExists);

app.post("/planet", function (req, res) {
  console.log("Received Planet ID " + req.body.id);
  planetModel.findOne(
    {
      id: req.body.id,
    },
    function (err, planetData) {
      if (err) {
        alert(
          "Ooops, We only have 9 planets and a sun. Select a number from 0 - 9"
        );
        res.send("Error in Planet Data");
      } else {
        res.send(planetData);
      }
    }
  );
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.get("/api-docs", (req, res) => {
  fs.readFile("oas.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get("/os", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    os: OS.hostname(),
    env: process.env.NODE_ENV,
  });
});

app.get("/live", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "live",
  });
});

app.get("/ready", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "ready",
  });
});

app.listen(3000, () => {
  console.log("Server successfully running on port - " + 3000);
});
module.exports = app;

//module.exports.handler = serverless(app)
