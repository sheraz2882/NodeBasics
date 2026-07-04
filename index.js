const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id/:name", (req, res) => {
  res.send(req.params);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.query);
});

//handling get requests
const players = [
  { id: 1, name: "Player1" },
  { id: 2, name: "Player2" },
  { id: 3, name: "Player3" },
];

app.get("/api/players", (req, res) => {
  res.send(players);
});

app.get("/api/players/:id", (req, res) => {
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player) res.status(404).send("The Player with given ID Not Found");
  res.send(player);
});

app.post("/api/players", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const player = {
    id: players.length + 1,
    name: value.name,
  };

  players.push(player);
  res.send(player);
});

app.put("/api/players/:id", (req, res) => {
  //Look up the player
  //If not existing, return 404
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player)
    return res.status(404).send("The Player with given ID Not Found");

  //Validate
  //If invalid, return 400 - Bad request
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //Update player
  player.name = value.name;
  //Return the updated player
  res.send(player);
});

app.delete("/api/players/:id", (req, res) => {
  //Look up the player
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player)
    return res.status(404).send("The Player with the Given ID not Found");

  //Delete Operation
  const index = players.indexOf(player);
  players.slice(index, 1);

  //Return the Deleted Object
  res.send(player);
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
