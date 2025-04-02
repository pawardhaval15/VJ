const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Check if admin user already exists
    const adminExists = await User.findOne({ where: { role: 'admin' } });

    // Set role based on conditions
    let userRole = role === 'admin' && !adminExists ? 'admin' : 'user';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    await User.create({ name, email, password: hashedPassword, role: userRole });

    res.status(201).json({ message: `User registered successfully as ${userRole}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
