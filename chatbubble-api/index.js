const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});