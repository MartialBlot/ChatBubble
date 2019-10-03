const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

server.use(cors());

const signin = require('./login/signin');
const signup = require('./login/signup');
const verifymail = require('./login/verifymail');

server.use('/api', signin, signup, verifymail)

server.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});
