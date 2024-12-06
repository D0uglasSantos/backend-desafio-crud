const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error: ', err));

app.use('/api/atletas', require('./routes/atletaRoutes'));
app.use('/api/embarcacoes', require('./routes/embarcacaoRoutes'));
app.use('/api/eventos', require('./routes/eventoRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
