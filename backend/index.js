const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const _dirname = path.resolve(); // Use the correct name for the variable

// Define CORS options
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// Middleware to parse JSON payloads
app.use(express.json());

// Set the port
const PORT = process.env.PORT || 5000;

// Import and initialize database connection
try {
  const dbConnection = require("./config/database");
  dbConnection();
} catch (err) {
  console.error("Database connection failed:", err.message);
}

// Import routes
const newClient = require("./routes/client");
const { log } = require("console");

// Mount routes
app.use("/api/v1", newClient);

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(_dirname, "frontend", "dist")));

// Fallback route for SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

// Default route (optional; for debugging or basic info)
app.get("/", (req, res) => {
  res.send("Default Router for home screen");
});




     









/////////////////////////////////////////////FOR SEPRATE

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");

// const app = express();
// // const _dirname = path.resolve();

// // Define CORS options
// const allowedOrigins = [
//   'https://deploy01-gold.vercel.app/',
//   'https://helpngrow.onrender.com',
// ];

// // Use CORS middleware with custom configuration
// app.use(cors({
//   origin: (origin, callback) => {
//     // For local testing, allow requests without origin (i.e. when using Postman or direct API requests)
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       console.log('CORS error - Origin not allowed:', origin); // Log for debugging
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the needed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
//   credentials: true, // Support credentials (cookies, Authorization headers)
// }));

// app.use(express.json());

// // Define the Port
// const Port = process.env.PORT || 5000;

// // Database Connection
// const dbConnection = require("./config/database");
// dbConnection();

// // Import routes and use them
// const newClient = require("./routes/client");
// app.use('/api/v1', newClient);

// // Default home route for testing
// app.get("/", (req, res) => {
//   res.send("Default Router for home screen");
// });

// // Start the server
// app.listen(Port, () => {
//   console.log(`Server is listening at Port number ${Port}`);
// });
