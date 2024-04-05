const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const points = require("./points_table");
const { calculatePoints } = require("./utils");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { points: points });
});

app.post("/calculate", (req, res) => {
  const result = calculatePoints(
    parseFloat(req.body.team1),
    parseFloat(req.body.team2),
    parseFloat(req.body.overs),
    parseFloat(req.body.position),
    req.body.tossResult,
    parseFloat(req.body.runsScored),
  );
  res.status(200).send({ message: result });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
