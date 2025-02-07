const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
var cors = require("cors");
const port = 8000;

let users;
fs.readFile(
  path.resolve(__dirname, "../data/users.json"),
  function (err, data) {
    console.log("reading file ... ");
    if (err) throw err;
    users = JSON.parse(data);
  }
);

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

app.use("/read/usernames", addMsgToRequest);

app.get("/read/usernames", (req, res) => {
  let usernames = req.users.map(function (user) {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/write/adduser", addMsgToRequest);

app.post("/write/adduser", (req, res) => {
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

app.get("/read/username/:u", (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
