import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

// REGISTER
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Empty field check
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Email validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Password validation
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters and include uppercase, lowercase, number & special character"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashed });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Registration failed" });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "7d" });

    res.json({ token, user });

  } catch (error) {
    res.status(500).json({ msg: "Login failed" });
  }
}
