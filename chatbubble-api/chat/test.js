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

router.get("/allmessages/:userId", async (req, res) => {
  let userId = req.params.userId;

  async function getlinks() {
    let ref = db.ref(`messages`);
    let links = await ref.once("value").then(v => {
      return Object.keys(v.val());
    });
    return links;
  }

  async function getmessages(link) {
    let ref2 = db.ref(`messages/${link}`);
    let message = await ref2.once("value").then(v => {
      value = v.val();
      return value;
    });
    return message;
  }

  async function main() {
    const links = await getlinks();
    let i = 0;
    // let j = 0;
    // let allmessages = [];
    let allobjects = new Object();
    while (i < links.length) {
      let users = links[i].split("-");
      if (users[0] === userId || users[1] === userId) {
        const message = await getmessages(links[i]);
        // Object.defineProperty(allobjects[j], "name", { value: "lol" });
        allobjects[links[i]] = message;
        // allmessages.push.apply(allmessages, message);
      }
      i++;
    }
    // allmessages.push({ [links[i]]: message });
    res.status(200).json({
      messages: allobjects,
      status: "Great work",
      success: true
    });
  }

  main();
});

module.exports = router;
