import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

//Register
export const Register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      req.body.password.toString(),
      salt
    );
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    jwt.sign(
      { id: newUser._id, email: req.body.email },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) return res.status(400).send(err);
        res.cookie("token", token).status(200).send({
          id: newUser._id,
          email: req.body.email,
        });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

//Login

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const validPassword = await bcrypt.compare(
      req.body.password.toString(),
      user.password
    );
    if (!validPassword) {
      return res.status(404).send("Password is incorrect");
    }
    jwt.sign(
      { id: user._id, email: req.body.email },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) return res.status(400).send(err);
        res.cookie("token", token).send({
          id: user._id,
          email: req.body.email,
        });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

//Logout

export const Logout = async (req, res) => {
  try {
    res.cookie("token", "").status(200).send("Logged Out.");
  } catch (error) {
    res.status(500).send(error);
  }
};

//Get Profile

export const Profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, (err, info) => {
      if (err) return res.status(200).json(null);
      res.status(200).json(info);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
