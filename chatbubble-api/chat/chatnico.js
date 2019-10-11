const express = require("express");
const admin = require("../firebase-admin/admin");
const router = express.Router();
const db = admin.database();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.get("/mess/:userId", async (req, res) => {
  let userId = req.params.userId;
  let ref = db.ref(`messages`);
  let contacts = [];
  let allmessages = [];
  var value = new Object();
  values = [];
  end = 0;
  try {
    ref
      .once("value")
      .then(v => {
        console.log(Object.keys(v.val()));
        Object.keys(v.val()).forEach(function(data) {
          let users = data.split("-");
          if (users[0] === userId || users[1] === userId) {
            let ref2 = db.ref(`messages/${data}`);
            ref2.once("child_added").then(v => {
              value = v.val();
              values.push(value);
              console.log(values);
            });
          }
        });
        // .then(console.log("lol"));
        // res.status(200).json({
        //   ids: Object.keys(v.val()),
        //   mess: values,
        //   // lol: lol,
        //   status: "Error !",
        //   success: true
        // });
      })
      .then(console.log("lol"));
  } catch (error) {
    console.log("Connection error", error);
    res.status(200).json({
      status: "Error !",
      success: true
    });
  }
});

async function fonctionAsynchrone1() {
  let userId = "Nico(admin)";
  let ref = db.ref(`messages`);
  values = [];
  end = 0;
  ref.once("value").then(v => {
    console.log(Object.keys(v.val()));
    return "lol";
    //   .forEach(function(data) {
    // let users = data.split("-");
    // if (users[0] === userId || users[1] === userId) {
    //   let ref2 = db.ref(`messages/${data}`);
    //   ref2.once("child_added", v => {
    // value = v.val();
    // values.push(value);
    //   });
    //   return values;
  });
}

var getmessages = async function(req, res, next) {
  let userId = req.params.userId;
  let ref = db.ref(`messages`);
  let contacts = [];
  let allmessages = [];
  var value = new Object();
  values = [];
  end = 0;

  const value1 = await fonctionAsynchrone1();

  //   var mess = ref.once("value");
  //   .then(v => {
  // Object.keys(v.val()).forEach(function(data) {
  //   let users = data.split("-");
  //   if (users[0] === userId || users[1] === userId) {
  //     let ref2 = db.ref(`messages/${data}`);
  //     ref2.once("child_added", v => {
  //       value = v.val();
  //       values.push(value);
  //       //   console.log(values);
  //       //   console.log(value);
  //     });
  //   }
  // });
  //   });

  return res.status(200).json({
    response: value1,
    status: "Great work",
    success: true
  });
};

router.get("/allmess/:userId", async (req, res) => {
  let userId = req.params.userId;
  let ref = db.ref(`messages`);
  let contacts = [];
  let allmessages = [];
  var value = new Object();
  values = [];
  end = 0;
  try {
    return fonctionAsynchrone1().then(
      console.log("lol")
      //   res.status(200).json({
      //     response: "lol",
      //     status: "Great work",
      //     success: true
      //   })
    );
  } catch (error) {
    console.log("Connection error", error);
    res.status(200).json({
      status: "Error !",
      success: true
    });
  }
});

module.exports = router;
