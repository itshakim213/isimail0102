const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://lili:1234@cluster0.yfaacif.mongodb.net/?retryWrites=true&w=majority',
    );
    console.log(`mongobd connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
