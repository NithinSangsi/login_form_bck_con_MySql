const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create a connection to the MySQL database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Your_password',  //MySql workbench password
    database: 'backend'
});

// Connect to the MySQL database
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + con.threadId);
});

// Express app setup
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login HTML page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public','login1.html'));
});

// Handle login form submission
app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Query to insert login details into the database
    const sql = "INSERT INTO login (email, password) VALUES (?, ?)";
    
    con.query(sql, [email, password], function(error, result) {
        if (error) {
            console.error('Error inserting data:', error.stack);
            res.status(500).send('Database error');
            return;
        }
        res.send("Login successful!");  // You can change this response as needed
    });
});

// Start the server
app.listen(7000, function() {
    console.log('Server is running on port 7000');
});
