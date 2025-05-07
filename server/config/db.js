
// filepath: c:\Users\dell\my-app\backend\config\db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arhrabir:K7zjs3ceLhvLfSvh@sahtek.1cjkc.mongodb.net/?retryWrites=true&w=majority&appName=Sahtek'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB Connected:', client.s.url);
  } catch (error) {// filepath: c:\Users\dell\my-app\backend\config\db.js
    const { MongoClient } = require('mongodb');
    
    const uri = 'mongodb+srv://arhrabir:K7zjs3ceLhvLfSvh@sahtek.1cjkc.mongodb.net/?retryWrites=true&w=majority&appName=Sahtek'; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);
    
    const connectDB = async () => {
      try {
        await client.connect();
        console.log('MongoDB Connected:', client.s.url);
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
      }
    };
    
    module.exports = { connectDB, client };
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB, client };