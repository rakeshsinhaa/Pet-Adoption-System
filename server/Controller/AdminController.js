const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/UserModel');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    // Check for user email
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = { registerAdmin, loginAdmin, getMe };