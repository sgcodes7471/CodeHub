import mongoose from "mongoose";
import data from "./server_config.js";
async function connectToDb() {
  try {
    if (data.NODE_ENV == "development") {
      await mongoose.connect(data.DB);
      console.log("Connection established!");
    } else {
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    console.log("unable to connect to MONGO", error);
  }
}
export default connectToDb;