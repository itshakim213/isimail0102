const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://user2212:user2212@isinnovate.9mvjqgg.mongodb.net/?retryWrites=true&w=majority',
    );
    console.log(`mongobd connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
