const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const collection = require('./collection');     // For user login and signup
const userModel = require('./userModel');      // For email subscription
const port = 3000;

const app = express();

// Middleware to parse form data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog_page', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// Route for the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to render the signup page (signup.html)
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './login/signup.html'));
});

// Route to render the login page (login.html)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './login/login.html'));
});

// Handling signup form submission
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await collection.findOne({ name: username });

        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
            const newUser = new collection({ name: username, password: hashedPassword });
            await newUser.save();  // Save the user in the database

            //res.sendFile(path.join(__dirname, './login/login.html'));  // Redirect to login page
            res.send('User registered successfully');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Error registering user');
    }
});

// Handling login form submission
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await collection.findOne({ name: username });

        if (!user) {
            res.send('Username not found');
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.sendFile(path.join(__dirname, './login/home.html'));  // Render home page on successful login
            } else {
                res.send('Incorrect password');
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error logging in');
    }
});

// Handling email form submission
app.post('/post', async (req, res) => {
    try {
        const { email } = req.body;
        // Ensure email is provided
        if (!email) {
            return res.status(400).send('Email is required.');
        }
        const existEmail = await userModel.findOne({ email:email });
        if(existEmail) {
            return res.status(400).send('Email already exists. Please choose a different email.');
        }
        // Create and save email subscription
        const newSubscription = new userModel({ email });
        await newSubscription.save();  // Save the email in the database

        res.sendFile(path.join(__dirname, './thankyou/thankyoupage.html'));  // Render thank you page
    } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).send('Error saving email');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
