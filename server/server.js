const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(cors());

const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is runninggg');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started at ${PORT}`));
