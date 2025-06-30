import { signUp, login } from "../services/cognito.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const handleSignUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await signUp({ email, password });
  res.status(201).json({ message: "Signup successful", data: response });
});

export const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await login({ email, password });
  res.status(200).json({ token: response.AuthenticationResult.IdToken });
});
