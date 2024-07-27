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





// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, "awe234#45fghhyd44");
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(' ').join('').toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, "awe234#45fghhyd44");
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };








export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, generate JWT token
      const token = jwt.sign({ id: user._id }, 'awe234#45fghhyd44');
      const { password, ...rest } = user._doc; // Exclude password from response
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } else {
      // If user does not exist, create a new user
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const username = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      // Generate JWT token for new user
      const token = jwt.sign({ id: newUser._id }, 'awe234#45fghhyd44');
      const { password, ...rest } = newUser._doc; // Exclude password from response
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error); // Pass any caught errors to the error handling middleware
  }
};



export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token'); // Adjust the cookie name if needed
    res.status(200).json({ success: true, message: 'User has been logged out' });
  } catch (error) {
    next(error);
  }
};
