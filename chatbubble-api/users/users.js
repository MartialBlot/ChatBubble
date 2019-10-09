const express = require("express");
const admin = require("../firebase-admin/admin");
const router = express.Router();
const db = admin.firestore();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
let mailurl;
if (process.env.CHATBUBBLE === "DEV") mailurl = "http://localhost:1234/verify/";
else mailurl = "http://35.197.209.176:1234/verify/";

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/////// GET : Infos all users ///////

router.get("/users", (req, res) => {
  let path = db.collection("userProfiles");
  let users = [];
  path.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      users.push(doc.data());
    });
    return res.status(200).json({
      users: users,
      success: true
    });
  });
});

/////// GET : Infos userId ///////

router.get("/users/:userId", (req, res) => {
  const userName = req.params.userId;
  let path = db.collection("userProfiles").doc(userName);

  path.get().then(doc => {
    res.status(200).json({
      user: doc.data(),
      success: true
    });
  });
});

/////// POST : email? login? -> Mettre nouvel user en base ///////

var verifyemail = function(req, res, next) {
  const data = req.body;
  let mailRef = db.collection("userProfiles").where("mail", "==", data.email);
  mailRef
    .get()
    .then(mails => {
      if (mails.empty) {
        next();
        return;
      }
      console.log("Email already exist !");
      return res.status(200).json({
        status: "Email alreasy exist !",
        success: false
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

var putuserinbase = function(req, res) {
  const sgMail = require("@sendgrid/mail");
  const saltRounds = 10;
  const data = req.body;
  let docRef = db.collection("userProfiles").doc(data.login);
  data.password = bcrypt.hashSync(data.password, saltRounds);
  let user = docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("User already exist !");
        return res.status(200).json({
          status: "User already exist !",
          success: false
        });
      } else {
        let newInfos = docRef.set({
          login: data.login,
          fullname: data.fullname,
          mail: data.email,
          password: data.password,
          confirmed: false
        });
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: data.email,
          from: "no-reply@chatbubble.tk",
          subject: "Chatbubble - Signup",
          text: `Welcome to ChatBubble ! Click on the link below to verify your account. ${mailurl}${data.login}`,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  		  <html xmlns="http://www.w3.org/1999/xhtml">
  		  <head>
  		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  		  <title>Email validation</title>
  		  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  		  </head>
  		  <body style="margin: 0; padding: 0;">
  			  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  				  <tr>
  					  <td style="padding: 10px 0 30px 0;">
  						  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
  							  <tr>
  								  <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
  									  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/h1.gif" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
  								  </td>
  							  </tr>
  							  <tr>
  								  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
  									  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  										  <tr>
  											  <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
  												  <b>Welcome to the chatbubble community !</b>
  											  </td>
  										  </tr>
  										  <tr>
  											  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
  												  Please click <a href="${mailurl}${data.login}" style="color: #ffffff;"><font color="blue">here</font></a> to verify your email.
  											  </td>
  										  </tr>
  										  <tr>
  											  <td>
  												  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  													  <tr>
  														  <td width="260" valign="top">
  															  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  																  <tr>
  																	  <td>
  																		  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/left.gif" alt="" width="100%" height="140" style="display: block;" />
  																	  </td>
  																  </tr>
  																  <tr>
  																	  <td style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
  																		  Can't access the link ? Copy and paste this into your browser: ${mailurl}${data.login}
  																	  </td>
  																  </tr>
  															  </table>
  														  </td>
  														  <td style="font-size: 0; line-height: 0;" width="20">
  															  &nbsp;
  														  </td>
  														  <td width="260" valign="top">
  															  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  																  <tr>
  																	  <td>
  																		  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/right.gif" alt="" width="100%" height="140" style="display: block;" />
  																	  </td>
  																  </tr>
  																  <tr>
  																	  <td style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
  																		  If you didn't signup with Chatbubble, you can just ignore this email.
  																	  </td>
  																  </tr>
  															  </table>
  														  </td>
  													  </tr>
  												  </table>
  											  </td>
  										  </tr>
  									  </table>
  								  </td>
  							  </tr>
  							  <tr>
  								  <td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
  									  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  										  <tr>
  											  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
  												  &reg; Chatbubble, Paris 2019<br/>
  												  <a href="#" style="color: #ffffff;"><font color="#ffffff">Unsubscribe</font></a> to this newsletter instantly
  											  </td>
  											  <td align="right" width="25%">
  												  <table border="0" cellpadding="0" cellspacing="0">
  													  <tr>
  														  <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
  															  <a href="http://www.twitter.com/" style="color: #ffffff;">
  																  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/tw.gif" alt="Twitter" width="38" height="38" style="display: block;" border="0" />
  															  </a>
  														  </td>
  														  <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
  														  <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
  															  <a href="http://www.twitter.com/" style="color: #ffffff;">
  																  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/fb.gif" alt="Facebook" width="38" height="38" style="display: block;" border="0" />
  															  </a>
  														  </td>
  													  </tr>
  												  </table>
  											  </td>
  										  </tr>
  									  </table>
  								  </td>
  							  </tr>
  						  </table>
  					  </td>
  				  </tr>
  			  </table>
  		  </body>
  		  </html>`
        };
        sgMail.send(msg);
        return res.status(200).json({
          status: "Successfully registered !",
          success: true
        });
      }
    })
    .catch(err => {
      console.log("Connection error", err);
    });
};

router.post("/users", [verifyemail, putuserinbase]);

////// PUT : Update userId //////

router.put("/users/:userId", async (req, res) => {
  try {
    const verifyid = req.params.userId;
    if (!verifyid) throw new Error("id is blank");
    const data = req.body;
    if (data.password) {
      const saltRounds = 10;
      const data = req.body;
      data.password = bcrypt.hashSync(data.password, saltRounds);
    }
    let path = db.collection("userProfiles").doc(verifyid);
    path
      .update(data)
      .then(verify => {
        if (verify) {
          res.status(200).json({
            status: "Update done !",
            success: true
          });
        } else {
          res.status(200).json({
            status: "Update KO !",
            success: false
          });
        }
      })
      .catch(error => {
        console.log("Connection error", error);
        res.status(200).json({
          status: "Error !",
          success: false
        });
      });
  } catch (error) {
    console.log("Connection error", error);
    res.status(200).json({
      status: "Error !",
      success: true
    });
  }
});

module.exports = router;
