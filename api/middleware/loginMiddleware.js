import jwt from "jsonwebtoken";

const jwtSecret = 'sdjjfldwjn2vpbcwytp'

export const loginMiddleware = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userData = userData;
        next();
    });
};