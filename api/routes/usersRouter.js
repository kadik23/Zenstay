import { Router } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body, validationResult } from 'express-validator';
import { userHandler } from '../handlers/users.js';
import { loginMiddleware } from '../middleware/loginMiddleware.js';
import { OAuth2Client } from 'google-auth-library';

const router = Router();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdjjfldwjn2vpbcwytp';

router.post("/auth/google", async (req, res) => {
    const { credential, access_token } = req.body;
    try {
        let email, firstname, lastname, picture, telephone, date_of_birth, location, nationality;

        if (credential) {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            let payload;
            try {
                const ticket = await client.verifyIdToken({
                    idToken: credential,
                    audience: process.env.GOOGLE_CLIENT_ID || undefined,
                });
                payload = ticket.getPayload();
            } catch (verifyErr) {
                const decoded = jwt.decode(credential);
                if (decoded && decoded.email) {
                    payload = decoded;
                } else {
                    throw verifyErr;
                }
            }
            email = payload.email;
            firstname = payload.given_name || payload.name || 'Google User';
            lastname = payload.family_name || '';
            picture = payload.picture || '';
            telephone = payload.phone_number || payload.phoneNumber || payload.telephone || null;
            date_of_birth = payload.birthdate || payload.birthday || payload.date_of_birth || null;
            location = payload.location || payload.address || (payload.locale ? payload.locale : null);
            nationality = payload.nationality || (payload.locale ? (payload.locale.split('-')[1] || payload.locale) : null);
        } else if (access_token) {
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
            const payload = await response.json();
            if (!payload.email) {
                return res.status(400).json({ error: 'Failed to retrieve Google user profile' });
            }
            email = payload.email;
            firstname = payload.given_name || payload.name || 'Google User';
            lastname = payload.family_name || '';
            picture = payload.picture || '';
            telephone = payload.phone_number || payload.phoneNumber || payload.telephone || null;
            date_of_birth = payload.birthdate || payload.birthday || payload.date_of_birth || null;
            location = payload.location || payload.address || (payload.locale ? payload.locale : null);
            nationality = payload.nationality || (payload.locale ? (payload.locale.split('-')[1] || payload.locale) : null);
        } else {
            return res.status(400).json({ error: 'Google credential or access token required' });
        }

        let userDoc = await User.findOne({ email });

        if (!userDoc) {
            userDoc = await User.create({
                email,
                username: email.split('@')[0],
                firstname,
                lastname,
                image: picture,
                telephone: telephone || null,
                date_of_birth: date_of_birth || null,
                location: location || null,
                nationality: nationality || null,
                password: null,
                auth_provider: 'google',
                account_type: 'Guest',
            });
        } else {
            const updates = {};
            if (picture && (!userDoc.image || userDoc.image !== picture)) updates.image = picture;
            if (telephone && !userDoc.telephone) updates.telephone = telephone;
            if (date_of_birth && !userDoc.date_of_birth) updates.date_of_birth = date_of_birth;
            if (location && !userDoc.location) updates.location = location;
            if (nationality && !userDoc.nationality) updates.nationality = nationality;

            if (Object.keys(updates).length > 0) {
                userDoc = await User.findByIdAndUpdate(userDoc._id, updates, { new: true });
            }
        }

        jwt.sign({
            email: userDoc.email,
            id: userDoc._id
        }, jwtSecret, {}, (err, token) => {
            if (err) return res.status(500).json({ error: err.message });
            const { password, ...userWithoutPassword } = userDoc.toObject();
            res.cookie('token', token, { maxAge: 3600 * 3600, sameSite: 'none', path: '/', secure: true })
               .json({ ...userWithoutPassword, token });
        });
    } catch (e) {
        console.error("Google Auth error:", e);
        res.status(500).json({ error: e.message || 'Google Auth Failed' });
    }
});

router.post("/register",
    [
        body('password')
            .notEmpty()
            .isLength({ min: 8, max: 16 })
            .withMessage('must be at least 8-16 characters')
    ],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        const { username, email, firstname, lastname, password } = req.body;
        let account_type = 'Guest';
        try {
            let pass = bcrypt.hashSync(password, bcryptSalt);
            const userDoc = await User.create({
                email,
                username,
                firstname,
                lastname,
                password: pass,
                auth_provider: 'email',
                account_type,
            });
            res.json({ username, firstname, lastname, email, password, account_type });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });

        if (userDoc) {
            if (!userDoc.password || userDoc.auth_provider === 'google') {
                return res.status(422).json('This account uses Google Login. Please click Login with Google.');
            }
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    const { password, ...userWithoutPassword } = userDoc.toObject();
                    res.cookie('token', token,{maxAge:3600*3600,sameSite:'none',path:'/',secure:true}).json({ ...userWithoutPassword, token });
                });
            } else {
                res.status(422).json('password not ok');
            }
        } else {
            res.status(422).json('email not found');
        }
    } catch (e) {
        res.status(422).json(e);
    }
});

router.put('/update_profile', loginMiddleware, async (req, res) => {
    try {
        const { _id, username, __v, account_type, ...allowedUpdated } = req.body;
        const updateUser = await User.findById(_id);
        if (!updateUser) {
            return res.status(500).json('Internal Server Error: User not found');
        }
        
        Object.keys(allowedUpdated).forEach(key => {
            updateUser[key] = allowedUpdated[key];
        });
        
        await updateUser.save();
        console.log(allowedUpdated);
        return res.status(200).json(updateUser);
    } catch (e) {
        res.status(500).json('Internal Server Error: ' + e);
    }
});


router.get('/getUsers', userHandler);

router.get('/getAdminContact', async (req, res) => {
    try {
        const admin = await User.findOne({ account_type: 'admin' });
        if (admin) {
            res.json({ email: admin.email, telephone: admin.telephone || '+49 002 001 030' });
        } else {
            res.status(404).json('Admin not found');
        }
    } catch (e) {
        res.status(500).json('Internal Server Error');
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

router.get('/me', loginMiddleware, (req, res) => {
    // If the token is valid, return user data
    res.status(200).json({ isValid: true, user: req.userData });
});

import Booking from "../models/Booking.js";

router.delete('/delete_user', async (req, res) => {
    const { _id } = req.body;
    try {
        await User.findByIdAndDelete(_id);
        await Booking.deleteMany({ user_id: _id });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/delete_bulk_users', async (req, res) => {
    const { userIds } = req.body;
    try {
        await User.deleteMany({ _id: { $in: userIds } });
        await Booking.deleteMany({ user_id: { $in: userIds } });
        res.status(200).json({ message: 'Users deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/change_password', loginMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.userData.id);
        if (!user) return res.status(404).json('User not found');
        
        const passOk = bcrypt.compareSync(oldPassword, user.password);
        if (!passOk) return res.status(422).json('Incorrect current password');
        
        user.password = bcrypt.hashSync(newPassword, bcryptSalt);
        await user.save();
        res.status(200).json('Password changed successfully');
    } catch (e) {
        res.status(500).json('Internal Server Error');
    }
});

export default router;
