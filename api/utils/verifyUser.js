import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js'; // Ensure correct path

export const verifyToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.access_token;

    // Check if the token is present
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || 'awe234#45fghhyd44', (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }

        // Attach the user to the request object
        req.user = user;
        next();
    });
};

