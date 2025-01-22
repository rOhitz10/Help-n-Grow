// controllers/userController.js
const { log } = require("npmlog");
const clientModel = require("../models/clientModel");
const RequestModel = require("../models/requestModel");  // Assuming there's a link model that tracks user links


exports.getUsersByLevel = async (req, res) => {
    const { level } = req.body;  // Fetch level from URL parameters

    try {
        // Fetch users with the given level
        const users = await clientModel.find({ level: level });

        if (users.length === 0) {
            return res.status(404).json({ msg: "No users found at this level" });
        }

        return res.status(200).json({
            msg: `Users at level ${level}`,
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                level: user.level
            }))
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};

exports.getUsersWhoLeveledUpByOne = async (req, res) => {
    try {
        // Find users who have leveled up by exactly 1 level at any time
        const usersWhoLeveledUpByOne = await clientModel.find({
            level: { $gt: 0 },  // Ensure the user has a level greater than 0
            previousLevel: { $gte: 0 },  // Ensure previousLevel is valid (0 or higher)
            $expr: { $eq: [{ $subtract: ['$level', '$previousLevel'] }, 1] }  // Ensure the level difference is exactly 1
        })
        .select('name email level previousLevel levelUpdatedAt')  // Select the relevant fields to return
        .sort({ levelUpdatedAt: -1 });  // Sort by levelUpdatedAt in descending order (most recent first)

        // Check if we have any users who leveled up by exactly 1 level
        if (usersWhoLeveledUpByOne.length === 0) {
            return res.status(404).json({ msg: "No users have leveled up by exactly 1 level." });
        }

        // Return the list of users who leveled up by exactly 1 level
        return res.status(200).json({
            msg: "Users who leveled up by exactly 1 level, sorted by levelUpdatedAt.",
            data: usersWhoLeveledUpByOne
        });

    } catch (error) {
        console.error("Error fetching users who leveled up by 1:", error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};
