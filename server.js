const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// GET section

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  console.log("DATA", data);
  res.status(200).json({ users: obData.users });
});

// POST section

app.post("/users", (req, res) => {
  console.log("BODY", req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ users }));
  res.status(201).json({ user: newUser });
});

// DELETE sectiuon

app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data); //[{id:1}, {id:2}]
  const findIndex = users.findIndex((user) => user.id === req.params.id); // "4" === 4, 4 === 4
  if (findIndex > -1) {
    const [deleteUser] = users.splice(findIndex, 1); // [{}]
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deleteUser });
  } else {
    res.status(400).json({ Message: "not found user id" });
  }
});

// PUT section

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ Message: "not found user id" });
  }
});

app.listen(8000, () => {
  console.log("server is running localhost:8000");
});
