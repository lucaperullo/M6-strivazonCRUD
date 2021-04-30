import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./products/products-index.js";
import userRoute from "./users/index.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/users", userRoute);
server.use("/products", productsRouter);

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
