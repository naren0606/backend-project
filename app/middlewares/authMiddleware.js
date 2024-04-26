const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Token missing.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = authMiddleware;
