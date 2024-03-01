import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Create connection to mongoDB

mongoose
  .connect(process.env.MONGO_URL, {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
