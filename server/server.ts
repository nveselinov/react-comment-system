import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import { MainController } from "./controllers";

const app: express.Application = express();
const port = process.env.PORT || 3003;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", MainController);

app.listen(port);
