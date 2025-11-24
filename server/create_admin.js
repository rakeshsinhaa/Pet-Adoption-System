const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Model/UserModel');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.mongooseURL);
        console.log('Connected to DB');

        const username = 'admin';
        const password = '123';

        const userExists = await User.findOne({ username });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            password: hashedPassword,
        });

        console.log(`Admin user created: ${user.username}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
