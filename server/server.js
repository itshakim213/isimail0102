const express = require('express');
const app = express();
//Importe le middleware CORS pour gérer les requêtes cross-origin.
const cors = require('cors');
// Importe le package dotenv pour charger les variables d'environnement depuis un fichier .env.
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Chargement des variables d'environement
dotenv.config({ path: './server/.env' });
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//Connection to MongoDB cloud
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

//Gestion de routes
const userRoutes = require('./routes/UserRoutes');
const mailRoutes = require('./routes/MailRoutes');
app.use('/api', userRoutes);
app.use('/api', mailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
