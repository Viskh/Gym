const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "client", "static")));
app.use(require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log("Вы успешно подключились к MongoDB!");

    app.listen(port, () => {
      console.log("Server has been started!");
    });
  } catch (e) {
    console.log(e);
  }
};

connected();
