const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST, // e.g., 'localhost'
  user: process.env.DB_USER, // e.g., 'root'
  password: process.env.DB_PASS, // e.g., 'yourpassword'
  database: process.env.DB_NAME, // e.g., 'yourdatabase'
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // <-- important for CleverCloud
  },
});

const db = pool.promise();

// ✅ Test the connection
db.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected:", conn.config.database);
    conn.release(); // release back to pool
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

module.exports = db; // Use promise-based API
