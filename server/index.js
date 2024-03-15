import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ConnectionString);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost/${port}`);
});

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: 200, message: "User registered successfully" });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      return res.json({ status: "ok", user: true });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (err) {
    res.json({ status: 500, message: err });
  }
});
