import dotenv from "dotenv";

dotenv.config();

export default {
  baseUrl: process.env.BASE_URL || "http://localhost",
  db: {
    name: "gradeBookDB",
    uri: process.env.MONGODB_URI,
  },
  encryption: {
    expiration: process.env.EXPIRATION || "1d",
    saltRounds: process.env.SALT_ROUNDS || 10,
    secret: process.env.SECRET || "secret",
  },
  port: process.env.PORT || 3000,
};
