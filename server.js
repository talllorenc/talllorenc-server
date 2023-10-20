const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("./routes/admin");
const addBeat = require("./routes/add_beat");
const deleteBeat = require("./routes/delete_beat");
const getBeats = require("./routes/get_beats");
const path = require('path')

const app = express();
app.use(express.json());
dotenv.config();

app.use('/uploads/beats', express.static('uploads/beats'));
app.use('/uploads/audio', express.static('uploads/audio'));

app.use(cors({ origin: "http://localhost:3000" }));
app.options("*", cors());


app.use("/api", admin);
app.use("/api", addBeat);
app.use("/api", deleteBeat);
app.use("/api", getBeats);

const PORT = process.env.port || 8080;
async function start() {
  const dbConnectionString = process.env.MONGO_DB;
  await mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    app.listen(PORT, () => {
      console.log(`Server run on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();


