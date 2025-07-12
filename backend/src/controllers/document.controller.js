import { generateUploadUrl } from "../services/s3.service.js";
import { saveMetadata, getDocumentsByUser } from "../services/dynamo.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getSignedUrl = asyncHandler(async (req, res) => {
  const { fileName, contentType } = req.body;
  const { uploadUrl, key } = await generateUploadUrl(fileName, contentType);
  res.json({ uploadUrl, key });
});

export const saveFileMetadata = asyncHandler(async (req, res) => {
  const { fileName, key, size, contentType } = req.body;
  const userId = req.user.sub;

  await saveMetadata({ fileName, key, size, contentType, userId });
  res.status(201).json({ message: "Metadata saved" });
});

export const listDocuments = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const documents = await getDocumentsByUser(userId);
  res.json(documents);
});
