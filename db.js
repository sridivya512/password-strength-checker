const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Your database host
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "password_checker", // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID:", connection.threadId);
});

// Export the connection to use in other files
module.exports = connection;
