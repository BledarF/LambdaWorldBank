// /api/api.js

const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users.js");
//const adminRouter = require("./admin.js");
const sessionsRouter = require("./sessions.js");
const searchesRouter = require("./searches.js");

apiRouter.use("/users", usersRouter);
//apiRouter.use("/admin", adminRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/searches", searchesRouter);

module.exports = apiRouter;
