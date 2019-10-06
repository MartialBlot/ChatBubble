const express = require("express");
const server = express();
const admin = require("../firebase-admin/admin");
const router = express.Router();
const db = admin.firestore();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.post("/login", (req, res) => {
  console.log("lol");
  const data = req.body;
  const userName = data.login;
  console.log(userName);
  let path = db.collection("userProfiles").doc(userName);

  // admin
  //   .auth()
  //   .createCustomToken(userName)
  //   .then(function(customToken) {
  //     newToken = customToken;
  //   })
  //   .catch(function(error) {
  //     console.log("Error creating custom token:", error);
  //   });

  let user = path
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("User doesn't exist");
        return res.status(200).json({
          status: "User doesn't exist",
          success: false
        });
      } else {
        if (
          data.password &&
          doc.data().password &&
          bcrypt.compareSync(data.password, doc.data().password) &&
          doc.data().confirmed === true
        ) {
          let token = jwt.sign(
            { username: data.login },
            "acer clope electronique",
            { expiresIn: 129600 }
          );
          console.log("Login successful !");
          return res.status(200).json({
            status: "Login successful!",
            success: true,
            token: token
          });
        }
        if (
          !data.password ||
          !doc.data().password ||
          !bcrypt.compareSync(data.password, doc.data().password)
        ) {
          console.log("Wrong password !");
          return res.status(200).json({
            status: "Wrong password !",
            success: false
          });
        }
        if (doc.data().confirmed === false) {
          console.log("Account not verified !");
          return res.status(200).json({
            status: "Account not verified !",
            success: false
          });
        } else {
          console.log("Wrong password !");
          return res.status(200).json({
            status: "Wrong password !",
            success: false
          });
        }
      }
    })
    .catch(err => {
      console.log("Connection error", err);
    });
});

module.exports = router;
