const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const path = require('path');
const userRoutes = require('./app_server/routes/userRoutes');  // Import user routes
const eventRoutes = require('./app_server/routes/eventRoutes');  // Import event routes
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Set server port
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies

// Set Pug as the templating engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname,'app_server' ,'views')); // Set the views directory

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public'))); // Ensure your CSS folder is correctly named
app.use(morgan("dev"))

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB!"); // Log connection success
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error); // Log connection error
        process.exit(1); // Exit the process with an error code
    });

// Home Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Register Route
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Events Route
app.get('/events', (req, res) => {
    res.render('events', { title: 'Manage Events' });
});

// Logout Route
app.get('/logout', (req, res) => {
    res.render('logout'); // Render the `logout.jade` file
});

// API Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/events', eventRoutes); // Event-related routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server status
});
