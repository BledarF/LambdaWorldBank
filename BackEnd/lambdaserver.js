// lambdaserver.js

const bodyParser = require("body-parser");
const cors = require("cors");
const errorhandler = require("errorhandler");
const express = require("express");
const morgan = require("morgan");

const apiRouter = require("./api/api");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use(errorhandler());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
