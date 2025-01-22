// const cron = require("node-cron");
// const Client = require("../models/clientModel");  // Assuming the Client model is here

// // Cron job to deactivate users who received 2 requests but haven't sent any in 2 days
// cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
//     try {
//         const usersToDeactivate = await Client.find({
//             activate: true,
//             receivedRequestsAt: { $exists: true },
//             receivedRequestsAt: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // 2 days ago
//             newLinksReceived: { $gte: 2 },
//             receivedRequestsAt: { $ne: null }, // Ensure they have received 2 requests
//         });

//         // Deactivate users who have received 2 requests and haven't sent any in 2 days
//         for (let user of usersToDeactivate) {
//             user.activate = false;
//             await user.save();
//             console.log(`Deactivated user ${user.name} because they have received 2 requests but haven't sent any.`);
//         }
//     } catch (error) {
//         console.error("Error deactivating users:", error);
//     }
// });
const cron = require("node-cron");
const Client = require("../models/clientModel");  // Assuming the Client model is here

// Cron job to deactivate users who have received exactly 2 requests but haven't sent any in 2 days
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    try {
        const usersToDeactivate = await Client.find({
            activate: true,
            newLinksReceived: {$gte: 2}, // User has received exactly 2 requests
            receivedRequestsAt: { $exists: true },
            receivedRequestsAt: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // 2 days ago
            lastRequestSentAt: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // User has not sent a request in the last 2 days
        });

        // Deactivate users who meet the above conditions
        for (let user of usersToDeactivate) {
            user.activate = false;
            await user.save();
            console.log(`Deactivated user ${user.name} because they received 2 requests but haven't sent any in the last 2 days.`);
        }
    } catch (error) {
        console.error("Error deactivating users:", error);
    }
});
