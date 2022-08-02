const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "upload_image_db",
  password: "admin",
  port: 5432,
});

module.exports = pool;
