
const clientModel = require("../models/clientModel");
const RequestModel = require("../models/requestModel");
const Epin = require("../models/epinModel")
const { Types: { ObjectId } } = require("mongoose");
const bcrypt = require("bcrypt");

const { body, validationResult } = require('express-validator');

exports.createUserChain = [
    // Validation rules
    body('sponsorId').isString().notEmpty().withMessage("Sponsor ID is required"),
    body('epin').isString().notEmpty().withMessage("EPIN is required"),
    body('password').isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('name').isString().notEmpty().withMessage("Name is required"),
    body('number').isMobilePhone('any').withMessage("Number must be a valid phone number"),
    body('email').isEmail().normalizeEmail().withMessage("Invalid email format"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { sponsorId, epin, password, name, number,email } = req.body;    
        try {
            // Check if sponsorId exists
            const checkId = await clientModel.findOne({$or:[{ sponsorId : sponsorId },{epin:sponsorId}]});
            if (!checkId) {
                return res.status(400).json({ msg: "Sponsor ID not found" });
            }
            
            // Check if Epin exists

            const checkValidEpin = await Epin.findOne({epins:epin})
            if(!checkValidEpin)
                {
                    return res.status(400).json({
                        msg: "Make sure you enter right epin"
                    })
                }
                
            // Check if Epin used
            const checkEpin = await clientModel.findOne({epin:epin})
            if(checkEpin)
            {
                return res.status(400).json({
                    msg: "Epin already in use"
                })
            }
            

            // Check if user already exists by number or email
            const existingUser = await clientModel.findOne({ $or: [{ number }, { email }] });
            if (existingUser) {
                return res.status(400).json({ msg: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user  
            const newChain = new clientModel({
                _id: new ObjectId(),
                sponsorId,
                epin,
                password: hashedPassword,
                name,
                number,
                email,
                level: 0,
            });

            const savedContent = await newChain.save();
            return res.status(201).json({ data: savedContent });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "An error occurred", error: error.message });
        }
    }
];


exports.getDownlines = async (req, res) => {
    const sponsorId  = req.user.epin;
    if (!sponsorId) {
        return res.status(400).json({ msg: "sponsorId is required" });
    }

    try {
        const downlines = await clientModel.find({ sponsorId });
        
        if (downlines.length === 0) {
            return res.status(404).json({ msg: "No downlines found" });
        }

        return res.status(200).json({ data: downlines });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};


exports.getDownlinesCount = async (req, res) => {
    const  sponsorId  = req.user.epin;

    if (!sponsorId) {
        return res.status(400).json({ msg: "sponsorId is required" });
    }

    try {
        const downlines = await clientModel.find({ sponsorId });
        let totalCount = downlines.length;

        return res.status(200).json({ totalCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};

// Helper function to recursively get all downlines (children and grandchildren)
const getAllDownlinesRecursive = async (sponsorId) => {
    // Get the direct downlines for the given sponsorId
    const downlines = await clientModel.find({ sponsorId }).select('epin name number email'); // Adjust fields as needed
    let allDownlines = [];

    // For each downline, get their downlines recursively
    for (const downline of downlines) {
        // Fetch the child's downlines using the child's epin
        const nestedDownlines = await getAllDownlinesRecursive(downline.epin); // Use epin for the recursive call
        
        // Structure the downline with its nested downlines
        allDownlines.push({
            ...downline.toObject(), // Convert Mongoose document to plain object
            children: nestedDownlines // Add children to the downline
        });
    }

    return allDownlines;
};



// New function to get all children and grandchildren of a sponsor
exports.getAllChildrenAndGrandchildren = async (req, res) => {
    const sponsorId  = req.user.epin;

    if (!sponsorId) {
        return res.status(400).json({ msg: "sponsorId is required" });
    }

    try {
        const allDownlines = await getAllDownlinesRecursive(sponsorId);
        
        if (allDownlines.length === 0) {
            return res.status(404).json({ msg: "No downlines found" });
        }

        return res.status(200).json({ data: allDownlines });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};

const countAllDownlinesOfDownlines = async (sponsorId) => {
    // Base case: if sponsorId is invalid, return 0
    if (!sponsorId) return 0;

    // Fetch direct downlines for the given sponsorId
    const downlines = await clientModel.find({ sponsorId });
    let totalCount = downlines.length;

    // Recursively count downlines of each downline
    for (const downline of downlines) {
        const countOfDownlines = await countAllDownlinesOfDownlines(downline.epin);
        totalCount += countOfDownlines; // Add to the total count
    }

    return totalCount;
};

exports.getAllDownlineCount = async (req, res) => {
    const sponsorId  = req.user.epin
    
    if (!sponsorId) {
        return res.status(400).json({ msg: "sponsorId is required" });
    }

    try {
        const totalCount = await countAllDownlinesOfDownlines(sponsorId);
        return res.status(200).json({ totalCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg:  "An error occurred", error: error.message });
    }
};


// update users data model

exports.userUpdate = async (req, res) => {
    const  epin  = req.user.epin; // Assuming EPIN is stored in the token
    const {
        accountNo,
        accountHolderName,
        ifscCode,
        bankName,
        branchName,
        googlePay,
        phonePe
    } = req.body; // New fields to update
  
   
    try {
        // Find the user by EPIN
        const user = await clientModel.findOne({ epin : epin });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update the user's fields with the new data
        if (accountNo) user.accountNo = accountNo;
        if (accountHolderName) user.accountHolderName = accountHolderName;
        if (ifscCode) user.ifscCode = ifscCode;
        if (bankName) user.bankName = bankName;
        if (branchName) user.branchName = branchName;
        if (googlePay) user.googlePay = googlePay;
        if (phonePe) user.phonePe = phonePe;

        // Save the updated user
        const updatedUser = await user.save();
        
        return res.status(200).json({ msg: "Profile updated successfully", data: updatedUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};
exports.profileUpdate = async (req, res) => {
    const  epin  = req.user.epin; // Assuming EPIN is stored in the token
    const {
        name,
        email,
        state,
        city,
        address,
        number
    } = req.body; // New fields to update
  
   
    try {
        // Find the user by EPIN
        const user = await clientModel.findOne({ epin : epin });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update the user's fields with the new data
        if (name) user.name = name;
        if (email) user.email = email;
        if (state) user.state = state;
        if (city) user.city = city;
        if (address) user.address = address;
        if (number) user.number = number;

        // Save the updated user
        const updatedUser = await user.save();
        
        return res.status(200).json({ msg: "Profile updated successfully", data: updatedUser });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};

// exports.getUsersAtSameLevel = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         // Fetch the current user to get their level
//         const currentUser = await clientModel.findById(userId);
//         if (!currentUser) {
//             return res.status(404).json({ msg: "User not found." });
//         }
        
        
//         const userLevel = currentUser.level;
        
//         // Find users at the same level, with 'halt' as false and 'activate' as true
//         const usersAtSameLevel = await clientModel.find({
//             level: userLevel,
//             halt: false,
//             activate: true,
//             _id: { $ne: userId },  // Exclude the current user
//         })

//         .select('name email level levelUpdateAt') // Select relevant fields, including levelUpdateAt
//         .sort({ levelUpdateAt: 1 }); // Sort by 'levelUpdateAt' in ascending order
        
//         // if (userLevel === 0) {
//         //     return res.status(200).json({
//         //         msg: 'hoo gya',
//         //         data: currentUser.sponsorId,
//         //     })
//         // }

//         if (usersAtSameLevel.length === 0) {
//             return res.status(404).json({
//                 msg: `No active users found at level ${userLevel} with 'halt' set to false.`
//             });
//         }

//         return res.status(200).json({
//             msg: `Users at level ${userLevel} who are active and not halted, sorted by level update.`,
//             data: usersAtSameLevel,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "An error occurred.", error: error.message });
//     }
// };

exports.getUsersAtSameLevel = async (req, res) => {
    const userId = req.user.id;

    try {
        // Fetch the current user to get their level and sponsorId
        const currentUser = await clientModel.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ msg: "User not found." });
        }

        const userLevel = currentUser.level;

        if (userLevel === 0) {
            const sponsor = await clientModel.findOne({ epin: currentUser.sponsorId })
                .select('name email level levelUpdateAt sponsorId epin'); // Select relevant fields
                

            if (!sponsor) {
                return res.status(404).json({
                    msg: "Sponsor not found for the current user.",
                });
            }

            return res.status(200).json({
                msg: "User is at level 0. Returning their sponsor information.",
                data: sponsor,
            });
        }

        // Find users at the same level, with 'halt' as false and 'activate' as true
        const usersAtSameLevel = await clientModel.find({
            level: userLevel,
            halt: false,
            activate: true,
            _id: { $ne: userId }, // Exclude the current user
        })
           // Select relevant fields
            .sort({ levelUpdateAt: 1 }); // Sort by '  .select('name email level levelUpdateAt')levelUpdateAt' in ascending order

        if (usersAtSameLevel.length === 0) {
            return res.status(404).json({
                msg: `No active users found at level ${userLevel} with 'halt' set to false.`,
            });
        }
    
         
        return res.status(200).json({
            msg: `Users at level ${userLevel} who are active and not halted, sorted by level update.`,
            data: usersAtSameLevel,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred.", error: error.message });
    }
};

const getTotalActiveDownlines = async (sponsorId) => {
    // Fetch immediate downlines where activate is true
    const downlines = await clientModel.find({ sponsorId, activate: true }).select('epin name number email'); 
    let totalActiveDownlines = downlines.length; // Count immediate active downlines

    // Recursively calculate active downlines for each child
    for (const downline of downlines) {
        const nestedActiveDownlines = await getTotalActiveDownlines(downline.epin); // Recursive call
        totalActiveDownlines += nestedActiveDownlines; // Accumulate the count
    }

    return totalActiveDownlines;
};

exports.getActivateDownaline = async(req,res) =>{
    const epin = req.user.epin
    if (!epin) {
        return res.status(400).json({ msg: "sponsorId is required" });
    }

    try {
        const allActiveDownlinesCount = await getAllDownlinesRecursive(epin);
        
        if (allActiveDownlinesCount.length === 0) {
            return res.status(404).json({ msg: "No Activate downlines found " });
        }

        return res.status(200).json({
            len:allActiveDownlinesCount.length,
            data: allActiveDownlinesCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};

// exports.getUserWithActivateStatus = async(req,res) =>{
//     try {
//         const totalActiveUser = await clientModel.find({activate:true})
//         .select ('name email number level activate')

//         if(totalActiveUser.length === 0){
//             return res.status(404).json({
//                 success:false,
//                 msg:"There is no active user"
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             msg:"User with active status",
//             count:totalActiveUser.length,
//             data:totalActiveUser
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             msg:"Error while fetching active users",
//             err:error.message
//         })
//     }
// }