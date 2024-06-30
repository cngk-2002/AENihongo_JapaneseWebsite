import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, {
      dbName: "quizDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
