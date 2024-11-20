const passport = require("passport");
const PrismaClient = require("./PrismaClient");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const prisma = PrismaClient(); // Initialize Prisma Client

// Function 1: Configure the LocalStrategy
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" }, // Explicit field mapping
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { username: username },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in LocalStrategy:", error);
        return done(error);
      }
    }
  )
);

// Function 2: Serialize user to store user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Function 3: Deserialize user to retrieve user data using the stored ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return done(new Error("User not found."));
    }

    done(null, user);
  } catch (error) {
    console.error("Error in deserializeUser:", error);
    done(error);
  }
});

module.exports = passport;
