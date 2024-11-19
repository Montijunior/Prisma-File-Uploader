const passport = require("passport");
const PrismaClient = require("./PrismaClient");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const prisma = PrismaClient; // Initialize Prisma Client

// function one : Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect email address" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// function two: serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// function three: deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
