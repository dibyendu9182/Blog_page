const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const collection = require("./collection"); // For user login and signup
const userModel = require("./userModel"); // For email subscription
const port = 3000;

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/blog_page", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Route for the home page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to render the signup page (signup.html)
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./login/signup.html"));
});

// Route to render the login page (login.html)
app.get("/login", (req, res) => {
    // app.use(express.static(path.join(__dirname, './login/login.html')));
    res.sendFile(path.join(__dirname, "./login/login.html"));
});

// Handling signup form submission
app.post("/signup", async (req, res) => {
  try {
    const {
      username,
      password,
      re_password,
      name,
      company,
      dob,
      email,
      phone,
    } = req.body;
    const existingUser = await collection.findOne({ username: username });

    if (existingUser) {
      res.send("User already exists. Please choose a different username.");
    } else {
      if (password !== re_password) {
        return res.status(400).send("Passwords do not match");
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = new collection({
        username,
        password: hashedPassword,
        re_password: hashedPassword,
        name,
        company,
        dob,
        email,
        phone,
      });
      await newUser.save(); // Save the user in the database

      res.send("User registered successfully");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error registering user");
  }
});

// Handling login form submission
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await collection.findOne({ username: username });

    if (!user) {
      res.send("Username not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.render("profileindex", {
          username: user.username,
          name: user.name,
          company: user.company,
          dob: user.dob,
          email: user.email,
          phone: user.phone,
        });
      } else {
        res.send("Incorrect password");
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error logging in");
  }
});

// Handling email form submission
app.post("/post", async (req, res) => {
  try {
    const { email } = req.body;
    // Ensure email is provided
    if (!email) {
      return res.status(400).send("Email is required.");
    }
    const existEmail = await userModel.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send("Email already exists. Please choose a different email.");
    }
    // Create and save email subscription
    const newSubscription = new userModel({ email });
    await newSubscription.save(); // Save the email in the database

    res.sendFile(path.join(__dirname, "./thankyou/thankyoupage.html")); // Render thank you page
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).send("Error saving email");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
