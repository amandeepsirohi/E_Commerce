import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/test")
        console.log("Successfully connected to db")
    }
    catch(error)
    {
        console.error(`ERROR :${error.message}`)
        process.exit(1);
    }
};

export default connectDB;