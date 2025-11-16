import mongoose from 'mongoose';
// import seedAdmin from '../scripts/seed-admin';

const { DB_URI } = Bun.env;

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: 'cybertrust-db',
    });

    // await seedAdmin();

    console.log('Database Connected successfully.');
  } catch (error) {
    console.log('Faild to connect db!');
    process.exit(1);
  }
};

export default connectDb;
