const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

server.use(cors());

const signin = require('./login/signin');
const signup = require('./login/signup');
const verifymail = require('./login/verifymail');
const profile = require('./profile/profile');
const message = require('./chat/chat');

server.use('/api', signin, signup, verifymail, profile, message)

server.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});
