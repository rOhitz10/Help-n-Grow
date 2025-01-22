const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        req.user = decoded; // Attach decoded token data to request
        next();
    });
};

const isAdmin = (req, res, next) => {

    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                msg: "This route is protected for Admin only"
            });
        }
        next();
    } catch (error) {
        console.error("Error in admin middleware:", error.message);
        return res.status(500).json({
            success: false,
            msg: "User role is not verified, please try again"
        });
    }

}

module.exports = {authMiddleware,isAdmin }


