import dotenv from "dotenv";
dotenv.config();

const data = {
  PORT: process.env.PORT || 8000,
  DB: process.env.DB,
  NODE_ENV: process.env.NODE_ENV || "development",
  POSTGRES_AIVEN_PASSWORD: process.env.POSTGRES_AIVEN_PASSWORD,
  POSTGRES_AIVEN_PORT: process.env.POSTGRES_AIVEN_PORT,
  POSTGRES_AIVEN_HOST: process.env.POSTGRES_AIVEN_HOST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

export default data;