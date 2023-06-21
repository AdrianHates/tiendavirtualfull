import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const database = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB is connected')
  } catch(error) {
  console.log(error)}};

 