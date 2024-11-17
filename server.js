// Require dotenv
require("dotenv").config();

// Express app
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 7 * 24 * 60 * 60,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Server running on port", process.env.PORT);
});
