import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGO_URL);
  mongoose.connection.on("error", (error: Error) => console.log(error));
  console.log(`Mongodb Connected`);
};
export { connectDB };
