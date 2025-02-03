const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({msg: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
};