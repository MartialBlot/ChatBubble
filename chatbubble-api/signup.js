const express = require('express')
const server = express()
const admin = require('./firebase-admin/admin')
const router = express.Router()
const db = admin.firestore();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/signup/:userId', (req, res) => {
	console.log(req)
	const saltRounds = 10;	
	const data = req.body
	data.password = bcrypt.hashSync(data.password, saltRounds);
    const userName = req.params.userId
    const docRef = db.collection("userProfiles").doc(userName)
    let newInfos = docRef.set({
        "login" : data.login,
        "name" : data.name,
        "surname" : data.surname,
        "mail" : data.email,
        "password" : data.password,
        "confirmed" : 0,
    });

	/*sending email*/
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: data.email,
    from: 'no-reply@chatbubble.tk',
    subject: 'Chatbubble - Signup',
    text: `Welcome to ChatBubble ! Click on the link below to verify your account. http://localhost:1234/api/email=${data.login}`,
    html: `<a><strong>Welcome to ChatBubble ! Click on the link below to verify your account.</a> <br /> <a href="http://localhost:1234/api/email=${data.login}">Click here</a></div>`,
    };
    sgMail.send(msg);
	/*end sending email*/

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

module.exports = router
