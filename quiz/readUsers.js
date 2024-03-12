const express = require("express");
const router = express.Router();

router.get("/read/username/:u", (req, res) => {
  const u = req.params.u;

  console.log(u);
  const filtered = users
    .filter(function (user) {
      return user.username === u;
    })
    .map(function (user) {
      return { id: user.id, email: user.email };
    });

  console.log(filtered);

  res.send(filtered);
});

router.use("/read/usernames", addMsgToRequest);

router.get("/read/usernames", (req, res) => {
  let usernames = req.users.map(function (user) {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});
