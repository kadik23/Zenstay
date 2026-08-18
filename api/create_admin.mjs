import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js';

dotenv.config();
const url = process.env.MONGO_URL;

async function createAdmin() {
    try {
        await mongoose.connect(url);
        console.log("Connected to DB");

        const email = 'admin@zenstay.com';
        const password = 'adminpassword';
        const bcryptSalt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        const existingAdmin = await UserModel.findOne({ email });
        if (existingAdmin) {
            console.log("Admin account already exists with email:", email);
            console.log("Credentials -> Email: admin@zenstay.com | Password: password");
        } else {
            const admin = await UserModel.create({
                email,
                username: 'Admin',
                firstname: 'Admin',
                lastname: 'Zenstay',
                password: hashedPassword,
                account_type: 'admin'
            });
            console.log("Admin account created successfully!");
            console.log("Credentials -> Email: admin@zenstay.com | Password: password");
        }
    } catch (err) {
        console.error("Error creating admin:", err);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
