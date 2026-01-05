import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',      // Change if using remote DB
  user: 'root',           // Your MySQL user
  password: 'root',       
  database: 'microbros_products',
  port: 8889,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;