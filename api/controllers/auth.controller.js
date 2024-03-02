import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate the request
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All input is required"));
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("User created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the request
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields is required"));
  }

  try {
    // Find the user
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "Invalid password or email"));
    }

    // Compare the password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password or email"));
    }

    // Create a token
    const token = jwt.sign({ id: validUser._id }, process.env.TOKEN_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    // Send the token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

// Handle Google sign-in
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      // User exists, generate token
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // User does not exist, create new user
      // Generate password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
