import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

// REGISTER
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashed
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
     "secretkey",
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
}
