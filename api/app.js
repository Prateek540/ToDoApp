import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import taskRoute from "./routes/task.js";

//App
const app = express();

//DB
import "./db/mongoose.js";

//Middelwares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

export { app };
