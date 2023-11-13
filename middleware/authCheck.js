const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.redirect('/');
    }
};

module.exports = { verifyToken };