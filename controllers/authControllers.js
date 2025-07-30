const connection = require("../db/connect");

const signin = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate input
        if (!email || !username || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Insert the user into the database
        const createUserQuery = `
            INSERT INTO Users (email, username, password)
            VALUES (?, ?, ?)
        `;

        connection.query(createUserQuery, [email, username, password], (err, results) => {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.status(500).json('Internal Server error');
            }

            return res.json({ msg: "User registered successfully" });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error");
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }
        const loginQuery = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        connection.query(loginQuery, [username, password], (err, results) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json('Internal Server error');
            }
            if (results.length > 0) {
                return res.json({ msg: "Login successful", user: results[0] });
            } else {
                return res.status(401).json({ msg: "Invalid username or password" });
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server error");
    }
};

const logout = (req, res) => {
    // No session/token, just return a message
    return res.json({ msg: "Logged out" });
};

module.exports = { signin, login, logout };
