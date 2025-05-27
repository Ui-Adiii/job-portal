import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`); 
    console.log('Connected SuccessFully');
  } catch (error) {
    console.log(error.message)
  }
}

export default connectDB;