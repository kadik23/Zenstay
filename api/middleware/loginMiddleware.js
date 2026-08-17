import jwt from "jsonwebtoken";

const jwtSecret = 'sdjjfldwjn2vpbcwytp'

export const loginMiddleware = (req, res, next) => {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
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