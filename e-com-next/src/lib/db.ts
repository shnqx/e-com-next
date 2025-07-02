import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_db",
  port: 3306,   
});