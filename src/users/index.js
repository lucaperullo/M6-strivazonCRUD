import express from "express";
import UserSchema from "./schema.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    if (req.query.name) {
      const user = await UserSchema.findOne({ name: req.query.name });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("user not found");
      }
    } else {
      const allUsers = await UserSchema.find();
      res.status(200).send(allUsers);
    }
  } catch (error) {
    res.send({ message: error });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new UserSchema();
  } catch (error) {}
});
