const express = require('express')
const server = express()
const admin = require('../firebase-admin/admin')
const router = express.Router()
const db = admin.firestore();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/signin/:userId', (req, res) => {
    const data = req.body
	const userName = req.params.userId
    let newToken
    let path = db.collection('userProfiles').doc(userName);

    admin.auth().createCustomToken(userName)
        .then(function(customToken) {
            newToken = customToken
        })
        .catch(function(error) {
            console.log('Error creating custom token:', error);
        });

    let user = path.get()
        .then(doc => {
            if (!doc.exists) {
                console.log("User doesn't exist");
                return res.status(200).json({
                    status: "User doesn't exist",
                    success: false,
                });
            } else {
                if (data.password && doc.data().password && bcrypt.compareSync(data.password, doc.data().password) && doc.data().confirmed === true){
                    console.log('Login successful !')
                    return res.status(200).json({
                        status: 'Login successful!',
                        success: true,
                        token: newToken
                    });}
                if (!data.password || !doc.data().password || !bcrypt.compareSync(data.password, doc.data().password)){
                    console.log("Wrong password !");
                    return res.status(200).json({
                        status: 'Wrong password !',
                        success: false,
                    });}
                if (doc.data().confirmed === 0) {
                    console.log('Account not verified !')
                    return res.status(200).json({
                        status: 'Account not verified !',
                        success: false,
                    });
                }
                else {
					console.log("Wrong password !");
                    return res.status(200).json({
                        status: 'Wrong password !',
                        success: false,
                    });
                }
            }
        })
        .catch(err => {
            console.log('Connection error', err);
        });
})

module.exports = router