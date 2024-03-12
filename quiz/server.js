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

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
