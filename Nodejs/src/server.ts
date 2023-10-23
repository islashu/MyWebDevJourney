require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => console.log(`listening to port ${PORT} `)); // This port should be in env
