import mongoose from "mongoose";
async function connectToDb() {
  try {
    if (process.env.NODE_ENV == "development") {
      await mongoose.connect(`${process.env.DB}`);
      console.log("Mongo running on cloud");
    } else {
      console.log("we are not ready with the other url");
    }
  } catch (error) {
    console.log("unable to connect to MONGO", error);
  }
}
export default connectToDb;