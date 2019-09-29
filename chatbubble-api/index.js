const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

server.use(cors());

const Router = require('./app');

async function verifyToken(req, res, next) {

    const idToken = req.headers.authorization

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)

        if (decodedToken) {
            req.body.uid = decodedToken.uid

            return next()

        } else {
            return res.status(401).send('You are nor authorized ...')
        }
    } catch (e) {
        return res.status(401).send('You are authorized !')
    }
}

server.use('/api', Router)

server.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});

