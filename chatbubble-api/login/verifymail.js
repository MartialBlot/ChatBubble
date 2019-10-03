const express = require('express')
const server = express()
const admin = require('../firebase-admin/admin')
const router = express.Router()
const db = admin.firestore();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.put('/verify/:userId', async (req, res) => {
    try {
        const verifyid = req.params.userId
        if (!verifyid) throw new Error('id is blank');
        let path = db.collection('userProfiles').doc(verifyid);
        const verify2 = path.update({ confirmed: true })
        .then(verify => {
        if (verify.exists) {
            res.status(200).json({
                status: "Account verified !",
                success: true,
            });
        } else {
            res.status(200).json({
                status: "Account not verified !",
                success: true,
            });
        }
    }) .catch(error => {
        console.log('Connection error', error);
        res.status(200).json({
            status: "Error : Account not verified !",
            success: true,
        });
    });
} catch(error) {
    console.log('Connection error', error);
    res.status(200).json({
        status: "Error : Account not verified !",
        success: true,
    });
}})

module.exports = router