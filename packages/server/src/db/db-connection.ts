import mongoose from 'mongoose';

const { DB_URI } = Bun.env;

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: 'cybertrust-db',
    });

    console.log('Database Connected successfully.');
  } catch (error) {
    console.log('Faild to connect db!');
  }
};

export default connectDb;
