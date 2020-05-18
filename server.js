require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connected'));

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/app'));

const PORT = process.env.PORT;

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);
