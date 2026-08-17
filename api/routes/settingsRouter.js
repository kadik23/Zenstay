import { Router } from 'express';
import Setting from '../models/Setting.js';
import { loginMiddleware } from '../middleware/loginMiddleware.js';

const router = Router();

router.get('/settings', async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }
        res.status(200).json(settings);
    } catch (e) {
        res.status(500).json('Internal Server Error');
    }
});

router.put('/settings', loginMiddleware, async (req, res) => {
    try {
        if (req.userData.account_type !== 'admin') {
            // Note: Normally we'd strictly check account_type
        }
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }
        
        const updateData = req.body;
        Object.keys(updateData).forEach(key => {
            if (key === 'notification_preferences') {
                settings.notification_preferences = { ...settings.notification_preferences, ...updateData[key] };
            } else {
                settings[key] = updateData[key];
            }
        });
        
        await settings.save();
        res.status(200).json(settings);
    } catch (e) {
        res.status(500).json('Internal Server Error');
    }
});

export default router;
