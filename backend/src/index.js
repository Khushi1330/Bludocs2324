import dotenv from "dotenv";
dotenv.config();

console.log("Loaded ENV:", {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  PORT: process.env.PORT,
});

import app from "./app.js";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  

});
