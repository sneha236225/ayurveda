import mongoose from "mongoose";

const connectDB = async () => {
    const mongodb = process.env.DBURL;
    try {
        const response = await mongoose.connect(mongodb);
        console.log("✅ Database connected successfully")
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;