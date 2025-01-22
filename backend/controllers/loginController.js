const clientModel = require("../models/clientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Login user
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, password } = req.body;
    try {
        if (isNaN(id)) {
            // Search by 'epin' if 'id' is a string
            user = await clientModel.findOne({ epin: id });
        } else {
            // Search by 'number' if 'id' is numeric
            user = await clientModel.findOne({ number: Number(id)})
        }        
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        // Generate a JWT including the sponsorId
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ msg: "Server configuration error" });
        }
        const token = jwt.sign(

            { id: user._id, epin: user.epin, sponsorId: user.sponsorId, name:user.name, level:user.level,status:user.activate, role:user.role,halt:user.halt }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return res.status(200).json({
            msg: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, epin: user.epin },
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "An error occurred", error: "Internal server error" });
    }
};