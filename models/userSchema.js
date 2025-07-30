const connection = require("../db/connect")

const createUsersTable = (cb) => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
    connection.query(createTableSQL, (err, results) => {
        if (err) {
            console.error('Error creating Users table:', err);
        } else {
            console.log('Users table created or already exists');
        }
        if (cb) cb(err, results);
    });
};

module.exports = createUsersTable;