import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    // Retrieve the Authorization header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user ID to the request object
        req.user = verified.id;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Handle specific JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expired. Please log in again.' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token.' });
        }

        // General error fallback
        res.status(500).json({ msg: 'An error occurred while authenticating the token.' });
    }
};
