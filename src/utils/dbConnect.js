import mongoose from "mongoose";
import printStatement from "./printStatement.js";

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_URL).then(() => {
    printStatement("DB Connected");
  });
};

export default dbConnect;
