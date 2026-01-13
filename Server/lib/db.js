import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `${process.env.MONGODB_URI}/chat-app`
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err);
        });

    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1); // stop server if DB fails
    }
};
