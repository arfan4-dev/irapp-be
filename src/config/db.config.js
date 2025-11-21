// connectDB.js
import mongoose from 'mongoose';
import { DATABASE_URL, DB_NAME } from './env.config.js';
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(DATABASE_URL, {
      dbName: DB_NAME
    });
    return `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`;
  } catch (error) {
    
    process.exit(1);
  }
};

export default connectDB;