import { google } from "googleapis";

const getGoogleAuth = () => {
  const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
  });
  return { auth };
};

export const getDrive = () => {
  const { auth } = getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });
  return drive;
};
