import dotenv from "dotenv";
dotenv.config();

const data = {
  PORT: process.env.PORT || 8000,
  DB: process.env.DB,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default data;