// server.js

const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db"); // MySQL connection

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Serve register.html when accessing /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Serve login.html when accessing /login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Registration Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users (username, salt, hashed_password) VALUES (?, ?, ?)`;
    db.query(query, [username, salt, hashedPassword], (error, result) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username already exists" });
        }
        console.error("Database error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json({ message: "User registered", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], async (error, results) => {
      if (error) {
        console.error("Database error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];
      const isValidPassword = await bcrypt.compare(
        password,
        user.hashed_password
      );

      if (isValidPassword) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
