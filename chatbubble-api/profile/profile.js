const express = require('express')
const admin = require('../firebase-admin/admin')
const router = express.Router()
const db = admin.firestore()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

//Get all profiles
router.get('/profiles', (req, res) => {
    let path = db.collection('userProfiles')
    let user = []
    let users = []

    let profiles = path.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            user.push(doc.data())
        })
        res.status(200).json({
            users: user
        });
    })
})

//Get profile byUserId
router.get('/profile/:userId', (req, res) => {

    const userName = req.params.userId
    let path = db.collection('userProfiles').doc(userName)

    let profile = path.get().then(doc => {
        res.status(200).json({
            users: doc.data()
        })
        })
})

module.exports = router
