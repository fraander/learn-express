const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const addMsgToRequest = function (req, res, next) {
  if (users) {
    req.users = users;
    next();
  } else {
    return res.json({
      error: { message: "users not found", status: 404 },
    });
  }
};

router.use("/write/adduser", addMsgToRequest);

router.post("/write/adduser", (req, res) => {
  let newuser = req.body;
  req.users.push(newuser);
  fs.writeFile(
    path.resolve(__dirname, "../data/users.json"),
    JSON.stringify(req.users),
    (err) => {
      if (err) console.log("Failed to write");
      else console.log("User Saved");
    }
  );
  res.send("done");
});
