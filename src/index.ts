import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import indexRoute from "./router/index";
import dotenv from "dotenv";
import { connectDB } from "./db/client";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", indexRoute);

connectDB();

const server = http.createServer(app);

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
