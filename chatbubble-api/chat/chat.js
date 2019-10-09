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

//Post message
router.post("/messages", (req, res) => {
  let message = req.body;
  let messageKey = [message.from, message.to].sort().join("-");

  //Create unique id
  let refId = db
    .ref()
    .child("messages")
    .push().key;
  let path = db.ref(`messages/${messageKey}/${refId}`);
  let setMessage = path.set({
    from: message.from,
    to: message.to,
    message: message.message,
    date: message.date
  });
  res.status(200).json({
    messageInfos: message,
    status: "Great work",
    success: true
  });
});

router.get("/messages", (req, res) => {
  let path = db.ref(`messages`);
  let getMessage = path.once("value").then(v => {
    res.status(200).json({
      nodeUsers: Object.keys(v.val()),
      status: "Great work",
      success: true
    });
  });
});

// router.get("/lol", (req, res) => {
//   let ref = db.ref(`messages`);

//   ref.on(
//     "value",
//     function(snapshot) {
//       res.status(200).json({
//         messages: snapshot.val(),
//         success: true
//       });
//     },
//     function(errorObject) {
//       console.log("The read failed: " + errorObject.code);
//     }
//   );
// });

// router.get("/lol2", (req, res) => {
//   let ref = db.ref(`messages`);

//   ref.on("child_added", function(snapshot, prevChildKey) {
//     var newPost = snapshot.val();
//     // console.log(snapshot.val());
//     console.log("NewID: " + ChildKey);
//     console.log("Previous Post ID: " + prevChildKey);
//   });
// });

//Get Messages
router.get("/messages/:idUsers", (req, res) => {
  let users = req.params.idUsers;
  // let messageKey = [users.from, users.to].sort().join('')
  let path = db.ref(`messages/${users}`);
  let getMessage = path.once("value").then(v =>
    res.status(200).json({
      messages: v.val(),
      status: "Great work",
      success: true
    })
  );
});

/// TESTTESTTEST ///
/// getting all messages from userId ///

var getmessages = function(req, res, next) {
  let userId = req.params.userId;
  let ref = db.ref(`messages`);
  let contacts = [];
  let allmessages = [];
  var value = new Object();
  values = [];
  end = 0;

  ref.once("value").then(v => {
    Object.keys(v.val()).forEach(function(data) {
      let users = data.split("-");
      if (users[0] === userId || users[1] === userId) {
        let ref2 = db.ref(`messages/${data}`);
        ref2.on("child_added", v => {
          value = v.val();
          values.push(value);
          console.log(values);
          console.log(value);
        });

        // fonctionne stream des messages d'un user
        // ref2.on("child_added", v => {
        //   var value = v.val();
        //   console.log(value);
        //   console.log(value.date);
        // });
        // //////
      }
    });
    end = 1;
    // setTimeout(console.log("VALUE :", values), 4000);
    // console.log("VALUE :", values);
  });
  //   while (end !== 1) {}
  //   let a = 1;
  //   while (a < 10000000000) a++;
  //   console.log("VALUES :", values);
  next();
};

var sendit = function(req, res, next) {
  //   console.log(req.values);
  console.log("FINI");
  res.status(200).json({
    // messages: next.values,
    status: "Great work",
    success: true
  });
};

router.get("/allmessages/:userId", [getmessages, sendit]);

//Delete message
router.delete("/messages/:messageId", (req, res) => {
  let users = req.body;
  let messageId = req.params.messageId;
  let messageKey = [users.from, users.to].sort().join("");
  let path = db.ref(`messages/${messageKey}/${messageId}`);
  let deleteMessage = path.remove();
  res.status(200).json({
    response: "le message est bien supprimé",
    status: "Great work",
    success: true
  });
});

module.exports = router;

// router.get("/allmessages/:userId", (req, res) => {
// 	let userId = req.params.userId;
// 	let ref = db.ref(`messages`);
// 	let contacts = [];
// 	let allmessages = [];
// 	var value = new Object();
// 	var values = [];

// let messageKey = [users.from, users.to].sort().join('')

//   ref
//     .child("")
//     .orderByChild("from")
//     .equalTo("Nico(admin)")
//     .on("value", function(snapshot) {
//       console.log(snapshot.val());
//       snapshot.forEach(function(data) {
//         console.log(data.key);
//       });
//     });

// ref.once("value").then(v =>
//   Object.keys(v.val()).forEach(function(data) {
//   console.log(data);
// let users = data.split("-");
//   console.log(users);
//   console.log(userId);
// if (users[0] === userId || users[1] === userId) {
//   let ref2 = db.ref(`messages/${data}`);
//   ref2.once("child_added", v => {
// 	value = v.val();
// 	values.push(value);
// 	console.log(value);
//   });

// fonctionne stream des messages d'un user
// ref2.on("child_added", v => {
//   var value = v.val();
//   console.log(value);
//   console.log(value.date);
// });
// //////

// console.log(v.val());
// contacts.push(data);
// }
// if (contacts) console.log("CONTACTS :", contacts);
//   if (allmessages) console.log("ALLMESSAGES : ", allmessages);
// 	  })
// 	);
// 	console.log(values);
// 	res.status(200).json({
// 	  messages: values,
// 	  status: "Great work",
// 	  success: true
// 	});
//   });

//     ref
//       .orderByChild("from")
//       .equalTo("Nico(admin)")
//       .once("value")
//       .then(v =>
//         res.status(200).json({
//           messages: v.val(),
//           status: "Great work",
//           success: true
//         })
//       );
// });
// .on("child_added", function(snapshot) {
//   console.log(snapshot.key);
// });

//   let getMessage = path.once("value").then(v =>
//     res.status(200).json({
//       messages: v.val(),
//       status: "Great work",
//       success: true
//     })
//   );
// });
