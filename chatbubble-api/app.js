const express = require('express')
const server = express()
const admin = require('./firebase-admin/admin')
const router = express.Router()
const db = admin.firestore();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/signup/:userId', (req, res) => {
    console.log(req)
    const data = req.body
    const userName = req.params.userId
    const docRef = db.collection("userProfiles").doc(userName)

    let newInfos = docRef.set({
        "mail" : data.email,
        "password" : data.password,
    });

    admin.auth().createCustomToken(userName)
        .then(function(customToken) {
            return res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: customToken
            });
        })
        .catch(function(error) {
            console.log('Error creating custom token:', error);
        });
})

router.get('/signin/:userId', (req, res) => {
    const data = req.body
    const userName = req.params.userId
    let path = db.collection('userProfiles').doc(userName);
    let user = path.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No user');
            } else {
                if(data === doc.data()){
                    admin.auth().createCustomToken(userName)
                        .then(function(customToken) {
                            return res.status(200).json({
                                status: 'Login successful!',
                                success: true,
                                token: customToken
                            });
                        })
                        .catch(function(error) {
                            console.log('Error creating custom token:', error);
                        });
                } else {
                    return res.status(200).status('Wrong Login ...')
                }
                res.send(doc.data())
            }
        })
        .catch(err => {
            console.log('Connection error', err);
        });
})


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


module.exports = router


