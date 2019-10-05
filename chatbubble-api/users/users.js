const express = require("express");
const admin = require("../firebase-admin/admin");
const router = express.Router();
const db = admin.firestore();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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

router.post("/users", (req, res) => {
  const bcrypt = require("bcrypt");
  const sgMail = require("@sendgrid/mail");
  const saltRounds = 10;
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, saltRounds);
  const userName = data.login;
  const docRef = db.collection("userProfiles").doc(userName);
  console.log("User already exist");
  let user = docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("User already exist");
        return res.status(200).json({
          status: "User already exist",
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
          text: `Welcome to ChatBubble ! Click on the link below to verify your account. http://localhost:1234/verify/${data.login}`,
          html: `<a><strong>Welcome to ChatBubble ! Click on the link below to verify your account.</a> <br /> <a href="http://localhost:1234/verify/${data.login}">Click here</a></div>`
        };
        sgMail.send(msg);
        return res.status(200).json({
          status: "Login successful!",
          success: true
        });
      }
    })
    .catch(err => {
      console.log("Connection error", err);
    });
});

router.put("/users/:userId", async (req, res) => {
  try {
    const token = verifyIdToken(req.params.userId);
    console.log(token);
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
