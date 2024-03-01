import express from "express";
import { Login, Logout, Register, Profile } from "../controllers/auth.js";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();

//Register
router.post("/register", Register);

//Login
router.post("/login", Login);

//Logout
router.post("/logout", authentication, Logout);

//Get Profile
router.get("/profile", Profile);

export default router;
