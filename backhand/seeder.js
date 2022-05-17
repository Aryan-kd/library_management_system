// Adding Data TO DB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/user.js';
import { books, newBooks } from './data/data.js';
import User from './model/userModel.js';
import Bookes from './model/bookModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //   Deleting Previous Data
    await User.deleteMany();
    await Bookes.deleteMany();

    // Inserting New Data
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBooks = books.map((p) => {
      return { ...p, user: adminUser };
    });

    await Bookes.insertMany(sampleBooks);

    console.log(`Data Imported`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
const importNewData = async () => {
  try {
    //   Deleting Previous Data
    await User.deleteMany();

    // Inserting New Data
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBooks = newBooks.map((p) => {
      return { ...p, user: adminUser };
    });

    await Bookes.insertMany(sampleBooks);

    console.log(`New Data Imported`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //   Deleting Previous Data
    await User.deleteMany();
    await Bookes.deleteMany();

    console.log(`Data Destroyed`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-n') {
  importNewData();
} else {
  importData();
}
