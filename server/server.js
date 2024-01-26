const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const messageRoutes = require('./routes/messageRoutes');
// const mailRoutes = require('./routes/MailRoutes');
const mailRouteSI = require('./routes/mailRouteSI');
const mailBoxRoutes = require('./routes/mailBoxRoutes');
const EventsRoute = require('./routes/EventsRoute');

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
// creer une api pour l'envoi des messages
app.use('/api/message', messageRoutes);
//app.use('/api', mailRoutes);
app.use('/api/mail', mailRouteSI);
app.use('/api/retrieve', mailBoxRoutes);
app.use('/api/agenda', EventsRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started at ${PORT}`));
