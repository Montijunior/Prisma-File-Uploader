// Require dotenv
require("dotenv").config();

// Express app
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const PrismaClient = require("./configs/PrismaClient");
const passport = require("./configs/passport");
const IndexRoutes = require("./routes/IndexRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");
const FolderRoutes = require("./routes/FolderRoutes");
const UploadRoutes = require("./routes/UploadRoutes");
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
    store: new PrismaSessionStore(PrismaClient(), {
      checkPeriod: 7 * 24 * 60 * 60,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.user = req.user;
  // console.log(req.user);
  next();
});

app.use("/", AuthRoutes);
app.use("/", IndexRoutes);
app.use("/", DashboardRoutes);
app.use("/folder", FolderRoutes);
app.use("/uploads", UploadRoutes);

app.listen(3000, () => {
  console.log("Server running on port", process.env.PORT);
});
