import { generateUploadUrl } from "../services/s3.service.js";
import { saveMetadata, getDocumentsByUser } from "../services/dynamo.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getSignedUrl = asyncHandler(async (req, res) => {
  const { filename, contentType } = req.body;
  const { uploadUrl, key } = await generateUploadUrl(filename, contentType);
  res.json({ uploadUrl, key });
});

export const saveFileMetadata = asyncHandler(async (req, res) => {
  const { filename, key, size, contentType } = req.body;
  const userId = req.user.sub;

  await saveMetadata({ filename, key, size, contentType, userId });
  res.status(201).json({ message: "Metadata saved" });
});

export const listDocuments = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const documents = await getDocumentsByUser(userId);
  res.json(documents);
});
