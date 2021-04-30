import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import servicesRoutes from "./services/index.js";

import productsRouter from "./products/index.js";
import userRoute from "./users/index.js";

import {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} from "./errorHandling.js";
import cartRoute from "./cart/index.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/users", userRoute);
server.use("/products", productsRouter);
server.use("/services", servicesRoutes);
server.use("/cart", cartRoute);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
console.table(listEndpoints(server));
