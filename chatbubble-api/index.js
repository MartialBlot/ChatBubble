const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

server.use(cors());

const Router = require('./app');

server.use('/api', Router)

server.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});

