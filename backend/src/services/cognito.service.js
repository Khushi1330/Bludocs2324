// services/cognito.service.js
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

export const signUp = async ({ email, password }) => {
  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
  });
  return await client.send(command);
};

export const login = async ({ email, password }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });
  return await client.send(command);
};
