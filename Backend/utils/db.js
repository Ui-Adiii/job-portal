import mongoose from 'mongoose'

const connectDB = async () => {
  try {
   await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`); 
    console.log('Connected SuccessFully');
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

export default connectDB;