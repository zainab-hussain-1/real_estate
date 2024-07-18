import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// middleware for sign up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};
// middleware for sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign({ id: validUser._id }, "awe234#45fghhyd44");

    // Send token in a cookie
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      _id: validUser._id,
      email: validUser.email,
      // Add other user data you want to send to the client
    });
  } catch (error) {
    next(error); // Handle errors in your error handling middleware
  }
};