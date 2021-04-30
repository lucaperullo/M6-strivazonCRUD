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

userRouter.get("/:id", async (req, res) => {
  try {
    const selectedUser = await UserSchema.findById(req.params.id);
    if (selectedUser) {
      res.status(200).send(selectedUser);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.send({ message: error });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new UserSchema(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({
      message: "you can now view this user by using this _id " + _id,
    });
  } catch (error) {
    res.send({ message: error });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndDelete(req.params.id);
    if (user) {
      res.send("The user has been destroyed");
    } else {
      res.status(404).send("This user does not exist");
    }
  } catch (error) {
    res.send({ message: error });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(
      req.params.id,
      req.params.body,
      { runValidators: true, new: true }
    );
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.send({ message: error });
  }
});

export default usersRoute;
