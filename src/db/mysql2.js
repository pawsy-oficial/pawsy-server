require('dotenv').config();

const mysql2 = require("mysql2/promise");

const SQL_HOST = process.env.MYSQL_HOST;
const SQL_USER = process.env.MYSQL_USER;
const SQL_PASSWORD = process.env.MYSQL_PASSWORD;
const SQL_DATABASE = process.env.MYSQL_DB;

async function createDbConnection() {
  const db = await mysql2.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
  })

  return db;
}



module.exports = { createDbConnection };
