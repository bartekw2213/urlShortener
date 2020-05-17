require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);
