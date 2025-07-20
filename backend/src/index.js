import dotenv from "dotenv";
dotenv.config();

import express from "express"; // Make sure to import express here
import cors from "cors";       // Import cors middleware
import app from "./app.js";    // Your existing app import

// Enable CORS for all origins
app.use(cors());

console.log("Loaded ENV:", {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT,
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
