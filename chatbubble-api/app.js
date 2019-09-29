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
})

// router.get('/', (req, res) => {
//     let path = db.collection('UserProfiles').doc('Name');
//     let user = path.get()
//         .then(doc => {
//             if (!doc.exists) {
//                 console.log('No user');
//             } else {
//                 console.log(doc.data());
//                 res.send(doc.data())
//             }
//         })
//         .catch(err => {
//             console.log('Connection error', err);
//         });
// })





module.exports = router


