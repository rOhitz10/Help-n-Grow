const epinModel = require("../models/epinModel");
const Epin = require("../models/epinModel");

exports.generateEpins = async (req, res) => {
    const { quantity } = req.body;

    // Validate inputs
    if (!quantity || quantity < 1 || quantity > 100) {
        return res.status(400).json({ msg: "Invalid quantity. Quantity must be between 1 and 100." });
    }

    // Check if payment is done
    const paymentStatus = true; // Replace with actual payment check logic

    if (!paymentStatus) {
        return res.status(403).json({ msg: "Payment not completed. EPIN generation is not allowed." });
    }

    try {
        const epins = [];
        for (let i = 0; i < quantity; i++) {
            let newEpin;
            let isUnique = false;

            // Generate a unique EPIN with the prefix "HNG"
            while (!isUnique) {
                newEpin = `HNG${generateRandomEpin(7)}`; // Generate a new EPIN with "HNG" prefix
                const existingEpin = await Epin.findOne({ epins: newEpin });
                if (!existingEpin) {
                    isUnique = true; // Found a unique EPIN
                }
            }

            // Create a new EPIN object with the required fields
            epins.push({ epins: newEpin }); // Assuming clientID is not needed
        }

        // Save all generated EPINs to the database
        await Epin.insertMany(epins);
        return res.status(201).json({ data: epins });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred while generating EPINs.", error: error.message });
    }
};

// Utility function to generate a random string of given length
function generateRandomEpin(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let epin = "";
    for (let i = 0; i < length; i++) {
        epin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return epin;
}



exports.getAllEpins = async (req, res) => {
    try {
        const epins = await Epin.find(); // Retrieve all EPINs
        return res.status(200).json({ data: epins });
    } catch (error) {
        console.error("Error fetching EPINs:", error);
        return res.status(500).json({ msg: "An error occurred while fetching EPINs", error: error.message });
    }
};


