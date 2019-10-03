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
        let path = db.collection('userProfiles').doc(verifyid);
        if (!verifyid) throw new Error('id is blank');
        const verify = path.update({ confirmed: true });
        if (verify) {
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
    } catch(error){
        console.log('Connection error', error);
    }
    });

module.exports = router