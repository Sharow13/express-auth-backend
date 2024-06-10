import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import "dotenv/config";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${process.env.PORT || 8080}`);
});

// todo env variable
const MONGO_URL = process.env.MONGO_URL!;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
