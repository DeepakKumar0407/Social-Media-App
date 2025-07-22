import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://Deepak0407:Deepak0407@cluster0.myf7xyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
