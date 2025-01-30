import { google } from "googleapis";
import { createClient } from "redis";

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

const client = createClient({
  url: process.env.INTERNAL_REDIS_URL,
});
client.on("error", (err) => console.error("Redis Client Error", err));

client.connect().catch(console.error);

export const redisCache = {
  async get(key: string) {
    return await client.get(key);
  },
  async set(key: string, value: string, expireInSeconds = 86400) {
    await client.set(key, value, { EX: expireInSeconds });
  },
};
