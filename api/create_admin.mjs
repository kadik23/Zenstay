import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Zenstay';

export async function createAdmin() {
    let needDisconnect = false;
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(url);
            needDisconnect = true;
            console.log("Connected to DB");
        }

        const email = process.env.ADMIN_EMAIL || 'admin@gmail.com';
        const password = process.env.ADMIN_PASSWORD || 'password';
        const bcryptSalt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        const existingAdmin = await UserModel.findOne({ email });
        if (existingAdmin) {
            console.log("Admin account already exists with email:", email);
            console.log(`Credentials -> Email: ${email} | Password: ${password}`);
        } else {
            await UserModel.create({
                email,
                username: 'Admin',
                firstname: 'Admin',
                lastname: 'Zenstay',
                password: hashedPassword,
                account_type: 'admin'
            });
            console.log("Admin account created successfully!");
            console.log(`Credentials -> Email: ${email} | Password: ${password}`);
        }
    } catch (err) {
        console.error("Error creating admin:", err);
    } finally {
        if (needDisconnect) {
            await mongoose.disconnect();
        }
    }
}

if (process.argv[1] && process.argv[1].endsWith('create_admin.mjs')) {
    createAdmin();
}

export default createAdmin;
