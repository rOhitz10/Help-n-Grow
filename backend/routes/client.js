const express = require("express");

const router = express.Router();

// Import controllers
const { authMiddleware , isAdmin} = require("../middleWares/auth");

const { createUserChain, getDownlines, getAllChildrenAndGrandchildren, getAllDownlineCount, getDownlinesCount, userUpdate, getUsersAtSameLevel, getUserWithActivateStatus, getActivateDownaline } = require("../controllers/chainController");
const { loginUser } = require("../controllers/loginController");
const { generateEpins, getAllEpins } = require("../controllers/epinController");
const { sendRequest, acceptRequest, rejectRequest, getRequests, mygetRequests, sendRequestToLeveledUpUser, clientFinancialDetails } = require("../controllers/requestController");
const { getUsersByLevel, getUsersWhoLeveledUpByOne } = require("../controllers/levelController");
const { totalGeneratedEpins, totalUsers } = require("../controllers/adminController");
const { tokenResetLink, resetPassword } = require("../controllers/resetPassword");


// Route mappings
router.post("/create-chain", createUserChain); 
router.post("/user-login", loginUser); // Login route (not protected) 
router.post("/generateEpins", generateEpins)     
router.post('/send-request', authMiddleware, sendRequest) 
router.post('/send-request-for-levelup',authMiddleware,sendRequestToLeveledUpUser ) 

router.post('/reset-Password-token-generate',tokenResetLink ) 
router.post('/renew-Password-reset-password',resetPassword ) 

router.get("/all-downline", authMiddleware, getDownlines); 
router.get("/count-all-direct-downline", authMiddleware, getDownlinesCount); 
router.get("/get-grand-nodes", authMiddleware, getAllChildrenAndGrandchildren); 
router.get("/count-all-downline", authMiddleware, getAllDownlineCount); 
router.get("/getEpins",authMiddleware, getAllEpins);
router.get('/my-requests', authMiddleware, mygetRequests);
router.get('/get-requests', authMiddleware, getRequests); 
router.get('/get-user-for-request',authMiddleware,getUsersAtSameLevel) 
router.get('/get-users-by-level', authMiddleware,getUsersByLevel)
router.get('/get-first-levelledUp',authMiddleware,getUsersWhoLeveledUpByOne)
router.put('/accept/:requestId', authMiddleware, acceptRequest); 
router.put('/reject/:requestId', authMiddleware, rejectRequest); 
router.put("/update-user", authMiddleware, userUpdate); 

// router.get('/get-activated-users',getUserWithActivateStatus)
router.get('/get-financial-detail',authMiddleware,clientFinancialDetails)
router.get('/total-epins',authMiddleware,totalGeneratedEpins)
router.get('/get-all-users',authMiddleware,totalUsers)
router.get('/all-active-downline',authMiddleware,getActivateDownaline)


module.exports = router;
