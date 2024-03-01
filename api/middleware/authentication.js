import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authentication = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) return res.status(402).send("User not authenticated");
    next();
  });
};
